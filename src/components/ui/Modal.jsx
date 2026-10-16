"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "./cn";
import { Button } from "./Button";

const SIZES = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
};

const LOCK = "fixed inset-0 z-50 flex justify-center";
const SCRIM = "absolute inset-0 bg-black/60";
const PANEL =
  "relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-2xl border border-primary-container/20 bg-surface/85 shadow-2xl backdrop-blur-lg outline-none";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useIsClient() {
  return useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);
}

export function useDialogBehavior(open, onClose) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      onClose?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);
}

export function useFocusTrap(open, panelRef) {
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;

    const focusable = panel.querySelectorAll(FOCUSABLE);
    (focusable[0] ?? panel).focus();

    const onKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const items = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [open, panelRef]);
}

export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  footer,
  className,
  children,
}) {
  const isClient = useIsClient();
  const panelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useDialogBehavior(open, onClose);
  useFocusTrap(open, panelRef);

  if (!isClient || !open) return null;

  return createPortal(
    <div className={cn(LOCK, "items-center p-4")}>
      <div className={SCRIM} onClick={onClose} aria-hidden='true' />
      <div
        ref={panelRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(PANEL, SIZES[size], className)}
      >
        {(title || onClose) && (
          <div className='flex items-start justify-between gap-4 p-6 pb-4'>
            <div>
              {title && (
                <h2 id={titleId} className='text-headline-sm text-on-surface'>
                  {title}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className='mt-1 text-body-sm text-on-surface-variant'>
                  {description}
                </p>
              )}
            </div>
            {onClose && (
              <Button
                variant='ghost'
                size='sm'
                onClick={onClose}
                aria-label='Close dialog'
                className='-mr-2 -mt-2 shrink-0'
              >
                <X aria-hidden='true' className='size-4' />
              </Button>
            )}
          </div>
        )}
        <div className='flex-1 overflow-y-auto px-6 pb-6'>{children}</div>
        {footer && (
          <div className='flex justify-end gap-3 border-t border-white/10 px-6 py-4'>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
