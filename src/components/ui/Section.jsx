import { Container } from "./Container";
import { cn } from "./cn";

const TONES = {
  surface: "bg-surface",
  lowest: "bg-surface-container-lowest",
  low: "bg-surface-container-low",
};

const SPACING = {
  none: "",
  sm: "py-16",
  md: "py-24",
  lg: "py-28",
  xl: "py-32",
};

export function Section({
  as: Component = "section",
  id,
  tone = "surface",
  spacing = "lg",
  contained = true,
  className,
  containerClassName,
  children,
  ...props
}) {
  return (
    <Component
      id={id}
      className={cn(
        "w-full",
        TONES[tone] ?? TONES.surface,
        SPACING[spacing] ?? SPACING.lg,
        className
      )}
      {...props}
    >
      {contained ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </Component>
  );
}

export default Section;
