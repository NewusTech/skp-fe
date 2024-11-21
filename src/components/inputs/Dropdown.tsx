"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { ChevronDown } from "lucide-react";

export interface DropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  asChild?: boolean;
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
}

const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ className, asChild = false, icon, disabled, options, ...props }, ref) => {
    const Comp = asChild ? Slot : "select";

    return (
      <div className="relative">
        {icon && !disabled && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <Comp
          className={cn(
            "flex w-full rounded-[20px] border secondary bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[hsla(0,8%,71%,1)] text-[#473D3D] appearance-none",
            icon && !disabled && "pl-10",
            disabled ? "border-none bg-transparent p-0" : "h-10",
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Comp>
        {!disabled && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
