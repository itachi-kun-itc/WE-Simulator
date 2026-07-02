# プレート境界データ出典

このアプリの `web/data/plate_boundaries.geojson` は、気象研究所のプレート形状データをもとに生成しています。現在の地図表示では、海域表示に絞るため `mapdata/trench.dat` の海溝・トラフ線を使用しています。

- 配布ページ: https://www.mri-jma.go.jp/Dep/sei/fhirose/plate/PlateData.html
- 使用アーカイブ: https://www.mri-jma.go.jp/Dep/sei/fhirose/data/plate_data.tar.gz
- 生成スクリプト: `scripts/build_plate_boundaries.js`

## 引用

配布元の「データを使用した際の引用について」に従い、使用地域に対応した出典論文を明記します。

- 北海道〜東北地方: Kita et al. (2010, EPSL), Nakajima and Hasegawa (2006, GRL)
- 東北地方南部〜関東地方: Nakajima and Hasegawa (2006, GRL), 弘瀬・他 (2008, 地震), Nakajima et al. (2009, JGR)
- 西南日本: Baba et al. (2002, PEPI), Nakajima and Hasegawa (2007, JGR), Hirose et al. (2008, JGR)

## 変換内容

- `mapdata/trench.dat`: 日本周辺の海溝・トラフ線として描画。
- プレート上面の等深線データはアーカイブ内に含まれていますが、陸域に入り込むため現在の海域線表示には使用していません。
