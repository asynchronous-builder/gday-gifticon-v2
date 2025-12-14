import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, Gift, Filter, Clock, QrCode } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge, BadgeProps } from '@/components/ui/Badge';
import { mockGifticons } from '@/constants/data';
import { cn } from '@/lib/utils';
import { useRouter } from 'expo-router';

// Helper for status badges
const getStatusBadge = (status: string): { variant: BadgeProps['variant'], label: string } => {
    switch (status) {
        case "active": return { variant: "quaternary", label: "Active" };
        case "expiring_soon": return { variant: "tertiary", label: "Expires Soon" };
        case "expired": return { variant: "destructive", label: "Expired" };
        case "sent": return { variant: "default", label: "Delivered" };
        case "pending": return { variant: "secondary", label: "Pending" };
        default: return { variant: "outline", label: status };
    }
};

const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const cardShadows = ['shadow-card', 'shadow-card-pink', 'shadow-card-yellow', 'shadow-card-mint'];

export default function WalletScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'received' | 'purchased'>('received');

    const gifticons = mockGifticons[activeTab];

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="px-4 py-4 border-b-chunky border-foreground bg-card">
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="flex-row items-center gap-4">
                            <View className="w-12 h-12 rounded-full bg-secondary border-chunky border-foreground shadow-hard items-center justify-center">
                                <Sparkles size={24} color="white" />
                            </View>
                            <Text className="text-3xl font-heading font-bold text-foreground">My Wallet</Text>
                        </View>
                        <Button variant="outline" size="sm" label="Filter" icon={Filter} className="h-10 px-4" />
                    </View>

                    {/* Balance Card */}
                    <Card className="bg-primary border-foreground shadow-hard mb-2 pt-6 pb-6">
                        <View className="items-center">
                            <Text className="text-xs font-bold uppercase tracking-wide text-white opacity-90 mb-2">Total Balance</Text>
                            <Text className="text-5xl font-heading font-bold text-white mb-2">$165</Text>
                            <View className="flex-row items-center space-x-2 opacity-90">
                                <Gift size={16} color="white" />
                                <Text className="text-sm font-medium text-white">3 Active Gifticons</Text>
                            </View>
                        </View>
                        {/* Decorative circles */}
                        <View className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white opacity-10" />
                        <View className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white opacity-10" />
                    </Card>
                </View>

                {/* Tabs Toggle */}
                <View className="px-4 py-6">
                    <View className="flex-row bg-muted p-1 rounded-full border-foreground gap-1">
                        <Button 
                            onPress={() => setActiveTab('received')}
                            label="Received"
                            variant={activeTab === 'received' ? 'default' : 'ghost'}
                            className={cn(
                                "flex-1 h-10 rounded-full",
                                activeTab === 'received' ? "shadow-hard bg-primary text-white" : "shadow-none bg-transparent hover:bg-transparent"
                            )}
                        />
                        <Button 
                            onPress={() => setActiveTab('purchased')}
                            label="Purchased"
                            variant={activeTab === 'purchased' ? 'pink' : 'ghost'}
                            className={cn(
                                "flex-1 h-10 rounded-full",
                                activeTab === 'purchased' ? "shadow-hard bg-secondary" : "shadow-none bg-transparent hover:bg-transparent"
                            )}
                        />
                    </View>
                </View>

                {/* List Container */}
                <View className="px-4 pb-32 gap-6">
                    {gifticons.length === 0 ? (
                        <View className="items-center py-12">
                            <View className="w-20 h-20 bg-muted rounded-3xl border-chunky border-foreground shadow-hard items-center justify-center mb-4">
                                <QrCode size={40} color="#94a3b8" />
                            </View>
                            <Text className="text-xl font-heading font-bold text-foreground mb-2">No Gifticons Yet</Text>
                            <Text className="text-muted-foreground text-center mb-6 px-8">
                                {activeTab === "received" 
                                    ? "You haven't received any gifticons yet"
                                    : "You haven't purchased any gifticons yet"
                                }
                            </Text>
                            <Button 
                                variant="yellow" 
                                label={activeTab === "received" ? "Share your profile" : "Buy your first Gifticon"} 
                                onPress={() => router.push('/send-gift')}
                            />
                        </View>
                    ) : (
                        gifticons.map((item: any, index: number) => {
                            const badge = getStatusBadge(item.status);
                            const daysUntil = item.expiryDate ? getDaysUntilExpiry(item.expiryDate) : 0;
                            const shadowClass = cardShadows[index % cardShadows.length];
                            
                            return (
                                <Pressable
                                    key={item.id}
                                    className="group transition-all hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1px] active:translate-x-[1px]"
                                >
                                    <Card className={cn("overflow-hidden p-0 transition-all", shadowClass, `group-hover:${shadowClass}-hover`)}>
                                        <CardContent className="p-6 relative gap-4">
                                            {/* Floating Emoji */}
                                            <View className={cn(
                                                "absolute -top-3 -right-3 w-12 h-12 rounded-full border-chunky border-foreground items-center justify-center shadow-hard z-10",
                                                activeTab === 'received' ? "bg-tertiary" : "bg-secondary"
                                            )}>
                                                <Text className="text-2xl">{item.emoji}</Text>
                                            </View>

                                            {/* Header Row */}
                                            <View className="flex-row justify-between items-start pr-8">
                                                <View className="flex-1 mr-2 gap-1">
                                                    <Text className="text-lg font-heading font-bold text-foreground">{item.businessName}</Text>
                                                    <Text className="text-sm text-primary font-bold">{item.product}</Text>
                                                    <Text className="text-xs text-muted-foreground">
                                                        {activeTab === 'received' ? `From: ${item.from}` : `To: ${item.recipient}`}
                                                    </Text>
                                                </View>
                                                <View className="items-end gap-1">
                                                    <Text className="text-2xl font-heading font-bold text-foreground">${item.amount}</Text>
                                                    <Badge variant={badge.variant} label={badge.label} />
                                                </View>
                                            </View>

                                            {/* Message Bubble */}
                                            {item.message && (
                                                <View className={cn(
                                                    "p-4 rounded-2xl border-chunky border-opacity-30",
                                                    activeTab === 'received' ? "bg-tertiary/20 border-tertiary" : "bg-secondary/20 border-secondary"
                                                )}>
                                                    <Text className="text-sm text-foreground font-body">{item.message}</Text>
                                                </View>
                                            )}

                                            {/* Footer Row */}
                                            <View className="flex-row items-center justify-between mt-2">
                                                <View className="flex-row items-center gap-3">
                                                    <View className="w-8 h-8 rounded-full bg-muted border-chunky border-border items-center justify-center">
                                                        <Clock size={14} color="#1e293b" />
                                                    </View>
                                                    <Text className="text-xs text-muted-foreground font-medium">
                                                        {activeTab === 'received' 
                                                            ? (daysUntil > 0 ? `Expires in ${daysUntil} days` : "Expired")
                                                            : `Purchased: ${new Date(item.purchaseDate).toLocaleDateString()}`
                                                        }
                                                    </Text>
                                                </View>

                                                {activeTab === 'received' && (
                                                    <Button 
                                                        size="sm" 
                                                        variant="mint" 
                                                        label="Redeem" 
                                                        icon={QrCode} 
                                                        className="h-10 px-4"
                                                        onPress={() => router.push(`/redeem/${item.id}`)}
                                                    />
                                                )}
                                            </View>
                                        </CardContent>
                                    </Card>
                                </Pressable>
                            );
                        })
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
