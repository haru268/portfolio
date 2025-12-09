# 管理画面の使い方

## アクセス方法

1. トップページの右下にある鍵アイコンをクリック
2. ログイン画面でパスワードを入力（デフォルト: `ruiruna`）
3. WORKS管理画面にアクセス

## パスワードの変更

環境変数で設定できます：

```bash
# .env.local ファイルに追加
NEXT_PUBLIC_ADMIN_PASSWORD=あなたのパスワード
```

## API経由でのデータベース保存について

現在の実装では、プロジェクトデータを `data/projects.json` ファイルに保存しています。

### 本番環境でデータベースを使用する場合

1. **データベースを選択**
   - PostgreSQL、MySQL、MongoDB など

2. **APIルートを修正** (`src/app/api/admin/works/route.ts`)
   ```typescript
   // 例: PostgreSQL を使用する場合
   import { Pool } from 'pg';
   
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
   });
   
   export async function POST(request: NextRequest) {
     const body = await request.json();
     // データベースに保存
     await pool.query('INSERT INTO projects ...');
   }
   ```

3. **環境変数を設定**
   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   ```

### 画像の保存

- 画像は `public/` フォルダに保存されます
- ファイル名は `{タイムスタンプ}-{元のファイル名}` の形式です
- 例: `public/1234567890-image.jpg` → `/1234567890-image.jpg` でアクセス可能

## 機能

- ✅ プロジェクトの追加・編集
- ✅ 画像アップロード（public/フォルダに保存）
- ✅ 技術スタックの選択
- ✅ ステータスの選択（private、ongoing、public、complete）
- ✅ 機能の追加・削除

