export type Project = {
  title: string;
  image: string;
  summary: string;
  details: string[];
  stack: string[];
  github: string;
  status: string[];
  imageHeight?: string;
  imagePadding?: string;
  refs?: { label?: string; href: string }[];
};

export const projects: Record<string, Project> = {
  fleamarket: {
    title: 'フリマアプリ',
    image: '/fleamarket.jpg',
    summary:
      'Laravel + React で作成したフリマアプリ。出品・購入・検索・お気に入り等の基本機能を実装。',
    details: [
      'ユーザー登録／ログイン（JWT）',
      '商品出品／編集／削除、画像アップロード',
      '商品検索（キーワード・カテゴリ）',
      'カート／注文（ダミー決済）',
      'レスポンシブ対応、アクセシビリティ配慮',
    ],
    stack: ['Laravel', 'React', 'TypeScript', 'MySQL', 'Docker'],
    github: 'https://github.com/haru268/fleamarketapp01',
    status: ['private', 'ongoing'],
    imageHeight: 'h-72 md:h-96',
    imagePadding: 'p-2',
  },

  portfolio: {
    title: 'ポートフォリオサイト',
    image: '/portfolio.jpg',
    summary:
      'Next.js + TypeScript で作成した個人ポートフォリオ。WORKS・SKILL・ABOUT の構成で、軽量・見やすさを重視。',
    details: [
      'Hero 画像＋自己紹介オーバーレイ',
      'WORKS カード（ドラッグ演出付き）',
      'SKILL アイコン＆レベル表現',
      'ABOUT 半透明テーブル風プロフィール',
      'レスポンシブ対応',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/yourname/your-portfolio',
    status: ['private', 'ongoing'],
    imageHeight: 'h-[28rem] md:h-[36rem]',
    imagePadding: 'p-0',
    refs: [
      { label: 'SORA ITO Portfolio', href: 'https://sora-ito-portfolio.netlify.app/#/' },
      { label: 'Web Designer GO – portfolio-02', href: 'https://webdesigner-go.com/template/portfolio-02/' },
    ],
  },

  attendance: {
    title: '勤怠管理アプリ（Attendance）',
    image: '/attendance.jpg',
    summary:
      '出勤・退勤・休憩打刻、日次/月次の勤怠集計、承認ワークフローを備えた勤怠管理アプリ。',
    details: [
      '打刻：出勤 / 退勤 / 休憩開始・終了（重複防止・バリデーション）',
      '日次明細：当日の合計労働時間 / 休憩時間 / 残業時間を自動計算',
      '月次集計：月次サマリーの閲覧と CSV エクスポート',
      '承認フロー：申請（修正/有給）→ 上長承認',
      'ユーザー / 権限管理（一般 / 承認者 / 管理者）',
      'レスポンシブ対応、アクセシビリティ配慮',
    ],
    stack: ['Laravel', 'PHP 8.2', 'MySQL 8.0', 'Docker', 'Blade/Tailwind'],
    github: '',
    status: ['private', 'ongoing'],
    imageHeight: 'h-72 md:h-96',
    imagePadding: 'p-2',
  },

  gacha: {
    title: 'Gacha Lite 🎲',
    image: '/gacha.jpg',
    summary:
      'Laravel + Next.js で作成したガチャアプリ。履歴保存・ランキング機能・CSV出力・API化に対応し、フロントではグラフ表示も可能。',
    details: [
      '🎲 ガチャ抽選機能（レア度ごとの排出率対応）',
      '📜 抽選履歴の保存（ユーザー名 / セッションキー）',
      '📊 ランキングページ（回数 / UR数 / 図鑑完成率）',
      '🗂 CSV 出力機能',
      '🌐 API 提供（/api/gacha, /api/history, /api/ranking）',
      '📈 Next.js + Recharts でランキングをグラフ表示',
    ],
    stack: ['Laravel', 'PHP', 'SQLite', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    github: 'https://github.com/haru268/gacha-lite',
    status: ['public', 'complete'],
    imageHeight: 'h-[28rem] md:h-[36rem]',
    imagePadding: 'p-0',
  },
};

