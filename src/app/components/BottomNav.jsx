"use client";

import { authClient } from "@/lib/auth-client";
import { BookOpen, CalendarCheck, Home, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Tutors", href: "/tutors", icon: BookOpen },
  {
    name: "Booked",
    href: "/booked-sessions",
    icon: CalendarCheck,
    protected: true,
  },
  { name: "Add", href: "/add-tutor", icon: PlusCircle, protected: true },
  { name: "Profile", href: "/profile", icon: User },
];

const isActivePath = (pathname, href) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function BottomNav() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();

  const visibleNavItems = navItems.filter(
    (item) => !(item.protected && !user)
  );

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant/30 bg-surface/80 pb-[env(safe-area-inset-bottom)] shadow-edge-bottom backdrop-blur-xl xl:hidden"
    >
      <ul className="mx-auto flex max-w-7xl items-stretch justify-around px-2">
        {!isPending &&
          visibleNavItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            const Icon = item.icon;
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 text-label-sm transition-colors ${
                    active
                      ? "text-primary-container"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                  <span>{item.name}</span>
                  <span
                    aria-hidden="true"
                    className={`h-1 w-1 rounded-full bg-primary-container shadow-[0_0_8px_var(--color-primary-container)] ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

export default BottomNav;
