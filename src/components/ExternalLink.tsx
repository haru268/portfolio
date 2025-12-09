import Link from 'next/link';
import { FOCUS_STYLE } from '../constants/styles';

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  target?: '_blank';
  rel?: string;
};

export function ExternalLink({
  href,
  children,
  ariaLabel,
  className = '',
  target,
  rel = 'noopener noreferrer',
}: ExternalLinkProps) {
  const isExternal = href.startsWith('http');
  const linkClassName = `${className} ${FOCUS_STYLE}`;

  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={linkClassName}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

