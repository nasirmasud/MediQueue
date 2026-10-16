import Image from "next/image";
import { cn } from "./cn";

const WRAP = "relative inline-flex shrink-0";

const CIRCLE = "overflow-hidden rounded-full bg-surface-container-highest";

const SIZES = {
  xs: "w-9 h-9",
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-16 h-16",
};

const PIXELS = { xs: 36, sm: 40, md: 56, lg: 64 };

const RINGS = {
  none: "",
  primary: "ring-2 ring-primary/60",
  surface: "ring-2 ring-surface-container-low",
};

const STATUS_SIZES = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
};

const STATUS_TONES = {
  tertiary: "bg-tertiary",
  secondary: "bg-secondary",
  outline: "bg-outline",
};

export function Avatar({
  src,
  alt = "",
  name,
  size = "sm",
  ring = "none",
  status,
  statusSize = "sm",
  statusLabel,
  referrerPolicy,
  className,
  ...props
}) {
  const initial = (name ?? alt).trim().charAt(0).toUpperCase();

  return (
    <span className={cn(WRAP, SIZES[size], className)} {...props}>
      <span className={cn(CIRCLE, "h-full w-full", RINGS[ring])}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={PIXELS[size] ?? 40}
            height={PIXELS[size] ?? 40}
            referrerPolicy={referrerPolicy}
            className='h-full w-full object-cover'
          />
        ) : (
          <span
            aria-hidden='true'
            className='flex h-full w-full select-none items-center justify-center text-label-lg text-on-surface-variant'
          >
            {initial || "?"}
          </span>
        )}
      </span>
      {status && (
        <span
          role={statusLabel ? "img" : undefined}
          aria-label={statusLabel}
          aria-hidden={statusLabel ? undefined : "true"}
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-surface-container-low",
            STATUS_SIZES[statusSize],
            STATUS_TONES[status] ?? STATUS_TONES.tertiary
          )}
        />
      )}
    </span>
  );
}

export default Avatar;
