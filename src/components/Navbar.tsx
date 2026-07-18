'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/experiences', label: 'Experiencias' },
  { href: '/favorites', label: 'Favoritos' },
  { href: '/profile', label: 'Perfil' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-black tracking-tight text-slate-900">
          Wanderlust Explorer
        </Link>

        <ul className="flex items-center gap-2 sm:gap-3">
          {LINKS.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
