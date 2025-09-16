import type { Metadata } from 'next';
import './globals.css';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Haruki Kumon | Web Application Engineer',
  description:
    'Next.js / React / Laravel を中心に、使いやすさ重視のWebアプリを設計・実装します。',
  openGraph: {
    title: 'Haruki Kumon | Web Application Engineer',
    description:
      'UI/UX × フルスタックで“使いやすい”を形に。',
    // images は未設定（後でOG画像を作ったら追加する）
  },
  twitter: {
    card: 'summary', // 画像なしでもテキストで見栄えが整う
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-[url('/bg-paws.png')] bg-fixed bg-center bg-no-repeat bg-cover overflow-x-hidden">
        {children}
        <Footer />
      </body>
    </html>
  );
}
