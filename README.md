# チームコンディション ダッシュボード

## 起動
```bash
npm install && npm run dev   # http://localhost:3000
```
`NEXT_PUBLIC_GAS_API_URL` 未設定時は LocalStorage で動作します(デモ可)。

## GAS 連携
1. スプレッドシートを作成 → 拡張機能 → Apps Script に `gas/code.gs` を貼り付け
2. デプロイ → 新しいデプロイ → 種類「ウェブアプリ」/ 実行ユーザー: 自分 / アクセス: 全員
3. 発行された URL を `.env.local` に設定: `NEXT_PUBLIC_GAS_API_URL=https://script.google.com/macros/s/xxxx/exec`
4. コード変更時は「デプロイを管理」から新バージョンで再デプロイ

管理者名(`lib/store.ts` の `ADMINS`)と同名のシートに回答が追記されます(無ければ自動作成)。
アンケートの POST は CORS プリフライト回避のため `text/plain` で送信しています。

## 補足
- 個人リンクのトークンはスタッフ情報を含むため、GAS 連携時も回答は個別に送信できます。「再発行」で nonce が変わり新リンクになりますが、旧リンクの無効化にはサーバー側のスタッフ台帳が必要です。
- スタッフ一覧は現状ブラウザ(LocalStorage)保存です。
