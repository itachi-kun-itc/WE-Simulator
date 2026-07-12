const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const epicenterAreasPath = path.join(root, "web", "data", "jma_epicenter_areas.geojson");
const outputPath = path.join(root, "web", "data", "earthquake_statistics.json");
const sqlOutputPath = path.join(root, "tmp", "earthquake_statistics_yearly.sql");
const apiBase = "https://earthquake.usgs.gov/fdsnws/event/1/query";

const startYear = Number(process.env.START_YEAR || 1900);
const endYear = Number(process.env.END_YEAR || new Date().getUTCFullYear());
const endDate = new Date(Date.UTC(endYear, 11, 31));
const minMagnitude = process.env.MIN_MAGNITUDE || "";
const bounds = {
  minlatitude: 20,
  maxlatitude: 50,
  minlongitude: 118,
  maxlongitude: 156,
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const epicenterAreas = JSON.parse(await fs.readFile(epicenterAreasPath, "utf8"));
  const byArea = new Map();
  const byAreaYear = new Map();
  let fetched = 0;

  for (const [start, end] of monthRanges(startYear, endDate)) {
    const events = await fetchEvents(start, end);
    fetched += events.length;
    for (const event of events) {
      const coordinates = event.geometry?.coordinates;
      if (!Array.isArray(coordinates) || coordinates.length < 2) {
        continue;
      }
      const [longitude, latitude] = coordinates;
      const area = findEpicenterAreaAtPoint(epicenterAreas, longitude, latitude) ||
        findNearestFeatureByDistance(epicenterAreas, [toEpicenterAreaSourceLongitude(longitude), latitude], 180);
      const areaName = cleanName(area?.properties?.name);
      if (!areaName) {
        continue;
      }
      const place = cleanName(event.properties?.place) || areaName;
      const time = new Date(Number(event.properties?.time) || 0).toISOString();
      const year = new Date(Number(event.properties?.time) || 0).getUTCFullYear();
      const row = byArea.get(areaName) || {
        areaName,
        count: 0,
        latestAt: "",
        epicenterCounts: new Map(),
      };
      row.count += 1;
      if (!row.latestAt || time > row.latestAt) {
        row.latestAt = time;
      }
      row.epicenterCounts.set(place, (row.epicenterCounts.get(place) || 0) + 1);
      byArea.set(areaName, row);

      const yearKey = `${year}\u0000${areaName}`;
      const yearRow = byAreaYear.get(yearKey) || {
        year,
        areaName,
        count: 0,
        latestAt: "",
        epicenterCounts: new Map(),
      };
      yearRow.count += 1;
      if (!yearRow.latestAt || time > yearRow.latestAt) {
        yearRow.latestAt = time;
      }
      yearRow.epicenterCounts.set(place, (yearRow.epicenterCounts.get(place) || 0) + 1);
      byAreaYear.set(yearKey, yearRow);
    }
  }

  const areas = [...byArea.values()]
    .map((row) => ({
      areaName: row.areaName,
      count: row.count,
      latestAt: row.latestAt,
      epicenters: [...row.epicenterCounts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ja"))
        .slice(0, 20),
    }))
    .sort((a, b) => b.count - a.count || a.areaName.localeCompare(b.areaName, "ja"));

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify({
    source: "USGS Earthquake Catalog API",
    sourceUrl: apiBase,
    updatedAt: new Date().toISOString(),
    period: {
      start: `${startYear}-01-01`,
      end: endDate.toISOString().slice(0, 10),
    },
    bounds,
    minMagnitude: minMagnitude || null,
    fetched,
    areas,
  }, null, 2)}\n`);
  await fs.mkdir(path.dirname(sqlOutputPath), { recursive: true });
  await fs.writeFile(sqlOutputPath, buildYearlySql([...byAreaYear.values()]));
  console.log(`Wrote ${areas.length} area rows from ${fetched} events to ${path.relative(root, outputPath)}`);
  console.log(`Wrote D1 yearly seed SQL to ${path.relative(root, sqlOutputPath)}`);
}

function buildYearlySql(rows) {
  const statements = [
    "BEGIN TRANSACTION;",
    "DELETE FROM earthquake_statistics_epicenter_years;",
    "DELETE FROM earthquake_statistics_area_years;",
  ];
  const updatedAt = new Date().toISOString();
  for (const row of rows.sort((a, b) => a.year - b.year || a.areaName.localeCompare(b.areaName, "ja"))) {
    statements.push(`INSERT INTO earthquake_statistics_area_years (year, area_name, count, latest_at, source, updated_at) VALUES (${row.year}, ${sqlString(row.areaName)}, ${row.count}, ${sqlString(row.latestAt)}, 'USGS Earthquake Catalog API', ${sqlString(updatedAt)});`);
    for (const [name, count] of row.epicenterCounts.entries()) {
      statements.push(`INSERT INTO earthquake_statistics_epicenter_years (year, area_name, epicenter_name, count, latest_at, updated_at) VALUES (${row.year}, ${sqlString(row.areaName)}, ${sqlString(name)}, ${count}, ${sqlString(row.latestAt)}, ${sqlString(updatedAt)});`);
    }
  }
  statements.push("COMMIT;");
  return `${statements.join("\n")}\n`;
}

function sqlString(value) {
  return `'${String(value ?? "").replaceAll("'", "''")}'`;
}

