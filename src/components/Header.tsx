'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FOCUS_STYLE } from '../constants/styles';

const navItems = [
  { href: '/#projects', label: 'WORKS' },
  { href: '/#skills', label: 'SKILL' },
  { href: '/#about', label: 'ABOUT' },
  { href: '/#contact', label: 'CONTACT' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 border-b border-gray-200">
      <nav className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex h-14 md:h-16 items-center justify-between">
          <Link href="/#top" className="text-black text-2xl md:text-3xl font-extrabold tracking-wide">
            Haruki Kumon
          </Link>

          <ul className="hidden md:flex items-center gap-8 uppercase tracking-wider text-base md:text-lg text-black font-bold">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative hover:text-blue-600 transition-colors duration-300 ${FOCUS_STYLE} after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            aria-label="メニューを開く"
            aria-expanded={open}
            className={`md:hidden p-2 text-black ${FOCUS_STYLE}`}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block w-7 h-[3px] bg-black mb-1" />
            <span className="block w-7 h-[3px] bg-black mb-1" />
            <span className="block w-7 h-[3px] bg-black" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-white/95 border-t border-gray-200">
          <ul className="px-4 pb-4 space-y-3 uppercase tracking-wider text-lg text-black font-bold">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block ${FOCUS_STYLE}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
