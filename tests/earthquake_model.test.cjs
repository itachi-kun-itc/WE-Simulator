const test = require("node:test");
const assert = require("node:assert/strict");
const model = require("../web/earthquake-model.js");
const base = { magnitude: 6, magnitudeType: "Mw", depthKm: 10, ruptureDistanceKm: 10 };
const close = (actual, expected, tolerance = 1e-10) => assert.ok(
  Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`,
);

// Independently evaluated with .NET Math from the cited formulae, using
// Vs600 -> Vs400 = 1.31; these are equation checkpoints, not observations.
const referenceCases = [
  [6, 10, 10, 1, 12.612176225207, 16.521950855021, 4.775065480734],
  [6, 10, 30, 2, 4.488757629368, 11.760544988944, 4.521135209886],
  [7, 20, 100, 1, 4.065875739100, 5.326297218222, 3.929451683347],
  [8, 30, 200, 1, 5.082356825242, 6.657887441067, 4.096138691687],
  [8.3, 30, 10, 1, 83.742732428725, 109.702979481629, 6.189175687508],
];
for (const [magnitude, depthKm, ruptureDistanceKm, velocityAmplification, pgv, surface, intensity] of referenceCases) {
  test(`equation checkpoint Mw${magnitude}, H${depthKm}, R${ruptureDistanceKm}, ARV${velocityAmplification}`, () => {
    const prediction = model.predict({ magnitude, depthKm, ruptureDistanceKm, velocityAmplification });
    close(prediction.pgv600CmPerSec, pgv);
    close(prediction.surfacePgvCmPerSec, surface);
    close(prediction.instrumentalIntensity, intensity);
  });
}

test("Mj is converted once; an explicitly supplied Mw is preserved", () => {
  close(model.toMomentMagnitude(6.171, "Mj"), 6);
  close(model.predict({ ...base, magnitude: 6.171, magnitudeType: "Mj" }).instrumentalIntensity,
    model.predict(base).instrumentalIntensity);
  assert.notEqual(model.predict({ ...base, magnitudeType: "Mj" }).instrumentalIntensity,
    model.predict(base).instrumentalIntensity);
});

test("doubling ARV doubles velocity and adds 1.72 log10(2), without double-counting AVS", () => {
  const original = model.predict(base), doubled = model.predict({ ...base, velocityAmplification: 2 });
  close(doubled.surfacePgvCmPerSec / original.surfacePgvCmPerSec, 2);
  close(doubled.instrumentalIntensity - original.instrumentalIntensity, 0.517771592542);
  assert.deepEqual(model.siteParameters({ arv: 2, avs: 100 }), model.siteParameters({ arv: 2, avs: 1200 }));
});

test("ARV400, ARV600 and ARV700 keep their reference bedrock distinct", () => {
  const p400 = model.predict(base), p600 = model.predict({ ...base, referenceVs: 600 });
  const p700 = model.predict({ ...base, referenceVs: 700 });
  close(p400.surfacePgvCmPerSec / p600.surfacePgvCmPerSec, 1.31);
  close(p700.surfacePgvCmPerSec / p600.surfacePgvCmPerSec, 0.90);
  assert.equal(model.siteParameters().source, "engineering-bedrock-assumption");
  assert.equal(model.siteParameters({ avs: 400 }).velocityAmplification, 1);
});

test("earthquake types change the source coefficient, not geographic names", () => {
  const crustal = model.predict(base).instrumentalIntensity;
  close(model.predict({ ...base, earthquakeType: "interface" }).instrumentalIntensity - crustal, -0.0344);
  close(model.predict({ ...base, earthquakeType: "intraslab" }).instrumentalIntensity - crustal, 0.2064);
});

test("larger M never reduces peak motion; saturation is a plateau, not a downturn", () => {
  for (const ruptureDistanceKm of [3, 10, 30, 100, 200, 500]) {
    let previous = -Infinity;
    for (let step = 1; step <= 100; step++) {
      const prediction = model.predict({ ...base, magnitude: step / 10, ruptureDistanceKm });
      assert.ok(prediction.instrumentalIntensity >= previous - 1e-12);
      previous = prediction.instrumentalIntensity;
    }
  }
  close(model.predict({ ...base, magnitude: 9 }).instrumentalIntensity,
    model.predict({ ...base, magnitude: 8.3 }).instrumentalIntensity);
  assert.equal(model.predict({ ...base, magnitude: 9 }).magnitudeSaturated, true);
});

test("greater fault distance attenuates motion and point-source distance is 3-D", () => {
  const distances = [0, 3, 10, 30, 100, 200, 500, 1000];
  const values = distances.map((ruptureDistanceKm) => model.predict({ ...base, ruptureDistanceKm }).instrumentalIntensity);
  assert.ok(values.every((value, index) => !index || value <= values[index - 1]));
  close(model.pointSourceDistanceKm({ depthKm: 10, epicentralDistanceKm: 0 }), 10);
  close(model.pointSourceDistanceKm({ depthKm: 10, epicentralDistanceKm: 10 }), Math.sqrt(200));
  close(model.pointSourceDistanceKm({ depthKm: 0, epicentralDistanceKm: 0 }), 3);
});

test("high-M point sources do not flatten an entire 200km area to the minimum distance", () => {
  for (const magnitude of [6, 7, 8, 8.3, 9, 9.5]) {
    let previousDistance = -Infinity, previousIntensity = Infinity;
    for (const epicentralDistanceKm of [0, 10, 25, 50, 100, 150, 200, 250, 300]) {
      const ruptureDistanceKm = model.pointSourceDistanceKm({ depthKm: 10, epicentralDistanceKm });
      const prediction = model.predict({ ...base, magnitude, ruptureDistanceKm, sourceModel: "point" });
      assert.ok(ruptureDistanceKm > previousDistance);
      assert.ok(prediction.instrumentalIntensity < previousIntensity);
      previousDistance = ruptureDistanceKm;
      previousIntensity = prediction.instrumentalIntensity;
    }
  }
});

test("point-source M9 remains distinct from M8.3; finite-fault saturation is applied separately", () => {
  const point = model.predict({ ...base, magnitude: 9, sourceModel: "point" });
  assert.ok(point.instrumentalIntensity > model.predict({ ...base, magnitude: 8.3, sourceModel: "point" }).instrumentalIntensity);
  assert.equal(point.amplitudeMomentMagnitude, 9);
  assert.equal(point.magnitudeSaturated, false);
  assert.ok(point.extrapolations.includes("magnitude-over-original-range"));
  assert.equal(model.predict({ ...base, magnitude: 9 }).magnitudeSaturated, true);
});

test("site amplification may still make a farther soft site stronger than a nearby hard site", () => {
  const prediction = (epicentralDistanceKm, velocityAmplification) => model.predict({
    ...base, magnitude: 9, sourceModel: "point", velocityAmplification,
    ruptureDistanceKm: model.pointSourceDistanceKm({ depthKm: 10, epicentralDistanceKm }),
  }).instrumentalIntensity;
  assert.ok(prediction(50, 2) > prediction(0, 0.5));
});

test("deep sources are unavailable, not zero intensity; low intensity is marked as extrapolation", () => {
  const deep = model.predict({ ...base, depthKm: 151 });
  assert.equal(deep.available, false);
  assert.equal(deep.instrumentalIntensity, null);
  assert.equal(deep.intensityRank, null);
  assert.equal(model.predict({ ...base, depthKm: 150 }).available, true);
  assert.ok(model.predict({ ...base, magnitude: 3 }).extrapolations.includes("intensity-below-4"));
});

test("all JMA class boundaries use the unrounded value", () => {
  for (const [index, threshold] of model.THRESHOLDS.entries()) {
    assert.equal(model.intensityRank(threshold - 0.00001), index);
    assert.equal(model.intensityRank(threshold), index + 1);
  }
  assert.equal(model.intensityRank(null), null);
  assert.equal(model.intensityRank(NaN), null);
});

test("rectangular distance respects finite ends, down-dip width, dip and surface clipping", () => {
  const rectangle = { alongKm: 0, acrossKm: 0, lengthKm: 30, widthKm: 20, dipDegrees: 90, centerDepthKm: 15 };
  close(model.rectangularFaultDistanceKm(rectangle), 5);
  close(model.rectangularFaultDistanceKm({ ...rectangle, alongKm: 18, acrossKm: 4 }), Math.sqrt(50));
  close(model.rectangularFaultDistanceKm({ ...rectangle, widthKm: 10 }), 10);
  close(model.rectangularFaultDistanceKm({ ...rectangle, centerDepthKm: 0 }), 0);
  close(model.rectangularFaultDistanceKm({ ...rectangle, dipDegrees: 45, widthKm: 100, centerDepthKm: 10 }), Math.sqrt(50));
});

test("invalid numeric inputs cannot silently produce colours", () => {
  for (const override of [{ magnitude: NaN }, { depthKm: -1 }, { ruptureDistanceKm: Infinity },
    { velocityAmplification: 0 }, { earthquakeType: "offshore" }, { referenceVs: 500 }]) {
    assert.throws(() => model.predict({ ...base, ...override }), RangeError);
  }
});
