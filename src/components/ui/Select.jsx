import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

const BASE =
  "w-full appearance-none bg-surface-container text-on-surface focus:outline-none focus:bg-surface-container-high transition-colors disabled:cursor-not-allowed disabled:opacity-60 has-[option[value='']:checked]:text-outline";

const SIZES = {
  sm: { box: "py-2.5 pl-3.5 pr-9 text-body-sm", icon: "right-3" },
  md: { box: "py-2.5 pl-4 pr-10 text-body-sm", icon: "right-3.5" },
};

const SHAPE_RADIUS = {
  rect: { sm: "rounded-lg", md: "rounded-xl" },
  pill: { sm: "rounded-full", md: "rounded-full" },
};

export function Select({
  size = "md",
  shape = "rect",
  placeholder,
  className,
  children,
  ...props
}) {
  return (
    <div className='relative'>
      <select
        className={cn(BASE, SIZES[size].box, SHAPE_RADIUS[shape][size], className)}
        {...props}
      >
        {placeholder !== undefined && <option value=''>{placeholder}</option>}
        {children}
      </select>
      <ChevronDown
        aria-hidden='true'
        className={cn(
          "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-outline",
          SIZES[size].icon
        )}
      />
    </div>
  );
}

export default Select;
