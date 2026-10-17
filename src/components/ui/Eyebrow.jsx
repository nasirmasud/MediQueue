import { cn } from "./cn";

const TONES = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  outline: "text-outline",
  tint: "text-surface-tint",
};

export function Eyebrow({
  as: Component = "span",
  tone = "primary",
  icon: Icon,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        "inline-flex items-center gap-1.5 text-label-sm uppercase tracking-wider",
        TONES[tone] ?? TONES.primary,
        className
      )}
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" className="h-3.5 w-3.5" /> : null}
      {children}
    </Component>
  );
}

export default Eyebrow;
