import { cn } from "./cn";

const BASE = "inline-block animate-spin rounded-full border-outline-variant";

const SIZES = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-8 border-[3px]",
};

const TONES = {
  primary: "border-t-primary",
  tertiary: "border-t-tertiary",
  current: "border-t-current",
};

export function Spinner({
  size = "md",
  tone = "primary",
  label = "Loading",
  className,
  ...props
}) {
  return (
    <span
      role='status'
      aria-label={label}
      className={cn(BASE, SIZES[size], TONES[tone] ?? TONES.primary, className)}
      {...props}
    />
  );
}

export default Spinner;
