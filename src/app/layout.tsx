import type { Metadata } from 'next';
import './globals.css';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Haruki Kumon portfolio',
  description: 'Haruki Kumon’s portfolio site',
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
