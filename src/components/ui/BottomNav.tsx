'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

interface NavItemConfig {
  href: string;
  label: string;
  icon: React.FC<{ active: boolean }>;
  authOnly?: boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/siddur', label: 'Daven', icon: SiddurIcon },
  { href: '/amud', label: 'Amud', icon: AmudIcon },
  { href: '/guide', label: 'Living', icon: LivingIcon },
  { href: '/brachot', label: 'Brachot', icon: BrachotIcon },
];

export function BottomNav() {
  const pathname = usePathname();
  const authStatus = useAuthStore((s) => s.status);

  return (
    <>
      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-24" />
      <nav className="fixed bottom-4 left-4 right-4 z-50 pointer-events-none">
        {/* Floating Frosted glass pill */}
        <div className="pointer-events-auto max-w-md mx-auto bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12)] rounded-[2rem] overflow-hidden">
          <div className="flex items-center justify-around px-2 py-1">
            {NAV_ITEMS.map((item) => {
              if (item.authOnly && authStatus !== 'authenticated') {
                return (
                  <NavLink
                    key={item.label}
                    href="/login"
                    label={item.label}
                    icon={item.icon}
                    active={false}
                  />
                );
              }
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={active}
                />
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.FC<{ active: boolean }>;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        relative flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[64px] rounded-xl
        transition-all duration-300 ease-out hover:bg-black/5
        ${active ? 'text-[var(--primary)] scale-105' : 'text-gray-400 active:scale-95'}
      `}
    >
      <div className="relative">
        <Icon active={active} />
        {active && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shadow-[0_0_8px_rgba(181,132,43,0.6)]" />
        )}
      </div>
      <span
        className={`text-[10px] tracking-wide transition-all ${active ? 'font-bold opacity-100' : 'font-medium opacity-80'
          }`}
      >
        {label}
      </span>
    </Link>
  );
}

// Clean, iOS-style SVG icons — outlined when inactive, filled when active

function HomeIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.707 2.293a1 1 0 0 0-1.414 0l-9 9a1 1 0 0 0 .707 1.707H4v7a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a2 2 0 0 1 4 0v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9Z" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a2 2 0 01-2-2v-3a2 2 0 014 0v3a2 2 0 01-2 2z" />
    </svg>
  );
}

function SiddurIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Z" />
      <path d="M8 6h8M8 10h8M8 14h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Z" />
      <path d="M8 6h8M8 10h8M8 14h5" />
    </svg>
  );
}

function AmudIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a3 3 0 0 0-3 3v3H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-3V5a3 3 0 0 0-3-3z" />
      <path d="M9 14h6M9 18h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a3 3 0 0 0-3 3v3H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-3V5a3 3 0 0 0-3-3z" />
      <path d="M9 14h6M9 18h6" />
    </svg>
  );
}

function LivingIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function BrachotIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <path d="M6 1v3M10 1v3M14 1v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <path d="M6 1v3M10 1v3M14 1v3" />
    </svg>
  );
}
