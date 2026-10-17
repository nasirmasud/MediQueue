"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/components/ui/cn";

export function NavDrawer({
  id,
  open,
  onClose,
  title = "MediQueue",
  label,
  children,
  footer,
  className,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      id={id}
      className={cn(
        "fixed inset-0 z-[9999] xl:hidden transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label ?? title}
        tabIndex={-1}
        className={cn(
          "absolute top-0 left-0 flex h-full w-72 max-w-[80%] flex-col bg-surface-container-lowest shadow-2xl outline-none transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-outline-variant/30 p-4">
          <span className="text-headline-sm tracking-tight text-on-surface">
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>

        {footer ? (
          <div className="border-t border-outline-variant/30 bg-surface-container-low p-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default NavDrawer;
