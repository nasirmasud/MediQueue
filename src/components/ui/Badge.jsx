import { cn } from "./cn";

const BASE = "inline-flex items-center gap-2 whitespace-nowrap text-label-sm";

const SHAPES = {
  pill: "rounded-full",
  tag: "rounded",
};

const SIZES = {
  sm: "px-3 py-1",
  xs: "px-2.5 py-1",
  "2xs": "px-2 py-0.5",
};

const TINT = {
  primary: "bg-primary-container/20 text-primary",
  secondary: "bg-secondary-container/20 text-secondary",
  tertiary: "bg-tertiary-container/20 text-tertiary",
  neutral: "bg-surface-container-high text-on-surface-variant",
  error: "bg-error-container/20 text-error",
};

const SOLID = {
  primary: "bg-primary-container text-white",
  secondary: "bg-secondary-container text-on-secondary-container",
  tertiary: "bg-surface-container-highest text-tertiary",
  neutral: "bg-surface-container text-on-surface-variant",
  error: "bg-error text-on-error",
};

const OUTLINE = {
  primary: "bg-primary/10 text-primary border border-primary/30",
  secondary: "bg-secondary/10 text-secondary border border-secondary/30",
  tertiary: "bg-tertiary/10 text-tertiary border border-tertiary/30",
  neutral: "text-on-surface-variant border border-outline-variant",
  error: "bg-error/10 text-error border border-error/30",
};

const LOOKS = {
  tint: TINT,
  solid: SOLID,
  outline: OUTLINE,
};

const FROSTED =
  "bg-surface-container-high/80 border border-primary/40 backdrop-blur-xl shadow-lg shadow-primary/10";

export function Badge({
  tone = "primary",
  variant = "tint",
  shape = "pill",
  size = "sm",
  mono = false,
  className,
  children,
  ...props
}) {
  const look =
    variant === "frosted"
      ? FROSTED
      : (LOOKS[variant] ?? TINT)[tone] ?? TINT.primary;

  return (
    <span
      className={cn(BASE, SHAPES[shape], SIZES[size], look, mono && "font-mono", className)}
      {...props}
    >
      {children}
    </span>
  );
}

const BEACON_SIZES = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
};

export function Beacon({ size = "md", className, ...props }) {
  return (
    <span
      className={cn("relative flex shrink-0", BEACON_SIZES[size], className)}
      {...props}
    >
      <span className='animate-beacon absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75' />
      <span className='relative inline-flex h-full w-full rounded-full bg-tertiary shadow-beacon' />
    </span>
  );
}

export default Badge;
