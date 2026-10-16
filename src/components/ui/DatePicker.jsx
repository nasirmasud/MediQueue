import { Calendar } from "lucide-react";
import { cn } from "./cn";
import { Input } from "./Input";

export function DatePicker({ size = "md", leadingIcon, className, ...props }) {
  return (
    <Input
      type='date'
      size={size}
      leadingIcon={leadingIcon ?? <Calendar />}
      className={cn("tabular", className)}
      {...props}
    />
  );
}

export default DatePicker;
