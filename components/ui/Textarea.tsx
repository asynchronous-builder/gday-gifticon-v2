import * as React from "react";
import { TextInput, TextInputProps } from "react-native";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef<TextInput, TextInputProps>(
  ({ className, placeholderTextColor, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <TextInput
        ref={ref}
        multiline
        textAlignVertical="top"
        className={cn(
          "min-h-[80px] w-full rounded-lg border-chunky border-border bg-white px-3 py-2 text-base text-foreground disabled:cursor-not-allowed disabled:opacity-50",
          isFocused ? "border-primary shadow-hard" : "", 
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
Textarea.displayName = "Textarea";

export { Textarea };
