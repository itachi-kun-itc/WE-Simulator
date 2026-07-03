# データ出典

このプロジェクトの地図・地震シミュレーション表示で利用している主なデータ出典です。

## 気象庁

- 地震情報で用いる震央地名、震度観測点、緊急地震速報、震度階級の説明。
- 参照URL:
  - https://www.jma.go.jp/jma/kishou/know/jishin/joho/shindo-name.html
  - https://www.data.jma.go.jp/eqev/data/kyoshin/jma-shindo.html
  - https://www.jma.go.jp/jma/kishou/know/jishin/eew/shikumi/shikumi.html
  - https://www.jma.go.jp/jma/kishou/know/shindo/index.html
- 主な生成物:
  - `web/data/jma_local_areas.geojson`
  - `web/data/sea_epicenter_areas.geojson`
  - `web/data/jma_shindo_stations.json`

## 国土数値情報・気象庁GIS区域データ

- 市町村等の地図、都道府県境界、市町村名データ。
- 参照URL:
  - https://nlftp.mlit.go.jp/ksj/
  - https://www.data.jma.go.jp/developer/gis.html
- 主な生成物:
  - `web/data/municipalities.geojson`
  - `web/data/boundary_layers.geojson`
  - `data/processed/municipality_names.json`

## J-SHIS 地震ハザードステーション

- 表層地盤、深部地盤、揺れやすさ補正に使う地盤モデル。
- 参照URL:
  - https://www.j-shis.bosai.go.jp/map/JSHIS2/download.html?lang=jp
- 主な生成物:
  - `web/data/ground_model.json`

## Natural Earth

- 日本周辺の陸域表示に使う世界地図データ。
- 参照URL:
  - https://www.naturalearthdata.com/
- 主な生成物:
  - `web/data/surrounding_land.geojson`

## シミュレーション計算について

現在の震度推定、P波/S波到達、緊急地震速報の表示判定は、上記資料を参考にした可視化用の簡易モデルです。防災判断や実際の発表判定には使用しません。

## 若松・松岡(2020) 地形・地盤分類データ

- 250mメッシュの地形・地盤分類コードとAVSを、揺れやすさ補正に使う地盤モデルへ集約。
- 参考URL:
  - https://www.j-shis.bosai.go.jp/map/JSHIS2/download.html?lang=jp
- 主な生成物:
  - `web/data/ground_model.json`

## Kunijiban（国土地盤情報）

- 国土交通省の道路・河川・港湾事業等の地質・土質調査成果をまとめた地盤情報。現時点ではデータセットメタ情報を出典として記録。
- 参考URL:
  - http://www.kunijiban.pwri.go.jp/jp/
- 参照ファイル:
  - `dataset.json`
