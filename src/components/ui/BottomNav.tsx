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
  { href: '/siddur', label: 'Siddur', icon: SiddurIcon },
  { href: '/settings', label: 'Settings', icon: SettingsIcon, authOnly: true },
];

export function BottomNav() {
  const pathname = usePathname();
  const authStatus = useAuthStore((s) => s.status);

  return (
    <>
      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-20" />
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        {/* Frosted glass background */}
        <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200/60 shadow-[0_-1px_3px_rgba(0,0,0,0.04)]">
          <div className="max-w-md mx-auto flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
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
        relative flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[56px]
        transition-colors duration-200
        ${active ? 'text-[#1B4965]' : 'text-gray-400 active:text-gray-500'}
      `}
    >
      <div className="relative">
        <Icon active={active} />
        {active && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1B4965]" />
        )}
      </div>
      <span
        className={`text-[10px] mt-0.5 ${
          active ? 'font-semibold' : 'font-medium'
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

function SettingsIcon({ active }: { active: boolean }) {
  return active ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
