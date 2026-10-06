'use client';

import { authClient } from '@/lib/auth-client';
import UserProfileDropdown from '@/app/components/UserProfileDropdown';
import { Avatar } from '@heroui/react';
import { BookOpen, LogOut, Menu, Moon, Sun, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Browse Tutors', href: '/tutors' },
  { name: 'Add Tutor', href: '/add-tutor', protected: true },
  { name: 'My Tutors', href: '/my-tutors', protected: true },
  { name: 'My Booked Sessions', href: '/booked-sessions', protected: true },
]

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [theme, setTheme] = useState('light');

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const visibleNavItems = navItems.filter(item => {
    if (item.protected && !user) return false;
    return true;
  });

  const handleThemeToggle = (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
  }, [mobileOpen]);

  const getFallbackName = () => {
    if (user?.name) {
      return user.name.trim().charAt(0).toUpperCase();
    }
    return 'M';
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 shadow-sm transition-all duration-300 w-full">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="flex items-center justify-between h-16 gap-4">

            <div className="flex-1 flex justify-start">
              <Link href="/" className="flex items-center gap-2 shrink-0">
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200/50">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  MediQueue
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center justify-center gap-1 flex-initial">
              {!isPending && visibleNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium relative transition-colors rounded-lg hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 whitespace-nowrap"
                  >
                    <span className={isActive ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-gray-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400'}>
                      {item.name}
                    </span>
                    <span className={`absolute -bottom-1 left-4 right-4 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 ${isActive ? 'w-[calc(100%-32px)]' : 'w-0'}`} />
                  </Link>
                )
              })}
            </nav>

            <div className="hidden md:flex items-center justify-end gap-3 flex-1">

              {/* Theme Toggle */}
              <label className="w-9 h-9 rounded-full bg-gray-100 dark:bg-zinc-900 border border-indigo-600 dark:border-indigo-400 text-gray-700 dark:text-zinc-300 flex items-center justify-center transition-all cursor-pointer hover:ring-2 hover:ring-indigo-600/20 dark:hover:ring-indigo-400/20">
                <input
                  type="checkbox"
                  className="hidden"
                  onChange={handleThemeToggle}
                  checked={theme === 'dark'}
                />
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </label>

              {/* User Section */}
              {isPending ? (
                <div className="w-24 h-8 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-full" />
              ) : user ? (
                <UserProfileDropdown user={user} />
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <Link href="/sign-up" className="shrink-0">
                    <button className="h-9 px-5 rounded-full bg-gray-100 dark:bg-zinc-900 border border-indigo-600 dark:border-indigo-400 text-xs font-bold text-gray-700 dark:text-zinc-300 transition-all flex items-center justify-center whitespace-nowrap hover:ring-2 hover:ring-indigo-600/20 dark:hover:ring-indigo-400/20">
                      Sign Up
                    </button>
                  </Link>
                  <Link href="/sign-in" className="shrink-0">
                    <button className="h-9 px-5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition-all flex items-center justify-center whitespace-nowrap shadow-sm">
                      Sign In
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors border border-gray-200 dark:border-zinc-800"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Layout */}
      <div className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <div className={`absolute top-0 left-0 w-72 h-full bg-white dark:bg-zinc-900 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>

          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">MediQueue</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
            {!isPending && visibleNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 px-4 text-base font-semibold rounded-2xl transition-all ${isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800'
                    }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile User Profile Footer */}
          {!isPending && (
            <div className="p-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 flex flex-col gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <Avatar.Image alt={user?.name || "User"} src={user?.image} referrerPolicy='no-referrer' />
                      <Avatar.Fallback>{getFallbackName()}</Avatar.Fallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name}</p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200 text-sm font-bold transition-colors border border-gray-200 dark:border-zinc-700 flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); handleSignOut(); }}
                    className="w-full py-2.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 text-sm font-bold transition-colors border border-red-100 dark:border-red-900/30 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="w-full">
                    <button className="w-full py-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-center text-sm font-bold text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setMobileOpen(false)} className="w-full">
                    <button className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-center text-sm font-bold text-white shadow-md">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default Navbar;