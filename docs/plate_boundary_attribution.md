# プレート境界データ出典

最終更新：2026-07-11

このアプリの `web/data/plate_boundaries.geojson` は、PB2002 Plate Boundaries を日本周辺に切り出し、表示用に軽量化したものです。

## 使用データ

- PB2002 Plate Boundaries / fraxen tectonicplates
  - https://github.com/fraxen/tectonicplates
- 元論文
  - Bird, P. (2003), An updated digital model of plate boundaries
  - https://doi.org/10.1029/2001GC000252

## 加工内容

- 日本周辺のみを抽出
- 表示用に座標を簡略化
- `subduction` とその他境界を属性として保持
- 地図上では点線・黄色系で表示

## 生成物

- `web/data/plate_boundaries.geojson`