async function fetchEvents(start, end) {
  const url = new URL(apiBase);
  url.searchParams.set("format", "geojson");
  url.searchParams.set("starttime", start);
  url.searchParams.set("endtime", end);
  url.searchParams.set("orderby", "time-asc");
  url.searchParams.set("limit", "20000");
  for (const [key, value] of Object.entries(bounds)) {
    url.searchParams.set(key, String(value));
  }
  if (minMagnitude) {
    url.searchParams.set("minmagnitude", minMagnitude);
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`USGS request failed ${response.status}: ${url}`);
  }
  const data = await response.json();
  return Array.isArray(data.features) ? data.features : [];
}

function* monthRanges(startYearValue, end) {
  let cursor = new Date(Date.UTC(startYearValue, 0, 1));
  while (cursor < end) {
    const next = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1));
    yield [cursor.toISOString().slice(0, 10), (next < end ? next : end).toISOString().slice(0, 10)];
    cursor = next;
  }
}

function findEpicenterAreaAtPoint(geojson, longitude, latitude) {
  const sourceLongitude = toEpicenterAreaSourceLongitude(longitude);
  return geojson.features.find((feature) =>
    getFeaturePolygons(feature).some((polygon) => pointInPolygon([sourceLongitude, latitude], polygon)),
  );
}

function findNearestFeatureByDistance(geojson, point, maxDistanceKm) {
  let nearest = null;
  let nearestDistance = Infinity;
  for (const feature of geojson.features || []) {
    const candidate = getNearestPointOnFeature(point, feature);
    if (candidate.distanceKm < nearestDistance) {
      nearest = feature;
      nearestDistance = candidate.distanceKm;
    }
  }
  return nearestDistance <= maxDistanceKm ? nearest : null;
}

function getNearestPointOnFeature(point, feature) {
  let nearest = { point, distanceKm: Infinity };
  for (const polygon of getFeaturePolygons(feature)) {
    for (const ring of polygon) {
      for (let index = 0; index < ring.length - 1; index += 1) {
        const candidate = nearestPointOnSegmentKilometers(point, ring[index], ring[index + 1]);
        if (candidate.distanceKm < nearest.distanceKm) {
          nearest = candidate;
        }
      }
    }
  }
  return nearest;
}

function nearestPointOnSegmentKilometers(point, start, end) {
  const startPoint = toLocalKilometers(start, point);
  const endPoint = toLocalKilometers(end, point);
  const segmentX = endPoint[0] - startPoint[0];
  const segmentY = endPoint[1] - startPoint[1];
  const segmentLengthSquared = segmentX * segmentX + segmentY * segmentY;
  if (segmentLengthSquared === 0) {
    return { point: start, distanceKm: Math.hypot(startPoint[0], startPoint[1]) };
  }
  const t = Math.max(0, Math.min(1, -((startPoint[0] * segmentX + startPoint[1] * segmentY) / segmentLengthSquared)));
  return {
    point: [start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t],
    distanceKm: Math.hypot(startPoint[0] + segmentX * t, startPoint[1] + segmentY * t),
  };
}

function toLocalKilometers(coordinate, origin) {
  return [
    (coordinate[0] - origin[0]) * 111.32 * Math.cos((origin[1] * Math.PI) / 180),
    (coordinate[1] - origin[1]) * 110.57,
  ];
}

function pointInPolygon(point, polygon) {
  return pointInRing(point, polygon[0]) && polygon.slice(1).every((ring) => !pointInRing(point, ring));
}

function pointInRing(point, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    if (yi > point[1] !== yj > point[1] && point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi || Number.EPSILON) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function getFeaturePolygons(feature) {
  if (feature.geometry?.type === "Polygon") {
    return [feature.geometry.coordinates];
  }
  if (feature.geometry?.type === "MultiPolygon") {
    return feature.geometry.coordinates;
  }
  return [];
}

function toEpicenterAreaSourceLongitude(longitude) {
  return longitude < 0 ? longitude + 360 : longitude;
}

function cleanName(value) {
  return String(value || "").trim();
}
