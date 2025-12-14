import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { X, Clock, Gift } from 'lucide-react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const bannerVariants = cva(
  "flex-row items-center p-4 rounded-xl border-chunky border-foreground mb-3",
  {
    variants: {
      type: {
        expiry: "bg-white shadow-card-yellow",
        received: "bg-white shadow-card-mint",
        sent: "bg-white shadow-card-pink",
        default: "bg-white shadow-card",
      },
    },
    defaultVariants: {
      type: "default",
    },
  }
);

interface NotificationBannerProps extends VariantProps<typeof bannerVariants> {
    message: string;
    onDismiss: () => void;
    onAction?: () => void;
    actionLabel?: string;
    className?: string;
}

export function NotificationBanner({ 
    type, 
    message, 
    onDismiss, 
    onAction, 
    actionLabel = "View",
    className 
}: NotificationBannerProps) {
    
    const getIcon = () => {
        switch(type) {
            case 'expiry': 
                return (
                    <View className="w-10 h-10 rounded-full bg-tertiary border-chunky border-foreground items-center justify-center">
                        <Clock size={20} color="#1e293b" />
                    </View>
                );
            case 'received':
                return (
                    <View className="w-10 h-10 rounded-full bg-quaternary border-chunky border-foreground items-center justify-center">
                        <Gift size={20} color="#1e293b" />
                    </View>
                );
            case 'sent':
                return (
                    <View className="w-10 h-10 rounded-full bg-secondary border-chunky border-foreground items-center justify-center">
                        <Gift size={20} color="white" />
                    </View>
                );
            default:
                return (
                    <View className="w-10 h-10 rounded-full bg-primary border-chunky border-foreground items-center justify-center">
                        <Gift size={20} color="white" />
                    </View>
                );
        }
    };

    return (
        <View className={cn(bannerVariants({ type, className }))}>
            <View className="mr-3">
                {getIcon()}
            </View>
            
            <View className="flex-1 mr-2">
                <Text className="text-sm font-medium text-foreground leading-5">{message}</Text>
            </View>

            <View className="flex-row items-center gap-2">
                {onAction && (
                    <Pressable 
                    onPress={onAction}
                    className="bg-white/20 px-3 py-1 rounded-full mr-2 hover:bg-white/30 transition-colors"
                >
                    <Text className="text-white font-bold text-xs">View</Text>
                </Pressable>
            )}

            <Pressable 
                onPress={onDismiss}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
                <X size={16} color="white" />
            </Pressable>
            </View>
        </View>
    );
}
