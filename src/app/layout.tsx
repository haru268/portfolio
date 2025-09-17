import type { Metadata } from 'next';
import './globals.css';
import Footer from '../components/Footer';

export const metadata = {
  metadataBase: new URL("https://portfolio-3m2e.vercel.app"),
  title: "Haruki Kumon | Web Application Engineer",
  description: "UI/UX-focused web apps with React/Next.js/Laravel.",
  openGraph: { title: "Haruki Kumon | Web Application Engineer", description: "Haruki Kumon's portfolio site." },
  twitter: { card: "summary" },
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
