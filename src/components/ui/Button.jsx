import { cn } from "./cn";

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS = {
  primary: "bg-primary-container text-white hover:bg-primary-container/90",
  secondary:
    "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
  outline:
    "border border-outline bg-transparent text-on-surface hover:bg-surface-container-high",
  ghost: "bg-transparent text-on-surface hover:bg-surface-container-high",
  danger: "bg-error text-on-error hover:bg-error/90",
};

const SIZES = {
  sm: "px-4 py-2 text-label-md",
  md: "px-5 py-2.5 text-label-md",
  lg: "px-7 py-3.5 text-label-lg duration-200",
  xl: "px-8 py-4 text-label-lg duration-200 hover:-translate-y-0.5",
};

const SHAPES = {
  rect: "rounded-xl",
  pill: "rounded-full",
};

const SHADOW = {
  primary: { sm: "shadow-sm", md: "shadow-sm", lg: "shadow-xl", xl: "shadow-2xl" },
  danger: { sm: "shadow-sm", md: "shadow-sm", lg: "shadow-xl", xl: "shadow-2xl" },
};

const TINT = {
  primary: { lg: "shadow-primary-container/30", xl: "shadow-primary-container/40" },
};

export function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  shape = "rect",
  block = false,
  type,
  className,
  children,
  ...props
}) {
  const isButton = Component === "button";

  return (
    <Component
      type={isButton ? type ?? "button" : undefined}
      className={cn(
        BASE,
        SIZES[size],
        VARIANTS[variant],
        SHAPES[shape],
        block && "w-full",
        SHADOW[variant]?.[size] ?? "shadow-none",
        TINT[variant]?.[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
