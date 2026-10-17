"use client";

import { useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "./cn";
import { Button } from "./Button";
import { useDialogBehavior, useFocusTrap, useIsClient } from "./Modal";

const SIZES = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
};

const LOCK = "fixed inset-0 z-50 flex justify-center items-end sm:items-center sm:p-4";
const SCRIM = "absolute inset-0 bg-black/60";
const PANEL =
  "relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl border border-primary-container/20 bg-surface/85 shadow-2xl backdrop-blur-lg outline-none pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-0";

export function Sheet({
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
    <div className={LOCK}>
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
        <span
          aria-hidden='true'
          className='mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-outline-variant sm:hidden'
        />
        {(title || onClose) && (
          <div className='flex items-start justify-between gap-4 px-6 pt-5 pb-4'>
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
                aria-label='Close sheet'
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

export default Sheet;
