'use client';

import { authClient } from '@/lib/auth-client';
import { Avatar } from '@/components/ui/Avatar';
import NavDrawer from '@/app/components/NavDrawer';
import ThemeToggle from '@/app/components/ThemeToggle';
import UserProfileDropdown from '@/app/components/UserProfileDropdown';
import { BookOpen, LogOut, Menu, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Browse Tutors', href: '/tutors' },
  { name: 'Add Tutor', href: '/add-tutor', protected: true },
  { name: 'My Tutors', href: '/my-tutors', protected: true },
  { name: 'My Booked Sessions', href: '/booked-sessions', protected: true },
]

const isActivePath = (pathname, href) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const visibleNavItems = navItems.filter(item => {
    if (item.protected && !user) return false;
    return true;
  });

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl shadow-edge-top">
        <div className="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">

          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
              <BookOpen className="w-[22px] h-[22px] text-on-primary-container" />
            </div>
            <span className="text-headline-md tracking-tight text-on-surface">
              MediQueue
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden xl:flex items-center gap-1 bg-surface-container-low px-2 py-1.5 rounded-full shadow-edge-top"
          >
            {!isPending && visibleNavItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-1.5 rounded-full text-label-md transition-colors ${
                    isActive
                      ? 'bg-surface-container-high text-on-surface'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />

            {isPending ? (
              <div className="w-24 h-8 rounded-full bg-surface-container animate-pulse" />
            ) : user ? (
              <UserProfileDropdown user={user} />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/sign-up"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-label-md bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-label-md bg-primary-container hover:bg-primary-container/90 text-on-primary-container transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              className="xl:hidden w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      <NavDrawer
        id="mobile-nav-drawer"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        label="Site menu"
        footer={
          !isPending && (
            user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user?.image}
                    name={user?.name}
                    alt={user?.name || "User"}
                    size='sm'
                    referrerPolicy='no-referrer'
                  />
                  <p className="min-w-0 flex-1 truncate text-label-lg text-on-surface">{user?.name}</p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-label-lg transition-colors border border-outline-variant/30 flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); handleSignOut(); }}
                  className="w-full py-2.5 rounded-xl bg-error-container/40 hover:bg-error-container/60 text-on-error-container text-label-lg transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 w-full">
                <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="w-full">
                  <button className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-center text-label-lg text-on-surface border border-outline-variant/30 transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/sign-up" onClick={() => setMobileOpen(false)} className="w-full">
                  <button className="w-full py-2.5 rounded-xl bg-primary-container hover:bg-primary-container/90 text-center text-label-lg text-on-primary-container transition-colors">
                    Sign Up
                  </button>
                </Link>
              </div>
            )
          )
        }
      >
        <nav aria-label="Mobile" className="space-y-1">
          {!isPending && visibleNavItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`block py-3 px-4 text-body-lg font-semibold rounded-2xl transition-colors ${
                  isActive
                    ? 'bg-surface-container-high text-on-surface'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </NavDrawer>
    </>
  )
}

export default Navbar;
