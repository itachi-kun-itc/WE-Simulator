# Cloudflare D1 earthquake presets

地震プリセットを Cloudflare D1 に保存し、アプリ起動時は軽い一覧だけを取得します。
プリセットを選んだ時だけ、その1件の観測点・EEW詳細を取得します。

## 1. D1 database を作成

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
