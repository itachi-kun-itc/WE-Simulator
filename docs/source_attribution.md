# データ出典

最終更新：2026-07-11

このプロジェクトの地図・地震シミュレーション表示で利用している主なデータ出典です。

## 気象庁

- 気象庁
  - https://www.jma.go.jp/
- 緊急地震速報や震度情報で用いる区域の名称
  - https://www.jma.go.jp/jma/kishou/know/jishin/joho/shindo-name.html
- 地震情報で用いる震央地名
  - https://www.jma.go.jp/jma/kishou/know/jishin/joho/region/index.html
- 震度観測点
  - https://www.jma.go.jp/jma/kishou/know/jishin/intens-st/index.html
- 予報区等GISデータの一覧
  - https://www.data.jma.go.jp/developer/gis.html

主な生成物：

- `web/data/jma_local_areas_simplified_10.geojson`
- `web/data/jma_local_area_boundaries_lines.geojson`
- `web/data/jma_shindo_stations.json`
- `web/data/jma_eew_forecast_areas.json`
- `web/data/jma_epicenter_areas.geojson`

## 行政区域・背景地図・地盤データ

- 国土数値情報
  - https://nlftp.mlit.go.jp/ksj/
- Natural Earth
  - https://www.naturalearthdata.com/
- J-SHIS 地震ハザードステーション
  - https://www.j-shis.bosai.go.jp/
- S-net 日本海溝海底地震津波観測網
  - https://www.seafloor.bosai.go.jp/outline/

主な生成物：

- `web/data/japan_municipalities_simplified_50.geojson`
- `web/data/municipality_boundaries_lines.geojson`
- `web/data/prefecture_boundaries_lines.geojson`
- `web/data/surrounding_land.geojson`
- `web/data/world_coastline.geojson`
- `web/data/ground_model.json`
- `web/data/submarine_observation_points.geojson`

## プレート境界データ

- PB2002 Plate Boundaries / fraxen tectonicplates
  - https://github.com/fraxen/tectonicplates
- Bird (2003), An updated digital model of plate boundaries
  - https://doi.org/10.1029/2001GC000252

主な生成物：

- `web/data/plate_boundaries.geojson`

## 表示ライブラリ

- MeteoScope
  - https://github.com/wvdtc7bjwn-bit/MeteoScope
- MapLibre GL JS
  - https://maplibre.org/maplibre-gl-js/docs/

## 注意

このアプリの震度推定、P波/S波到達、緊急地震速報風の表示は可視化用の簡易モデルです。防災判断や実際の発表判定には使用しません。
