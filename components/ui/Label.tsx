import * as React from "react";
import { Text, TextProps } from "react-native";
import { cn } from "../../lib/utils";

function Label({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        "text-sm font-medium leading-none text-foreground mb-2 font-body font-bold",
        className
      )}
      {...props}
    />
  );
}

export { Label };
