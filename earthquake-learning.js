// Small, bounded residual model. Training and inference share this implementation.
// See docs/earthquake_learning.md for the observation and validation limits.
((root) => {
  "use strict";
  const VERSION = 1;
  const BASE_MODEL = "pgv1999-arv400-point-v1";
  const MAX_CORRECTION = 0.6;
  const LIMITS = [0.6, 0.15, 0.2, 0.12, 0.2, 0.2, 0.2];
  const THRESHOLDS = [0.5, 1.5, 2.5, 3.5, 4.5, 5, 5.5, 6, 6.5];
  const DOMAIN_FIELDS = ["momentMagnitude", "depthKm", "distanceKm", "velocityAmplification", "latitude", "longitude", "sourceLatitude", "sourceLongitude"];
  const clamp = (value, lo, hi) => Math.min(Math.max(value, lo), hi);
  const rank = (value) => THRESHOLDS.reduce((sum, threshold) => sum + Number(value >= threshold), 0);
  const mean = (values) => values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
  const finite = (value) => typeof value === "number" && Number.isFinite(value);

  function meshCode1km(longitude, latitude) {
    const latBase = Math.floor(latitude * 1.5), lonBase = Math.floor(longitude) - 100;
    const latRest = latitude - latBase / 1.5, lonRest = longitude - Math.floor(longitude);
    const latSecond = clamp(Math.floor(latRest / (5 / 60)), 0, 7), lonSecond = clamp(Math.floor(lonRest / (7.5 / 60)), 0, 7);
    return `${String(latBase).padStart(2, "0")}${String(lonBase).padStart(2, "0")}${latSecond}${lonSecond}${clamp(Math.floor((latRest - latSecond * (5 / 60)) / (30 / 3600)), 0, 9)}${clamp(Math.floor((lonRest - lonSecond * (7.5 / 60)) / (45 / 3600)), 0, 9)}`;
  }

  function intervalError(value, observedRank) {
    if (!finite(value) || !Number.isInteger(observedRank) || observedRank < 1 || observedRank > 9) return null;
    const lower = THRESHOLDS[observedRank - 1];
    const upper = observedRank === 9 ? Infinity : THRESHOLDS[observedRank] - 0.000001;
    return value < lower ? value - lower : value > upper ? value - upper : 0;
  }

  function features(input) {
    if (!DOMAIN_FIELDS.every((key) => finite(input[key])) || input.distanceKm < 3 || input.velocityAmplification <= 0) return null;
    return [1, clamp((input.momentMagnitude - 4) / 2, -2, 2),
      clamp(Math.log10(input.distanceKm / 30), -1.1, 1.1), clamp(input.depthKm / 100, 0, 1.5),
      clamp(Math.log10(input.velocityAmplification), -1, 1),
      clamp((input.latitude - 36) / 10, -2, 2), clamp((input.longitude - 138) / 10, -2, 2)];
  }

  function validModel(model) {
    return Boolean(model && model.version === VERSION && model.baseModel === BASE_MODEL
      && Array.isArray(model.coefficients) && model.coefficients.length === LIMITS.length
      && model.coefficients.every((value, index) => finite(value) && Math.abs(value) <= LIMITS[index] + 1e-9)
      && model.domain && DOMAIN_FIELDS.every((key) => Array.isArray(model.domain[key])
        && model.domain[key].length === 2 && model.domain[key].every(finite) && model.domain[key][0] <= model.domain[key][1])
      && Array.isArray(model.support) && model.support.length >= 18 && model.support.length <= 200
      && model.support.every((point) => Array.isArray(point) && point.length === 4 && point.every(finite)));
  }

  function supported(model, input) {
    if (!DOMAIN_FIELDS.every((key) => finite(input[key]) && input[key] >= model.domain[key][0] - 1e-8 && input[key] <= model.domain[key][1] + 1e-8)) return false;
    // Restrict use to source locations, magnitudes and depths represented in training.
    return model.support.some(([lat, lon, mw, depth]) => Math.hypot(
      (input.sourceLatitude - lat) * 111, (input.sourceLongitude - lon) * 111 * Math.cos(lat * Math.PI / 180),
    ) <= 200 && Math.abs(input.momentMagnitude - mw) <= 0.75 && Math.abs(input.depthKm - depth) <= 30);
  }

  function correction(model, input) {
    if (input?.sourceModel !== "point" || input.earthquakeType !== "crustal" || !validModel(model) || !supported(model, input)) return 0;
    const x = features(input);
    return x ? clamp(x.reduce((sum, value, index) => sum + value * model.coefficients[index], 0), -MAX_CORRECTION, MAX_CORRECTION) : 0;
  }

  function partition(id) {
    let hash = 2166136261;
    for (const character of String(id)) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
    return hash % 5; // 0: independent test; 1: validation; 2–4: training.
  }

  function eventSamples(event, maximum = 512) {
    const samples = (event.samples || []).filter((sample) => finite(sample.baseline)
      && intervalError(sample.baseline, sample.rank) !== null && features({ ...event.source, ...sample }));
    if (samples.length <= maximum) return samples;
    return Array.from({ length: maximum }, (_, index) => samples[Math.floor(index * samples.length / maximum)]);
  }

  function evaluate(model, events) {
    const perEvent = events.map((event) => {
      const samples = eventSamples(event);
      const rows = samples.map((sample) => {
        const value = sample.baseline + correction(model, { ...event.source, ...sample, sourceModel: "point", earthquakeType: "crustal" });
        return { error: Math.abs(intervalError(value, sample.rank)), correct: Number(rank(value) === sample.rank), severe: Number(Math.abs(rank(value) - sample.rank) >= 2) };
      });
      return { id: event.id, count: rows.length, error: mean(rows.map((row) => row.error)), accuracy: mean(rows.map((row) => row.correct)), severe: mean(rows.map((row) => row.severe)) };
    }).filter((event) => event.count);
    return { events: perEvent.length, samples: perEvent.reduce((sum, event) => sum + event.count, 0),
      intervalMae: mean(perEvent.map((event) => event.error)), accuracy: mean(perEvent.map((event) => event.accuracy)),
      severeErrorRate: mean(perEvent.map((event) => event.severe)), perEvent };
  }

  function comparison(model, events, incumbent = null) {
    const baseline = evaluate(null, events), learned = evaluate(model, events), current = evaluate(incumbent, events);
    const gains = baseline.perEvent.map((event, index) => event.error - learned.perEvent[index].error);
    const gain = mean(gains);
    const deviation = Math.sqrt(gains.reduce((sum, value) => sum + (value - gain) ** 2, 0) / Math.max(gains.length - 1, 1));
    const lowerGain = gain - 3 * deviation / Math.sqrt(Math.max(gains.length, 1));
    const passed = gains.length >= 5 && gain >= 0.02 && lowerGain > 0
      && learned.intervalMae <= current.intervalMae - 0.005
      && learned.accuracy >= baseline.accuracy && learned.accuracy >= current.accuracy
      && learned.severeErrorRate <= baseline.severeErrorRate && learned.severeErrorRate <= current.severeErrorRate;
    const compact = ({ perEvent, ...metrics }) => metrics;
    return { baseline: compact(baseline), learned: compact(learned), incumbent: compact(current), gain, lowerGain, passed };
  }

  function train(allEvents, incumbent = null) {
    const unique = new Map();
    for (const event of allEvents) {
      if (/^\d{14}$/.test(event.id) && eventSamples(event).length >= 3) unique.set(event.id, event);
    }
    const events = [...unique.values()].sort((a, b) => a.id.localeCompare(b.id)).slice(-200);
    const training = events.filter((event) => partition(event.id) >= 2);
    const validation = events.filter((event) => partition(event.id) === 1);
    const test = events.filter((event) => partition(event.id) === 0);
    const counts = { events: events.length, trainingEvents: training.length, validationEvents: validation.length, testEvents: test.length,
      observations: events.reduce((sum, event) => sum + eventSamples(event).length, 0) };
    if (training.length < 18 || validation.length < 5 || test.length < 5 || counts.observations < 150) {
      return { status: "collecting", counts, reason: "insufficient-events", model: null };
    }
    const rows = training.flatMap((event) => {
      const samples = eventSamples(event, 32);
      return samples.map((sample) => ({ ...sample, input: { ...event.source, ...sample }, weight: 1 / samples.length / training.length }));
    });
    const model = { version: VERSION, baseModel: BASE_MODEL, coefficients: LIMITS.map(() => 0),
      domain: Object.fromEntries(DOMAIN_FIELDS.map((key) => [key, [Math.min(...rows.map((row) => row.input[key])), Math.max(...rows.map((row) => row.input[key]))]])),
      support: training.map((event) => [event.source.sourceLatitude, event.source.sourceLongitude, event.source.momentMagnitude, event.source.depthKm]),
      provenance: events.map((event) => ({ id: event.id, revision: event.revision })), counts };
    const prepared = rows.map((row) => ({ ...row, x: features(row.input) }));
    for (let iteration = 0; iteration < 100; iteration += 1) {
      const gradient = LIMITS.map(() => 0);
      for (const row of prepared) {
        const offset = clamp(row.x.reduce((sum, value, index) => sum + value * model.coefficients[index], 0), -MAX_CORRECTION, MAX_CORRECTION);
        const error = clamp(intervalError(row.baseline + offset, row.rank), -2, 2);
        row.x.forEach((value, index) => { gradient[index] += error * value * row.weight; });
      }
      model.coefficients = model.coefficients.map((value, index) => clamp(value - 0.25 * (gradient[index] + value * (index === 0 ? 0.001 : 0.02)), -LIMITS[index], LIMITS[index]));
    }
    const validationResult = comparison(model, validation, incumbent);
    const testResult = comparison(model, test, incumbent);
    const accepted = validationResult.passed && testResult.passed;
    return { status: accepted ? "validated" : "rejected", reason: accepted ? "holdout-improved" : "holdout-not-improved",
      counts, validation: validationResult, test: testResult, model: accepted ? model : null };
  }

  const api = Object.freeze({ VERSION, BASE_MODEL, MAX_CORRECTION, meshCode1km, intervalError, features, validModel, correction, partition, train, evaluate });
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.WeEarthquakeLearning = api;
})(globalThis);
