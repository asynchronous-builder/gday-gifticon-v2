import * as React from "react";
import { View, Pressable, ViewProps } from "react-native";
import { Circle } from "lucide-react-native";
import { cn } from "../../lib/utils";

// Context to manage radio group state
const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
} | null>(null);

function RadioGroup({ className, value, onValueChange, children, ...props }: ViewProps & { value?: string, onValueChange?: (value: string) => void }) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <View className={cn("gap-2", className)} {...props}>
          {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

function RadioGroupItem({ value, className, ...props }: ViewProps & { value: string }) {
    const context = React.useContext(RadioGroupContext);
    const checked = context?.value === value;

    return (
        <Pressable
            onPress={() => context?.onValueChange?.(value)}
            className={cn(
                "h-6 w-6 rounded-full border-chunky border-primary items-center justify-center bg-card",
                checked ? "bg-primary" : "bg-transparent", // Fill when checked
                className
            )}
            {...props}
        >
            {checked && <View className="h-2.5 w-2.5 rounded-full bg-white" />}
        </Pressable>
    );
}

export { RadioGroup, RadioGroupItem };
