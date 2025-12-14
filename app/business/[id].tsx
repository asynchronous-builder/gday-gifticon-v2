import React from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Star, Clock, Globe, Phone, Share2, Heart } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { businesses, categories } from '@/constants/data';
import { cn } from '@/lib/utils';

const { width } = Dimensions.get('window');

// Helper to get accent color class
const getAccentClass = (accentColor: string) => {
    switch (accentColor) {
        case 'secondary': return 'bg-secondary';
        case 'tertiary': return 'bg-tertiary';
        case 'quaternary': return 'bg-quaternary';
        default: return 'bg-primary';
    }
};

const getShadowClass = (accentColor: string) => {
    switch (accentColor) {
        case 'secondary': return 'shadow-card-pink';
        case 'tertiary': return 'shadow-card-yellow';
        case 'quaternary': return 'shadow-card-mint';
        default: return 'shadow-card';
    }
};

export default function BusinessDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const business = businesses.find(b => b.id === Number(id)) || businesses[0];
    const category = categories.find(c => c.name === business.category);

    return (
        <View className="flex-1 bg-background">
            <Stack.Screen options={{ headerShown: false }} />
            
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                {/* Hero Image Section */}
                <View className="relative">
                    <ImageWithFallback 
                        source={{ uri: business.image }} 
                        className="w-full h-72 bg-muted"
                        resizeMode="cover"
                    />
                    
                    {/* Header Actions */}
                    <View className="absolute top-0 left-0 right-0 p-4 pt-12 flex-row justify-between items-center z-10">
                        <Button 
                            icon={ArrowLeft} 
                            size="icon" 
                            variant="outline" 
                            className="bg-background/90 backdrop-blur-sm h-10 w-10 border-border"
                            onPress={() => router.back()}
                        />
                        <View className="flex-row gap-2">
                            <Button 
                                icon={Share2} 
                                size="icon" 
                                variant="outline" 
                                className="bg-background/90 backdrop-blur-sm h-10 w-10 border-border"
                            />
                            <Button 
                                icon={Heart} 
                                size="icon" 
                                variant="outline" 
                                className="bg-background/90 backdrop-blur-sm h-10 w-10 border-border"
                            />
                        </View>
                    </View>

                    {/* Category Badge */}
                    <View className={cn("absolute -bottom-6 right-6 px-4 py-2 rounded-full border-chunky border-foreground shadow-hard flex-row items-center gap-2", getAccentClass(business.accentColor))}>
                        <Text className="text-xl">{category?.emoji}</Text>
                        <Text className="font-bold font-heading text-lg text-foreground">{business.category}</Text>
                    </View>
                </View>

                {/* Content Section */}
                <View className="px-4 pt-10 pb-6 space-y-6">
                    {/* Header Info */}
                    <View>
                        <Text className="text-3xl font-heading font-extrabold text-foreground leading-tight mb-2">
                            {business.name}
                        </Text>
                        <View className="flex-row items-center gap-4 flex-wrap">
                            <View className="flex-row items-center gap-1">
                                <Star size={18} color="#fbbf24" fill="#fbbf24" />
                                <Text className="font-bold text-base">{business.rating}</Text>
                                <Text className="text-muted-foreground text-sm">(120+ reviews)</Text>
                            </View>
                            <View className="flex-row items-center gap-1">
                                <MapPin size={16} color="#64748b" />
                                <Text className="text-muted-foreground font-medium">{business.distance}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Description */}
                    <Card className={cn("p-0 overflow-hidden", getShadowClass(business.accentColor))}>
                        <CardContent className="p-5">
                            <Text className="text-base text-foreground font-body leading-relaxed">
                                {business.description}. Experience the best local atmosphere with our curated selection of premium products and services. Perfect for gifts or treating yourself!
                            </Text>
                        </CardContent>
                    </Card>

                    {/* Quick Info */}
                    <View className="flex-row gap-4">
                        <View className="flex-1 bg-muted p-3 rounded-2xl border-chunky border-border items-center">
                            <Clock size={20} color="#64748b" className="mb-1" />
                            <Text className="text-xs font-bold text-muted-foreground uppercase">Open Now</Text>
                            <Text className="font-bold text-foreground">Until 9pm</Text>
                        </View>
                        <View className="flex-1 bg-muted p-3 rounded-2xl border-chunky border-border items-center">
                            <Globe size={20} color="#64748b" className="mb-1" />
                            <Text className="text-xs font-bold text-muted-foreground uppercase">Website</Text>
                            <Text className="font-bold text-foreground">Visit</Text>
                        </View>
                        <View className="flex-1 bg-muted p-3 rounded-2xl border-chunky border-border items-center">
                            <Phone size={20} color="#64748b" className="mb-1" />
                            <Text className="text-xs font-bold text-muted-foreground uppercase">Call</Text>
                            <Text className="font-bold text-foreground">Contact</Text>
                        </View>
                    </View>

                    {/* Available Amounts */}
                    <View>
                        <Text className="text-lg font-heading font-bold mb-3">Popular Gift Amounts</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3 overflow-visible pb-2 pl-1">
                            {business.availableAmounts.map((amt) => (
                                <Pressable 
                                    key={amt} 
                                    onPress={() => router.push({
                                        pathname: "/purchase-modal",
                                        params: { businessId: business.id, initialAmount: amt }
                                    })}
                                    className="bg-muted px-4 py-2 rounded-full border-chunky border-border transition-all hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-sm active:translate-y-[1px] active:translate-x-[1px]"
                                >
                                    <Text className="font-bold font-body">${amt}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Bottom Bar */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t-chunky border-foreground z-20">
                <View className="flex-row gap-4 items-center">
                    <View>
                        <Text className="text-xs text-muted-foreground font-bold uppercase">Starting from</Text>
                        <Text className="text-2xl font-heading font-extrabold text-foreground">${business.availableAmounts[0]}</Text>
                    </View>
                    <Button 
                        label="Send as Gift" 
                        variant="default"
                        className="flex-1 shadow-hard"
                        onPress={() => (router.push as any)({
                            pathname: "/purchase-modal",
                            params: { businessId: business.id }
                        })}
                    />
                </View>
            </View>
        </View>
    );
}
