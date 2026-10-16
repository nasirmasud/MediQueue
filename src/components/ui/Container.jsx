import { cn } from "./cn";

export function Container({
  as: Component = "div",
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-6 lg:px-12", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Container;
