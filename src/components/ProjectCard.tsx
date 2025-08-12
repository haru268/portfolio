
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Badge = { label: string; variant?: 'pink' | 'blue' | 'gray' };

export default function ProjectCard({
    imageSrc,
    imageAlt,
    title,
    description,
    badges = [],
    offset = 5,
    widthClass = 'w-96',
    heightClass = 'h-64',
    showBorder = true,
    href,
}: {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    badges?: Badge[];
    offset?: number;
    widthClass?: string;
    heightClass?: string;
    showBorder?: boolean;
    href?: string;         
}) {
    const CardInner = (
        <article className={`${widthClass}`}>
            {/* 画像＆黒四角レイヤー */}
            <div className={`relative ${heightClass}`}>
                {/* 黒い四角（画像がズレた時だけ見える“影”） */}
                <div className="absolute inset-0 bg-black" />

                {/* 画像だけ少し左上に動かす（ホバー／ドラッグ） */}
                <motion.div
                    drag
                    dragElastic={0.2}
                    whileHover={{ x: -offset, y: -offset }}
                    whileDrag={{ x: -offset, y: -offset }}
                    className="relative z-10 w-full h-full"
                >
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className={`object-cover ${showBorder ? 'border border-black' : ''}`}
                        draggable={false}
                        sizes="(min-width:1024px) 384px, (min-width:768px) 384px, 320px"
                    />
                </motion.div>
            </div>

            {/* タイトル＋バッジ＋説明（カードの外＝固定） */}
            <div className="mt-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    {badges.map((b) => (
                        <span
                            key={b.label}
                            className={
                                'text-xs px-2 py-1 rounded-full ' +
                                (b.variant === 'pink'
                                    ? 'bg-pink-100 text-pink-700'
                                    : b.variant === 'blue'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-gray-100 text-gray-700')
                            }
                        >
                            {b.label}
                        </span>
                    ))}
                </div>
                <p className="text-sm md:text-base text-gray-600 mt-1">{description}</p>
            </div>
        </article>
    );


    return href ? (
        <Link href={href} className="group block outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
            {CardInner}
        </Link>
    ) : (
        CardInner
    );
}
