"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

export interface DropdownProps {
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  options?: { value: string; label: string }[];
  value?: string;
  onValueChange?: (value: string) => void;
}

const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    { className, icon, disabled, options, value, onValueChange, ...props },
    ref
  ) => {
    return (
      <Select.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <Select.Trigger
          ref={ref}
          className={cn(
            "flex w-full items-center justify-between rounded-[20px] border secondary bg-background px-3 py-2 text-sm ring-offset-background",
            icon && !disabled && "pl-10",
            disabled ? "border-none bg-transparent p-0" : "h-10",
            className
          )}
          {...props}
        >
          <div className="flex items-center">
            {icon && !disabled && <div className="mr-2">{icon}</div>}
            <Select.Value />
          </div>
          {!disabled && (
            <Select.Icon>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Select.Icon>
          )}
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
            <Select.Viewport className="p-1">
              {options?.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex items-center px-8 py-2 text-sm text-gray-700 cursor-default select-none hover:bg-gray-100"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
