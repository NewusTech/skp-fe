"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Eye, EyeOff } from "lucide-react";

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, asChild = false, type, icon, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="relative">
        {icon && !disabled && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <Comp
          type={inputType}
          className={cn(
            "flex w-full rounded-[20px] border secondary bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[hsla(0,8%,71%,1)] text-[#473D3D]",
            icon && !disabled && "pl-10",
            type === "password" && !disabled && "pr-10",
            disabled ? "border-none bg-transparent p-0" : "h-10",
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {type === "password" && !disabled && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
