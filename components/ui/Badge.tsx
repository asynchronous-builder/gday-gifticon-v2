import * as React from "react";
import { View, Text, type ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-chunky px-2.5 py-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary border-foreground",
        secondary: "bg-secondary border-foreground",
        tertiary: "bg-tertiary border-foreground",
        quaternary: "bg-quaternary border-foreground",
        destructive: "bg-destructive border-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const badgeTextVariants = cva("text-xs font-bold font-body uppercase", {
  variants: {
    variant: {
      default: "text-white",
      secondary: "text-foreground",
      tertiary: "text-foreground",
      quaternary: "text-foreground",
      destructive: "text-white",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends ViewProps,
    VariantProps<typeof badgeVariants> {
    label?: string;
}

function Badge({ className, variant, label, children, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
        {label ? (
            <Text className={cn(badgeTextVariants({ variant }))}>{label}</Text>
        ) : children}
    </View>
  );
}

export { Badge, badgeVariants };
