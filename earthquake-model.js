// Empirical shaking model. Formulae, units and limitations:
// docs/earthquake_intensity_model.md (JMA 2024 reference, pp. 12–15;
// NIED/J-SHIS engineering-bedrock convention and Mw 8.3 saturation).
((root) => {
  "use strict";
  const MIN_DISTANCE_KM = 3;
  const MAX_DEPTH_KM = 150;
  const MAX_AMPLITUDE_MW = 8.3;
  const TYPE_COEFFICIENTS = Object.freeze({ crustal: 0, interface: -0.02, intraslab: 0.12 });
  const THRESHOLDS = Object.freeze([0.5, 1.5, 2.5, 3.5, 4.5, 5, 5.5, 6, 6.5]);
  const bounded = (value, min, max) => Math.min(Math.max(value, min), max);

  function toMomentMagnitude(magnitude, magnitudeType = "Mw") {
    if (!Number.isFinite(magnitude) || magnitude <= 0) throw new RangeError("Magnitude must be positive and finite");
    if (!["Mj", "Mw"].includes(magnitudeType)) throw new RangeError("Unknown magnitude scale");
    return magnitudeType === "Mj" ? magnitude - 0.171 : magnitude;
  }

  function pointSourceDistanceKm({ epicentralDistanceKm, depthKm }) {
    if (!Number.isFinite(epicentralDistanceKm) || epicentralDistanceKm < 0
      || !Number.isFinite(depthKm) || depthKm < 0) throw new RangeError("Invalid source distance/depth");
    // Normal simulation has a point source, not the conservative EEW sphere.
    // Subtracting an M-derived radius made the entire interior of an Mw9
    // sphere (~223km radius) share X=3km and erased distance attenuation.
    return Math.max(Math.hypot(epicentralDistanceKm, depthKm), MIN_DISTANCE_KM);
  }

  function siteParameters({ arv, avs } = {}) {
    // Existing J-SHIS ARV is referenced to Vs=400m/s. AVS is a fallback,
    // never an additional amplification on top of the ARV for the same mesh.
    const hasArv = Number.isFinite(arv) && arv > 0;
    const hasAvs = Number.isFinite(avs) && avs > 0;
    const velocityAmplification = hasArv ? arv
      : hasAvs ? (400 / bounded(avs, 100, 1500)) ** 0.66 : 1;
    return {
      velocityAmplification,
      referenceVs: 400,
      intensityAmplification: 1.72 * Math.log10(velocityAmplification),
      source: hasArv ? "jshis-arv400" : hasAvs ? "avs30-fallback" : "engineering-bedrock-assumption",
    };
  }

  function intensityRank(value) {
    if (!Number.isFinite(value)) return null;
    return THRESHOLDS.reduce((rank, minimum) => rank + Number(value >= minimum), 0);
  }

  function predict({ magnitude, magnitudeType = "Mw", depthKm, ruptureDistanceKm,
    velocityAmplification = 1, referenceVs = 400, earthquakeType = "crustal", sourceModel = "finite-fault" }) {
    const mw = toMomentMagnitude(magnitude, magnitudeType);
    if (!Number.isFinite(depthKm) || depthKm < 0 || !Number.isFinite(ruptureDistanceKm) || ruptureDistanceKm < 0
      || !Number.isFinite(velocityAmplification) || velocityAmplification <= 0
      || ![400, 600, 700].includes(referenceVs)
      || !["point", "finite-fault"].includes(sourceModel)
      || !Object.hasOwn(TYPE_COEFFICIENTS, earthquakeType)) throw new RangeError("Invalid ground motion parameters");
    if (depthKm > MAX_DEPTH_KM) return {
      available: false, reason: "depth-over-150km", momentMagnitude: mw,
      instrumentalIntensity: null, displayIntensity: null, intensityRank: null,
      pgv600CmPerSec: null, surfacePgvCmPerSec: null, extrapolations: [],
    };
    const distanceKm = Math.max(ruptureDistanceKm, MIN_DISTANCE_KM);
    // The J-SHIS Mw8.3 cap is a finite-fault-distance convention, not an
    // extra cap in the JMA point-source reference formula.
    const amplitudeMw = sourceModel === "finite-fault" ? Math.min(mw, MAX_AMPLITUDE_MW) : mw;
    const logPgv600 = 0.58 * amplitudeMw + 0.0038 * depthKm + TYPE_COEFFICIENTS[earthquakeType] - 1.29
      - Math.log10(distanceKm + 0.0028 * 10 ** (0.5 * amplitudeMw)) - 0.002 * distanceKm;
    // 600 -> 400: J-SHIS 1.31; 600 -> 700: JMA 0.90. Mixing ARV400
    // with the 700m/s factor would silently underestimate surface motion.
    const bedrockFactor = referenceVs === 400 ? 1.31 : referenceVs === 700 ? 0.90 : 1;
    const logSurfacePgv = logPgv600 + Math.log10(bedrockFactor * velocityAmplification);
    const instrumentalIntensity = 2.68 + 1.72 * logSurfacePgv;
    const extrapolations = [];
    if (mw > 8.2) extrapolations.push("magnitude-over-original-range");
    if (mw < 5.5) extrapolations.push("small-magnitude");
    if (distanceKm > 200) extrapolations.push("distance-over-200km");
    if (depthKm > 50) extrapolations.push("depth-over-50km");
    if (instrumentalIntensity < 4) extrapolations.push("intensity-below-4");
    if (instrumentalIntensity > 7) extrapolations.push("intensity-over-7");
    return {
      available: true, momentMagnitude: mw, amplitudeMomentMagnitude: amplitudeMw,
      magnitudeSaturated: amplitudeMw < mw, sourceModel, ruptureDistanceKm: distanceKm,
      pgv600CmPerSec: 10 ** logPgv600, surfacePgvCmPerSec: 10 ** logSurfacePgv,
      instrumentalIntensity, displayIntensity: bounded(instrumentalIntensity, 0, 7),
      intensityRank: intensityRank(instrumentalIntensity), extrapolations,
    };
  }

  function rectangularFaultDistanceKm({ alongKm, acrossKm, lengthKm, widthKm, dipDegrees, centerDepthKm }) {
    if (![alongKm, acrossKm, lengthKm, widthKm, dipDegrees, centerDepthKm].every(Number.isFinite)
      || lengthKm <= 0 || widthKm <= 0 || dipDegrees <= 0 || dipDegrees > 90 || centerDepthKm < 0) {
      throw new RangeError("Invalid rectangular fault geometry");
    }
    const dip = dipDegrees * Math.PI / 180;
    const sinDip = Math.sin(dip), cosDip = Math.cos(dip);
    // The entered depth is the centre depth. Clip the up-dip edge at the
    // ground surface rather than letting a wide/shallow fault extend into air.
    const minDownDip = -Math.min(widthKm / 2, centerDepthKm / sinDip);
    const downDip = bounded(acrossKm * cosDip - centerDepthKm * sinDip, minDownDip, widthKm / 2);
    return Math.hypot(
      alongKm - bounded(alongKm, -lengthKm / 2, lengthKm / 2),
      acrossKm - downDip * cosDip,
      centerDepthKm + downDip * sinDip,
    );
  }

  const api = Object.freeze({ MIN_DISTANCE_KM, MAX_DEPTH_KM, MAX_AMPLITUDE_MW,
    TYPE_COEFFICIENTS, THRESHOLDS, toMomentMagnitude, pointSourceDistanceKm,
    siteParameters, intensityRank, predict, rectangularFaultDistanceKm });
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.WeEarthquakeModel = api;
})(globalThis);
