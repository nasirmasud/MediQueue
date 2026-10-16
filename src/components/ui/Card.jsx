import { cn } from "./cn";

const BASE = "rounded-2xl";

const TONES = {
  surface: "bg-surface-container-low",
  raised: "bg-surface-container",
  frosted: "bg-surface-container-low/90 border border-white/10 backdrop-blur-xl",
  frostedPrimary:
    "bg-surface-container-low/95 border border-primary/30 backdrop-blur-xl",
  highlight:
    "bg-gradient-to-b from-surface-container-high/90 to-surface-container-low/95 border-2 border-primary/50",
};

const SHADOWS = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

const PADDINGS = {
  none: "",
  sm: "p-5",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  as: Component = "div",
  tone = "surface",
  shadow = "sm",
  padding = "md",
  interactive = false,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        BASE,
        TONES[tone] ?? TONES.surface,
        SHADOWS[shadow] ?? SHADOWS.sm,
        PADDINGS[padding],
        interactive &&
          "cursor-pointer group transition-all hover:bg-surface-container",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;
