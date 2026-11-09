# Cloudflare Workers Push Notifications

PWAを閉じていても通知を表示するための構成です。

## 1. VAPIDキーを作る

```powershell
node scripts/generate_vapid_keys.js
```

出力された `VAPID_PUBLIC_KEY` と `VAPID_PRIVATE_KEY` を控えます。

## 2. KVを作る

```powershell
npx wrangler kv namespace create PUSH_SUBSCRIPTIONS
```

表示された `id` を `workers/wrangler.toml` の `id` に入れます。

## 3. Workerのシークレットを設定する

```powershell
cd workers
npx wrangler secret put VAPID_PUBLIC_KEY
npx wrangler secret put VAPID_PRIVATE_KEY
npx wrangler secret put VAPID_SUBJECT
npx wrangler secret put ADMIN_NOTIFY_TOKEN
```

`VAPID_SUBJECT` は `mailto:you@example.com` のような連絡先です。`ADMIN_NOTIFY_TOKEN` は通知送信APIを守るための任意の長い文字列です。

公開環境の管理者は既存の `haruka` アカウントだけです。それ以外のアカウントは、以前の権限にかかわらず一般アカウントに統一します。ローカル環境では従来どおり `Local 管理者` に管理者権限を付与します。公開画面からの `haruka` の新規登録、ほかの名前から `haruka` への変更、`haruka` 自身の名前変更はできません。

Workerはアカウント処理時にD1の権限をこのルールに同期し、ログイン中のセッションにも反映します。既存アカウントのID・パスワード・投稿は変更しません。既存データに先に適用する場合は、`workers` ディレクトリで次を実行します。

```powershell
npx wrangler d1 execute we-simulator-presets --remote --file ./migrations/0007_community_account_roles.sql
```

固定パスワードによる認証の上書きはありません。`haruka` もD1に保存されたパスワードで認証します。以前の固定パスワードを使用している場合は、運用者が同じアカウントIDの認証情報を更新し、そのアカウントの旧セッションを失効させてください。

## 4. Workerをデプロイする

```powershell
cd workers
npx wrangler deploy
```

デプロイ後のURLを `web/push-config.json` に設定します。

```json
{
  "workerUrl": "https://we-simulator-push.h6fgpg2zht.workers.dev"
}
```

## 5. 通知を送信する

```powershell
$token = "ADMIN_NOTIFY_TOKENに設定した値"
$body = @{
  title = "WE-Simulator"
  body = "新しい地震シミュレーション通知です。"
  url = "./"
  tag = "earthquake-alert"
} | ConvertTo-Json
$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)

Invoke-RestMethod `
  -Method Post `
  -Uri "https://we-simulator-push.h6fgpg2zht.workers.dev/notify" `
  -Headers @{ Authorization = "Bearer $token" } `
  -ContentType "application/json" `
  -Body $bodyBytes
```

ブラウザ側で「通知を有効にする」を押して購読済みの端末にPush通知が届きます。

## サイトから通知を送る

Localサーバーで開いている場合は、管理者モード内の「通知送信」から送信できます。

```powershell
npm.cmd run web
```

`http://127.0.0.1:5173/` を開き、出典パネルの「管理者モード」から本文を入力して送信します。LocalサーバーはGit管理外の `.env` に保存された `ADMIN_NOTIFY_TOKEN` を使ってWorkerへ代理送信します。

公開サイトの親端末から送信する場合は、管理者モードで親端末に設定したあと、「通知送信用トークン」に `.env` の `ADMIN_NOTIFY_TOKEN` を入力して送信します。このトークンはブラウザに保存しません。
