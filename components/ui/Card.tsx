import * as React from "react";
import { View, Text, ViewProps, TextProps } from "react-native";
import { cn } from "../../lib/utils";

function Card({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn(
        "bg-card rounded-xl border-chunky border-foreground shadow-card p-4",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ViewProps) {
  return <View className={cn("flex flex-col space-y-1.5 p-2", className)} {...props} />;
}

function CardTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        "text-2xl font-heading font-bold leading-none tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn("text-sm text-muted-foreground font-body", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ViewProps) {
  return <View className={cn("p-2 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn("flex flex-row items-center p-2 pt-0", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
