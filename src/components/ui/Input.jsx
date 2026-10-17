import { cn } from "./cn";

const BASE =
  "w-full text-on-surface placeholder:text-outline focus:outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const SIZES = {
  sm: "py-2.5 rounded-lg text-body-sm",
  md: "py-2.5 rounded-xl text-body-sm",
};

const PADDING = {
  sm: { icon: "pl-9 pr-3.5", plain: "px-3.5" },
  md: { icon: "pl-10 pr-4", plain: "px-4" },
};

export function Input({
  variant = "filled",
  size = "md",
  leadingIcon,
  className,
  ...props
}) {
  const isBare = variant === "bare";

  const control = (
    <input
      className={cn(
        BASE,
        isBare
          ? "py-2 px-1 text-body-md bg-transparent"
          : [SIZES[size], "bg-surface-container focus:bg-surface-container-high", PADDING[size][leadingIcon ? "icon" : "plain"]],
        className
      )}
      {...props}
    />
  );

  if (isBare || !leadingIcon) return control;

  return (
    <div className='relative'>
      <span className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-outline [&>svg]:size-5'>
        {leadingIcon}
      </span>
      {control}
    </div>
  );
}

export default Input;
