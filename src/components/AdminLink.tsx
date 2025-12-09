'use client';

import Link from 'next/link';
import { FaLock } from 'react-icons/fa';

export function AdminLink() {
  return (
    <Link
      href="/admin/login"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 opacity-0 hover:opacity-100 bg-transparent hover:bg-gray-800/20 text-gray-800 hover:text-gray-900 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-300/50"
      aria-label="管理画面へ"
      title="管理画面"
    >
      <FaLock className="w-5 h-5" />
    </Link>
  );
}

