import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Maximize, Share2, ArrowUpRight } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockGifticons } from '@/constants/data';
import { cn } from '@/lib/utils';
import * as Brightness from 'expo-brightness'; // Would need install, simulating for now

const { width } = Dimensions.get('window');

export default function RedemptionScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const gifticon = mockGifticons.received.find(g => g.id === Number(id)) || mockGifticons.received[0];
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

    // Simulate timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <Stack.Screen options={{ headerShown: false }} />
            
            {/* Header */}
            <View className="px-4 py-4 flex-row justify-between items-center z-10">
                 <Button 
                    icon={ArrowLeft} 
                    size="icon" 
                    variant="ghost" 
                    className="bg-white/20 h-10 w-10 border-0"
                    onPress={() => router.back()}
                />
                <View className="flex-row items-center">
                    <Text className="text-white font-heading font-bold text-lg">Redeem</Text>
                    <Button 
                        icon={ArrowUpRight} 
                        size="icon" 
                        variant="ghost" 
                        className="bg-white/20 h-10 w-10 border-0"
                        onPress={() => (router.push as any)('/send-gift')}
                    />
                </View>
                <Button 
                    icon={Share2} 
                    size="icon" 
                    variant="ghost" 
                    className="bg-white/20 h-10 w-10 border-0"
                />
            </View>

            <View className="flex-1 px-6 justify-center pb-20">
                <Card className="shadow-2xl border-0 overflow-hidden rounded-3xl">
                    {/* Top Ticket Part */}
                    <View className="bg-background p-6 items-center border-b-2 border-dashed border-muted-foreground/30 relative">
                        {/* Cutout circles */}
                        <View className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-primary" />
                        <View className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-primary" />

                        <View className="w-16 h-16 rounded-full bg-tertiary border-chunky border-foreground items-center justify-center mb-4 shadow-hard">
                            <Text className="text-3xl">{gifticon.emoji}</Text>
                        </View>
                        <Text className="text-2xl font-heading font-bold text-foreground text-center mb-1">
                            {gifticon.businessName}
                        </Text>
                        <Text className="text-lg font-medium text-primary text-center mb-4">
                            {gifticon.product}
                        </Text>
                        <Badge variant="quaternary" label={`$${gifticon.amount}.00 Credit`} className="px-4 py-1" />
                    </View>
                    
                    {/* Bottom QR Part */}
                    <View className="bg-background p-8 items-center justify-center padding-b-10">
                        <View className="p-4 bg-white rounded-2xl border-chunky border-border shadow-inner mb-6">
                            <QRCode
                                value={gifticon.qrCode || "GIFT-123456"}
                                size={200}
                                color="#1e293b"
                                backgroundColor="white"
                            />
                        </View>
                        
                        <Text className="font-mono font-bold text-2xl tracking-widest text-foreground mb-2">
                            {gifticon.qrCode}
                        </Text>
                         <Text className="text-xs text-muted-foreground font-bold uppercase mb-4">
                            Show to staff to redeem
                        </Text>

                        {/* Timer */}
                        <View className="flex-row items-center gap-2 bg-destructive/10 px-4 py-2 rounded-full">
                            <Clock size={14} className="text-destructive" color="#ef4444" />
                            <Text className="text-destructive font-bold font-mono">
                                Valid for {formatTime(timeLeft)}
                            </Text>
                        </View>
                    </View>
                </Card>

                <Text className="text-white/80 text-center mt-8 text-sm font-medium">
                    Brightness increased for scanning
                </Text>
            </View>
        </SafeAreaView>
    );
}

// Simple clock icon locally if needed, or use lucide imports
import { Clock } from 'lucide-react-native';
