import { cn } from "./cn";

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-label-md transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60";

const SIZES = {
  sm: "px-3.5 py-1.5",
  md: "px-4 py-2",
};

const VARIANTS = {
  filled:
    "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
  ghost: "text-on-surface-variant hover:text-on-surface",
  quiet:
    "bg-surface-container-high/70 text-white border border-white/10 hover:bg-surface-container-highest",
};

const SELECTED = "bg-primary-container text-white shadow-sm";

export function Chip({
  as: Component = "button",
  size = "md",
  variant = "filled",
  selected,
  type,
  className,
  children,
  ...props
}) {
  const isButton = Component === "button";
  const active = selected === true;

  return (
    <Component
      type={isButton ? type ?? "button" : undefined}
      {...(isButton && selected !== undefined ? { "aria-pressed": active } : {})}
      className={cn(
        BASE,
        SIZES[size],
        active ? SELECTED : VARIANTS[variant] ?? VARIANTS.filled,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Chip;
