# Cloudflare D1 app data

地震プリセットを Cloudflare D1 に保存し、アプリ起動時は軽い一覧だけを取得します。
メンテナンスモードの現在状態と親端末トークンも同じD1に保存します。
プリセットを選んだ時だけ、その1件の観測点・EEW詳細を取得します。

## 1. D1 database を作成

非対話環境では `CLOUDFLARE_API_TOKEN` が必要です。

```powershell
$env:CLOUDFLARE_API_TOKEN="..."
```

```powershell
cd workers
npx wrangler d1 create we-simulator-presets
```

表示された `database_id` を `workers/wrangler.toml` の `database_id` に入れます。

## 2. schema を適用

```powershell
cd workers
npx wrangler d1 execute we-simulator-presets --remote --file ./d1/0001_earthquake_presets.sql
```

メンテナンス状態用テーブルも適用します。

```powershell
cd workers
npx wrangler d1 execute we-simulator-presets --remote --file ./d1/0002_maintenance.sql
```

## 3. Worker をデプロイ

```powershell
cd workers
npx wrangler deploy
```

## 4. プリセットをD1へ投入

`ADMIN_NOTIFY_TOKEN` は Worker secret と同じ値を使います。

```powershell
$env:ADMIN_NOTIFY_TOKEN="..."
$env:WE_SIMULATOR_WORKER_URL="https://we-simulator-push.h6fgpg2zht.workers.dev"
cd ..
npm run upload:earthquake-presets
```

## API

- `GET /earthquake-presets`
  - 一覧用の軽量データのみ返します。
- `GET /earthquake-presets/:id`
  - 選択したプリセット1件の観測点・EEW詳細を返します。
- `POST /admin/earthquake-presets`
  - 管理者用。JSON 1件をD1へ upsert します。
- `GET /maintenance-status`
  - メンテナンスモードの現在状態をD1から返します。
- `POST /maintenance-action`
  - 親端末ログインは既存Apps Scriptを経由して認証し、取得した親端末トークンをD1へ保存します。
  - メンテナンス開始・解除、親端末解除はD1を更新し、ログだけApps Scriptへ送信します。

## R2

大きい地図データを将来退避する候補です。バケット作成にはAPIトークンにR2編集権限が必要です。

```powershell
cd workers
npx wrangler r2 bucket create we-simulator-data
```
