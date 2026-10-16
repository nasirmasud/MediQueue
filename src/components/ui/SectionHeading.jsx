import { Eyebrow } from "./Eyebrow";
import { cn } from "./cn";

export function SectionHeading({
  eyebrow,
  eyebrowTone = "primary",
  title,
  as: Heading = "h2",
  subtitle,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  children,
  ...props
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        centered ? "mx-auto max-w-3xl text-center" : "text-left",
        className
      )}
      {...props}
    >
      {eyebrow ? <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow> : null}
      {title ? (
        <Heading
          className={cn(
            "text-headline-lg text-on-surface sm:text-display-lg",
            eyebrow && "mt-3",
            titleClassName
          )}
        >
          {title}
        </Heading>
      ) : null}
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-body-lg text-on-surface-variant",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  );
}

export default SectionHeading;
