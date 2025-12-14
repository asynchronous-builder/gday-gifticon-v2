import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Sparkles, Mail } from 'lucide-react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Using FA5 for brand icons

export default function OnboardingScreen() {
    const router = useRouter();

    const handleContinue = () => {
        // For now, simple continue goes to Home
        router.replace('/(tabs)');
    };

    const handleEmailSignUp = () => {
        (router.push as any)('/onboarding/sign-up');
    };

    return (
        <SafeAreaView className="flex-1 bg-background relative overflow-hidden">
            <Stack.Screen options={{ headerShown: false }} />
            
            {/* Decorative Background Elements (Simulated with absolute views) */}
            <View className="absolute -top-20 -right-20 w-80 h-80 bg-tertiary/20 rounded-full blur-3xl opacity-50" />
            <View className="absolute top-1/3 -left-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-50" />
            
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40, paddingHorizontal: 24 }}
                showsVerticalScrollIndicator={false}
                className="flex-1"
            >
                {/* Logo Section */}
                <View className="mb-8 items-center relative">
                    <View className="absolute -top-6 -left-6 w-32 h-32 bg-tertiary rounded-full -z-10" />
                    
                    <View className="w-24 h-24 bg-primary rounded-3xl border-chunky border-foreground shadow-hard items-center justify-center mb-4 relative">
                        <Text className="text-5xl">🎁</Text>
                         <View className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full border-chunky border-foreground" />
                    </View>

                    <Text className="text-4xl font-heading font-extrabold text-foreground mb-1">G'day Gift</Text>
                    <View className="h-1.5 w-20 bg-quaternary rounded-full" />
                </View>

                {/* Tagline */}
                <View className="items-center mb-12 max-w-xs">
                    <Text className="text-2xl font-heading font-bold text-foreground text-center mb-3">
                        Send, Receive, and Redeem{' '}
                        <Text className="text-secondary underline decoration-wavy">Gifticons</Text>
                    </Text>
                    <Text className="text-muted-foreground text-center text-base leading-6">
                        Discover local cafés, restaurants, and shops. Send thoughtful gifts to friends and family across Australia.
                    </Text>
                </View>

                {/* Buttons */}
                <View className="w-full gap-4">
                    <Button 
                        onPress={handleContinue}
                        className="w-full bg-white border-border"
                        variant="outline"
                        label="Continue with Google"
                        // icon={() => <FontAwesome5 name="google" size={18} color="#1e293b" />} 
                        // Note: Using text or generic icon if FA5 fails, relying on Button's icon prop which expects Lucide
                    />
                     <Button 
                        onPress={handleContinue}
                        className="w-full"
                        variant="pink"
                        label="Continue with Instagram"
                    />
                     <Button 
                        onPress={handleContinue}
                        className="w-full"
                        variant="mint"
                        label="Continue with TikTok"
                    />
                    <Button 
                        onPress={handleEmailSignUp}
                        className="w-full"
                        variant="secondary"
                        label="Sign up with Email"
                        icon={Mail}
                    />
                </View>

                <Text className="text-center text-xs text-muted-foreground mt-6 px-8">
                    By continuing, you agree to our <Text className="font-bold text-primary">Terms of Service</Text> and <Text className="font-bold text-primary">Privacy Policy</Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
