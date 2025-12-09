'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { badgeStyles, FOCUS_STYLE } from '../constants/styles';

type Badge = { label: string; variant?: 'pink' | 'blue' | 'gray' };

type ProjectCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  badges?: Badge[];
  href?: string;
};

export default function ProjectCard({
  imageSrc,
  imageAlt,
  title,
  description,
  badges = [],
  href,
}: ProjectCardProps) {
  const cardContent = (
    <article className="w-full group">
      <div className="relative h-64 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-black" />
        <motion.div
          drag
          dragElastic={0.2}
          whileHover={{ x: -8, y: -8, scale: 1.02 }}
          whileDrag={{ x: -8, y: -8 }}
          className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover border border-black transition-transform duration-300 group-hover:brightness-110"
            draggable={false}
            sizes="(min-width:1024px) 384px, (min-width:768px) 384px, 320px"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
          {badges.map((badge) => (
            <motion.span
              key={badge.label}
              whileHover={{ scale: 1.1 }}
              className={`text-xs px-2 py-1 rounded-full ${badgeStyles[badge.variant || 'gray']} transition-shadow duration-300`}
            >
              {badge.label}
            </motion.span>
          ))}
        </div>
        <p className="text-sm md:text-base text-gray-600 mt-1 group-hover:text-gray-800 transition-colors duration-300">{description}</p>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`block transition-transform duration-300 hover:scale-[1.02] ${FOCUS_STYLE}`}
        aria-label={`${title}の詳細を見る`}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
