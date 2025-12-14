import React, { useState } from 'react';
import { Image, ImageProps, View } from 'react-native';
import { cn } from '@/lib/utils';
import { Image as ImageIcon } from 'lucide-react-native';

interface ImageWithFallbackProps extends ImageProps {
    fallbackSrc?: string;
    className?: string; // Add className prop explicitly
}

export function ImageWithFallback({ source, style, className, ...props }: ImageWithFallbackProps) {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <View className={cn("bg-muted items-center justify-center", className)} style={style}>
                <ImageIcon size={24} color="#94a3b8" />
            </View>
        );
    }

    return (
        <Image
            source={source}
            style={style}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    );
}
