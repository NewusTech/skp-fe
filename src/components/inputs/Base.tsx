"use client";

import * as React from "react";
import type { TextFieldProps } from "./TextField";
import type { DropdownProps } from "./Dropdown";

const TextField = React.lazy(() =>
  import("./TextField").then((mod) => ({ default: mod.default }))
);
const Dropdown = React.lazy(() =>
  import("./Dropdown").then((mod) => ({ default: mod.default }))
);

export type BaseInputProps = TextFieldProps &
  DropdownProps & {
    type?: string;
  };

const BaseInput = React.forwardRef<
  HTMLInputElement | HTMLButtonElement,
  BaseInputProps
>((props, ref) => {
  const { type, options, ...rest } = props;

  if (type === "dropdown" && options) {
    return <Dropdown ref={ref as React.Ref<HTMLButtonElement>} {...props} />;
  }

  return <TextField ref={ref as React.Ref<HTMLInputElement>} {...props} />;
});

BaseInput.displayName = "BaseInput";

export default BaseInput;
