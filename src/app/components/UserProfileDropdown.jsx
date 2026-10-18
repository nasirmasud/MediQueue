"use client";

import { Avatar } from "@/components/ui/Avatar";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const ITEMS = [
  { key: "profile", label: "Profile", icon: User, tone: "text-primary" },
  { key: "logout", label: "Sign Out", icon: LogOut, tone: "text-error" },
];

const UserProfileDropdown = ({ user, onNavigate }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSignOut = async () => {
    await authClient.signOut();
    onNavigate?.();
    router.push("/");
  };

  const handleAction = (key) => {
    setOpen(false);

    if (key === "profile") {
      onNavigate?.();
      router.push("/profile");
      return;
    }

    if (key === "logout") {
      handleSignOut();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="User menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 cursor-pointer items-center gap-2.5 rounded-full bg-surface-container pl-1 pr-2 transition-colors hover:bg-surface-container-high"
      >
        <Avatar
          src={user?.image}
          name={user?.name}
          alt=""
          size="2xs"
          referrerPolicy="no-referrer"
        />
        <span className="hidden max-w-[120px] text-left lg:block">
          <span className="block truncate text-label-md leading-none text-on-surface">
            {user?.name}
          </span>
        </span>
        <ChevronDown className="hidden size-4 shrink-0 text-on-surface-variant sm:block" />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-primary-container/20 bg-surface/90 p-1.5 shadow-2xl backdrop-blur-lg"
        >
          {ITEMS.map(({ key, label, icon: Icon, tone }) => (
            <button
              key={key}
              type="button"
              role="menuitem"
              onClick={() => handleAction(key)}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-label-md text-on-surface transition-colors hover:bg-surface-container-high"
            >
              <Icon aria-hidden="true" className={`size-4 shrink-0 ${tone}`} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
