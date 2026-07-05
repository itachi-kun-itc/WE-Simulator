# 地震シミュレーション演算コマンド仕様

このメモは、地図で選んだ震央・深さ・マグニチュードから、P波/S波到達、緊急地震速報風の猶予時間、地点ごとの推定震度を計算するための実装メモです。

現段階では教育・可視化用の簡易モデルとして扱い、実際の防災判断には使わない。

## 参照した知識

- P波はS波より速く、気象庁の説明ではP波は約7 km/s、S波は約4 km/sとして説明される。
- 緊急地震速報は、震源近くの観測点でP波を検知し、震源・マグニチュード・予想震度・主要動到達時刻を推定して発表する。
- 震度はある地点での揺れの強さ、マグニチュードは地震そのものの規模。マグニチュードが1増えると地震波エネルギーは約32倍、2増えると約1000倍。
- 震源に近い地点では、緊急地震速報が主要動に間に合わない場合がある。

## 入力

```js
{
  originTimeMs,              // 地震発生時刻。未指定なら simulationStartTimeMs と同じ
  epicenter: {
    latitude,
    longitude,
    areaName,                // 例: 宮城県沖、宮城県中部
    municipalityName         // 陸域のみ。海域では該当なし
  },
  depthKm,                   // 0 は「ごく浅い」として扱う
  magnitude,                 // 0.0 - 10.0
  sites: [
    {
      id,
      name,
      latitude,
      longitude,
      siteAmplification      // 任意。地盤補正。未指定なら 0
    }
  ]
}
```

## 基本定数

```js
const EARTHQUAKE_MODEL = {
  pWaveVelocityKmPerSec: 6.5,
  sWaveVelocityKmPerSec: 3.8,
  eewProcessingDelaySec: 2.0,
  minimumDetectionStations: 1,
  defaultSiteAmplification: 0,
};
```

気象庁の説明値に合わせて見せる場合は `P=7.0 km/s`, `S=4.0 km/s` でもよい。シミュレーションでは地下構造差を丸めるため、少し保守的に `P=6.5`, `S=3.8` を初期値にする。

## 演算順

1. 震央距離を求める。

```js
const epicentralDistanceKm = haversineKm(epicenter, site);
```

2. 震源距離を求める。

```js
const hypocentralDistanceKm = Math.hypot(epicentralDistanceKm, depthKm);
```

3. P波/S波到達時刻を求める。

```js
const pArrivalSec = hypocentralDistanceKm / pWaveVelocityKmPerSec;
const sArrivalSec = hypocentralDistanceKm / sWaveVelocityKmPerSec;
const spTimeSec = sArrivalSec - pArrivalSec;
```

4. 緊急地震速報風の発表時刻を求める。

```js
const nearestPArrivalSec = Math.min(...sites.map((site) => site.pArrivalSec));
const warningIssueSec = nearestPArrivalSec + eewProcessingDelaySec;
```

5. 各地点の猶予時間を求める。

```js
const warningLeadTimeSec = sArrivalSec - warningIssueSec;
const warningArrivesInTime = warningLeadTimeSec > 0;
```

6. 推定震度を求める。

まずは仮式でよい。あとで観測震度・距離減衰式・地盤データに合わせて調整する。

```js
function estimateInstrumentalIntensity({ magnitude, hypocentralDistanceKm, siteAmplification = 0 }) {
  const distance = Math.max(hypocentralDistanceKm, 1);
  return clamp(
    1.55 * magnitude -
      2.05 * Math.log10(distance + 20) -
      0.0028 * distance +
      siteAmplification -
      1.2,
    0,
    7,
  );
}
```

7. 計測震度を震度階級へ変換する。

```js
function toJmaIntensityLabel(instrumentalIntensity) {
  if (instrumentalIntensity < 0.5) return "0";
  if (instrumentalIntensity < 1.5) return "1";
  if (instrumentalIntensity < 2.5) return "2";
  if (instrumentalIntensity < 3.5) return "3";
  if (instrumentalIntensity < 4.5) return "4";
  if (instrumentalIntensity < 5.0) return "5-";
  if (instrumentalIntensity < 5.5) return "5+";
  if (instrumentalIntensity < 6.0) return "6-";
  if (instrumentalIntensity < 6.5) return "6+";
  return "7";
}
```

## 出力

```js
{
  epicenterName,
  depthLabel,
  magnitude,
  warningIssueSec,
  sites: [
    {
      id,
      name,
      epicentralDistanceKm,
      hypocentralDistanceKm,
      pArrivalSec,
      sArrivalSec,
      spTimeSec,
      warningLeadTimeSec,
      warningArrivesInTime,
      instrumentalIntensity,
      jmaIntensityLabel
    }
  ]
}
```

## UI反映方針

- 地図上ではS波到達順に市町村や地点を色付けする。
- P波到達は薄いリング、S波到達は強いリングとして表示する。
- 「シミュレーション開始」ボタン押下後、時刻0から `requestAnimationFrame` で進める。
- 猶予時間が0秒以下の地点は「間に合わない」扱いにする。
- 震央名は `web/data/jma_epicenter_areas.geojson` の震央地名ポリゴンで判定する。`三陸沖` のような気象庁の震央地名を使い、`海域` という補足語は表示しない。
- 観測点の表示震度は、S波到達直後に最大値へ瞬時に切り替えず、数秒かけて `0 -> 予測最大震度` へ滑らかに立ち上げる。現在実装では `smoothStep((elapsedSec - sArrivalSec) / 7.5)` を係数として使う。
- 最大震度と最大震度観測点一覧は、予測最大ではなく、その時刻までにS波が到達して立ち上がった現在震度からリアルタイムに計算する。
- 緊急地震速報発表地域の赤表示は、最大震度5弱以上が予想される地震で、震度4以上が予想される地域を対象にする。ただしUIの「緊急地震速報発表地域」チェックが有効な時だけ赤色で重ねる。

## 次に精度を上げる時の候補

- 地盤増幅率をJ-SHISなどから取得して `siteAmplification` に入れる。
- 距離減衰式を観測値に合わせて調整する。
- 観測点を複数使い、最初のP波だけでなく複数点検知後に震源推定が安定する表現を入れる。
- 深発地震では震央付近より離れた地点の揺れが強く見える場合があるため、深さ別の補正を入れる。
- 海溝型地震など震源域が広い地震は点震源ではなく断層面モデルに拡張する。

## 参照URL

- 気象庁: 緊急地震速報のしくみ https://www.jma.go.jp/jma/kishou/know/jishin/eew/shikumi/shikumi.html
- 気象庁: 震度について https://www.jma.go.jp/jma/kishou/know/shindo/index.html
- 気象庁: マグニチュードと震度の違い https://www.jma.go.jp/jma/kishou/know/faq/faq27.html
- P波・S波の説明 https://www5d.biglobe.ne.jp/~kabataf/yougo/E_jisin/jisin2_PwaveSwave.htm
