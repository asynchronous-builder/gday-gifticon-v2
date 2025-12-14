import * as React from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import { cn } from "../../lib/utils";

export interface InputProps extends TextInputProps {
  className?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, placeholderTextColor, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <TextInput
        ref={ref}
        className={cn(
          "h-12 w-full rounded-lg border-chunky border-border bg-white px-3 py-2 text-base font-body text-foreground disabled:cursor-not-allowed disabled:opacity-50",
          isFocused ? "border-primary shadow-hard" : "", // Focus state
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={placeholderTextColor || "#94a3b8"}
        selectionColor="#8b5cf6"
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
