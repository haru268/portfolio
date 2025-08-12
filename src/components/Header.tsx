'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        fixed top-0 inset-x-0 z-50
        bg-white/95 backdrop-blur
        supports-[backdrop-filter]:bg-white/90
        border-b border-gray-200
      "
    >
      <nav className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex h-14 md:h-16 items-center justify-between">
          {/* 左：ロゴ → トップページへ */}
          <Link href="/#top" className="text-black text-2xl md:text-3xl font-extrabold tracking-wide">
            Haruki Kumon
          </Link>

          {/* 右：PCナビ → トップページ内の各セクションへ */}
          <ul className="hidden md:flex items-center gap-8 uppercase tracking-wider text-base md:text-lg text-black font-bold">
            <li><Link href="/#projects" className="hover:opacity-80">WORKS</Link></li>
            <li><Link href="/#skills"   className="hover:opacity-80">SKILL</Link></li>
            <li><Link href="/#about"    className="hover:opacity-80">ABOUT</Link></li>
            <li><Link href="/#contact"  className="hover:opacity-80">CONTACT</Link></li>
          </ul>

          {/* モバイル切替 */}
          <button
            aria-label="Toggle menu"
            className="md:hidden p-2 text-black"
            onClick={() => setOpen(v => !v)}
          >
            <span className="block w-7 h-[3px] bg-black mb-1" />
            <span className="block w-7 h-[3px] bg-black mb-1" />
            <span className="block w-7 h-[3px] bg-black" />
          </button>
        </div>
      </nav>

      {/* モバイルメニュー（リンク押したら閉じる） */}
      {open && (
        <div className="md:hidden bg-white/95 border-t border-gray-200">
          <ul className="px-4 pb-4 space-y-3 uppercase tracking-wider text-lg text-black font-bold">
            <li><Link href="/#projects" onClick={() => setOpen(false)}>WORKS</Link></li>
            <li><Link href="/#skills"   onClick={() => setOpen(false)}>SKILL</Link></li>
            <li><Link href="/#about"    onClick={() => setOpen(false)}>ABOUT</Link></li>
            <li><Link href="/#contact"  onClick={() => setOpen(false)}>CONTACT</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
