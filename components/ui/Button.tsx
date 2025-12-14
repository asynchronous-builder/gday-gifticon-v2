import * as React from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LucideIcon } from "lucide-react-native";

const buttonContainerVariants = cva(
  "flex-row items-center justify-center gap-2 rounded-full border-chunky border-foreground transition-all active:translate-x-[2px] active:translate-y-[2px]",
  {
    variants: {
      variant: {
        default: "bg-primary shadow-hard hover:shadow-hard-hover active:shadow-hard-active hover:-translate-y-[1px] hover:-translate-x-[1px]",
        secondary: "bg-transparent hover:bg-tertiary border-transparent hover:border-foreground", 
        pink: "bg-secondary shadow-hard hover:shadow-hard-hover active:shadow-hard-active hover:-translate-y-[1px] hover:-translate-x-[1px]",
        yellow: "bg-tertiary shadow-hard hover:shadow-hard-hover active:shadow-hard-active hover:-translate-y-[1px] hover:-translate-x-[1px]",
        mint: "bg-quaternary shadow-hard hover:shadow-hard-hover active:shadow-hard-active hover:-translate-y-[1px] hover:-translate-x-[1px]",
        destructive: "bg-destructive shadow-hard hover:shadow-hard-hover active:shadow-hard-active hover:-translate-y-[1px] hover:-translate-x-[1px]",
        outline: "bg-background border-border hover:bg-muted",
        ghost: "border-0 shadow-none hover:bg-muted/50",
        link: "border-0 shadow-none hover:underline",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4",
        lg: "h-14 px-8",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva("font-bold font-body text-base", {
  variants: {
    variant: {
      default: "text-white",
      secondary: "text-foreground",
      pink: "text-foreground",
      yellow: "text-foreground",
      mint: "text-foreground",
      destructive: "text-white",
      outline: "text-foreground",
      ghost: "text-foreground",
      link: "text-primary underline",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends Omit<PressableProps, "style">,
    VariantProps<typeof buttonContainerVariants> {
  label?: string;
  icon?: LucideIcon;
  className?: string;
}

export function Button({
  className,
  variant,
  size,
  label,
  icon: Icon,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(buttonContainerVariants({ variant, size, className }))}
      style={({ pressed }) => pressed && { transform: [{ translateX: 2 }, { translateY: 2 }] }} // Fallback for native active state
      {...props}
    >
      {Icon && (
        <Icon
          size={size === "sm" ? 18 : 24}
          // Dynamic color selection could be improved here, simplified for now
          color={variant === "default" || variant === "destructive" ? "#fff" : "#1e293b"}
        />
      )}
      {label && (
        <Text className={cn(buttonTextVariants({ variant, size }))}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
