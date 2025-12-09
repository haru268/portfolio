export type ProjectCardData = {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  badges: { label: string; variant: 'pink' | 'blue' | 'gray' }[];
};

export const projectCards: ProjectCardData[] = [
  {
    slug: 'fleamarket',
    imageSrc: '/fleamarket.jpg',
    imageAlt: 'フリマアプリ',
    title: 'フリマアプリ',
    description: 'Laravel + React で作成したフリマアプリ',
    badges: [{ label: 'private', variant: 'pink' }],
  },
  {
    slug: 'portfolio',
    imageSrc: '/portfolio.jpg',
    imageAlt: 'ポートフォリオサイト',
    title: 'ポートフォリオサイト',
    description: 'Next.js + TypeScript で作成した個人サイト',
    badges: [
      { label: 'private', variant: 'pink' },
      { label: 'ongoing', variant: 'blue' },
    ],
  },
  {
    slug: 'attendance',
    imageSrc: '/attendance.jpg',
    imageAlt: 'Attendance（勤怠管理アプリ）',
    title: '勤怠管理アプリ',
    description: 'Laravel + MySQL の勤怠管理アプリ',
    badges: [{ label: 'private', variant: 'pink' }],
  },
  {
    slug: 'gacha',
    imageSrc: '/gacha.jpg',
    imageAlt: 'Gacha Lite',
    title: 'Gacha Lite 🎲',
    description: 'Laravel + Next.js のガチャアプリ',
    badges: [{ label: 'private', variant: 'gray' }],
  },
];

