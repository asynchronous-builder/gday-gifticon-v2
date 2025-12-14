import React from 'react';
import { View, Text, ScrollView, FlatList, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, MapPin, Sparkles, ArrowRight, Star } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { categories, businesses } from '@/constants/data';
import { cn } from '@/lib/utils';

// Accessing accent colors for dynamic styling
const getShadowClass = (accentColor: string) => {
    switch (accentColor) {
        case 'secondary': return 'shadow-card-pink group-hover:shadow-card-pink-hover';
        case 'tertiary': return 'shadow-card-yellow group-hover:shadow-card-yellow-hover';
        case 'quaternary': return 'shadow-card-mint group-hover:shadow-card-mint-hover';
        default: return 'shadow-card group-hover:shadow-card-hover';
    }
};

const getBgClass = (accentColor: string) => {
    switch (accentColor) {
        case 'secondary': return 'bg-secondary';
        case 'tertiary': return 'bg-tertiary';
        case 'quaternary': return 'bg-quaternary';
        default: return 'bg-primary';
    }
}

export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            {/* Header Section */}
            <View className="px-4 py-4 space-y-4 border-b-chunky border-foreground bg-card z-10">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-3xl font-heading font-bold text-foreground">Good morning!</Text>
                        <View className="flex-row items-center gap-3 mt-1">
                            <View className="w-6 h-6 rounded-full bg-quaternary border-chunky border-foreground items-center justify-center">
                                <MapPin size={12} color="#1e293b" />
                            </View>
                            <Text className="text-sm font-body font-medium text-foreground">Sydney, NSW</Text>
                        </View>
                    </View>
                    {/* Logo/Avatar */}
                    <View className="relative">
                         <View className="w-12 h-12 bg-primary rounded-full border-chunky border-foreground shadow-hard items-center justify-center z-10">
                            <Text className="text-xl">🎁</Text>
                        </View>
                        <View className="absolute -top-1 -right-1 w-12 h-12 bg-tertiary rounded-full -z-10" />
                    </View>
                </View>

                {/* Search Bar */}
                <View className="relative justify-center">
                    <Input placeholder="Search cafes, restaurants..." className="pl-12" />
                    <View className="absolute left-3 w-8 h-8 bg-primary rounded-full border-chunky border-foreground items-center justify-center z-10">
                        <Search size={14} color="white" />
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                 {/* Categories Horizontal Scroll */}
                <View className="px-4 pt-6 pb-2">
                    <View className="flex-row items-center space-x-2 mb-4">
                        <Text className="text-xl font-heading font-bold text-foreground">Categories</Text>
                        <Sparkles size={20} color="#fbbf24" fill="#fbbf24" />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible pl-1 pb-2">
                        {categories.map((cat) => (
                            <Badge 
                                key={cat.id} 
                                variant={cat.variant} 
                                className="mr-2 flex-row space-x-2 px-4 py-2"
                            >
                                <Text className="text-base">{cat.emoji}</Text>
                                <Text className={cn("text-base font-bold", 
                                    (cat.variant as string) === 'default' || (cat.variant as string) === 'destructive' ? 'text-white' : 'text-foreground'
                                )}>
                                    {cat.name}
                                </Text>
                            </Badge>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Businesses List */}
                <View className="px-4 pt-2 pb-24">
                     <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-xl font-heading font-bold text-foreground">Near You</Text>
                        <Button variant="link" label="View all" size="sm" className="h-auto p-0" />
                    </View>

                    <View className="space-y-4">
                        {businesses.map((business) => (
                            <Pressable 
                                key={business.id} 
                                onPress={() => (router.push as any)({
                                    pathname: "/business/[id]",
                                    params: { id: business.id }
                                })}
                                className="group transition-all hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-y-[1px] active:translate-x-[1px]"
                            >
                                <Card className={cn("overflow-hidden p-0 transition-all", getShadowClass(business.accentColor))}>
                                     <CardContent className="p-0">
                                        <View className="flex-row p-4 gap-4">
                                            {/* Image */}
                                            <View className="relative">
                                                <Image 
                                                    source={{ uri: business.image }} 
                                                    className="w-20 h-20 rounded-2xl border-chunky border-foreground bg-muted"
                                                    resizeMode="cover"
                                                />
                                                <View className={cn("absolute -top-2 -right-2 w-7 h-7 rounded-full border-chunky border-foreground items-center justify-center", getBgClass(business.accentColor))}>
                                                     <Text className="text-xs">{categories.find(c => c.name === business.category)?.emoji}</Text>
                                                </View>
                                            </View>

                                            {/* Content */}
                                            <View className="flex-1 justify-between">
                                                <View className="flex-row justify-between items-start">
                                                    <Text className="text-lg font-heading font-bold text-foreground flex-1 mr-2" numberOfLines={1}>
                                                        {business.name}
                                                    </Text>
                                                    <View className="flex-row items-center bg-tertiary px-2 py-1 rounded-full border-chunky border-foreground">
                                                        <Star size={10} color="#1e293b" fill="#1e293b" />
                                                        <Text className="text-xs font-bold ml-1 text-foreground">{business.rating}</Text>
                                                    </View>
                                                </View>

                                                <Text className="text-sm text-muted-foreground font-body line-clamp-1" numberOfLines={1}>
                                                    {business.description}
                                                </Text>

                                                <View className="flex-row justify-between items-center mt-2">
                                                    <Text className="text-xs font-medium text-muted-foreground">{business.distance}</Text>
                                                    <View className="bg-background px-3 py-1 rounded-full border-chunky border-border">
                                                        <Text className="text-xs font-bold text-foreground">
                                                            from ${Math.min(...business.availableAmounts)}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </CardContent>
                                </Card>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
