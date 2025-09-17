
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header'; 

type Project = {
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

const projects: Record<string, Project> = {
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

    // /works/portfolio
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
        image: '/attendance.jpg',  // public/attendance.jpg
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
        imageHeight: 'h-72 md:h-96',  // 必要に応じて調整
        imagePadding: 'p-2',
    },

    // /works/gacha
    gacha: {
        title: 'Gacha Lite 🎲',
        image: '/gacha.jpg', // スクショ画像を public/images に置いてね
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

type Slug = keyof typeof projects;

export default async function WorkDetail(
    { params }: { params: Promise<{ slug: Slug }> }
) {
    const { slug } = await params;
    const data = projects[slug];

    if (!data) return notFound();

    const boxH = data.imageHeight ?? 'h-72 md:h-96';
    const pad = data.imagePadding ?? 'p-2';

    return (
        <>
            {/* ★ ヘッダーを表示（固定なので下の main に上余白を追加） */}
            <Header />

            <main id="top" className="mx-auto max-w-5xl px-6 pt-24 pb-16 space-y-10">
                {/* ★ パンくずは非表示（HOME / WORKS / … を削除） */}

                {/* タイトル・バッジ */}
                <header>
                    <h1 className="text-3xl md:text-4xl font-extrabold">{data.title}</h1>
                    <div className="mt-3 flex gap-2 flex-wrap">
                        {data.status.map((s) => (
                            <span key={s} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                {s}
                            </span>
                        ))}
                    </div>
                </header>

                {/* メイン画像（全体表示） */}
                <div className={`relative w-full ${boxH} rounded-lg border border-gray-200 bg-white`}>
                    <Image src={data.image} alt={data.title} fill className={`object-contain ${pad}`} priority />
                </div>

                {/* 半透明の“テーブル風”パネル（概要/機能/スタック/GitHub） */}
                <section>
                    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm shadow-sm p-6 md:p-8">
                        <dl className="divide-y divide-white/40">
                            <div className="grid grid-cols-[7.5rem,1fr] gap-3 py-3 md:py-4">
                                <dt className="text-sm md:text-base font-semibold text-gray-700">概要</dt>
                                <dd className="text-gray-900">{data.summary}</dd>
                            </div>

                            <div className="grid grid-cols-[7.5rem,1fr] gap-3 py-3 md:py-4">
                                <dt className="text-sm md:text-base font-semibold text-gray-700">機能</dt>
                                <dd>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-900">
                                        {data.details.map((d) => <li key={d}>{d}</li>)}
                                    </ul>
                                </dd>
                            </div>

                            <div className="grid grid-cols-[7.5rem,1fr] md:grid-cols-[7.5rem,1fr] gap-3 py-3 md:py-4">
                                <dt className="text-sm md:text-base font-semibold text-gray-700">技術スタック</dt>
                                <dd className="flex flex-wrap gap-2">
                                    {data.stack.map((t) => (
                                        <span key={t} className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100">
                                            {t}
                                        </span>
                                    ))}
                                </dd>
                            </div>

                            <div className="grid grid-cols-[7.5rem,1fr] gap-3 py-3 md:py-4">
                                <dt className="text-sm md:text-base font-semibold text-gray-700">GitHub</dt>
                                <dd>
                                    {data.github?.trim() ? (
                                        <a
                                            href={data.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline hover:opacity-80 break-all"
                                        >
                                            {data.github}
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">非公開 / 準備中</span>
                                    )}
                                </dd>
                            </div>

                        </dl>
                    </div>
                </section>

                {/* 参考リンク（ある場合のみ） */}
                {data.refs && data.refs.length > 0 && (
                    <section>
                        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm shadow-sm p-6 md:p-8">
                            <dl className="divide-y divide-white/40">
                                <div className="grid grid-cols-[7.5rem,1fr] gap-3 py-3 md:py-4">
                                    <dt className="text-sm md:text-base font-semibold text-gray-700">参考</dt>
                                    <dd className="flex flex-col gap-1">
                                        {data.refs.map((r) => (
                                            <Link
                                                key={r.href}
                                                href={r.href}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                className="text-blue-600 underline break-words"
                                            >
                                                {r.label ?? r.href}
                                            </Link>
                                        ))}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
