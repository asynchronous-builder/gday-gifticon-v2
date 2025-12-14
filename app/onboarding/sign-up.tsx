import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check, Eye, EyeOff } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/Label';

export default function SignUpScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSignUp = () => {
        setIsLoading(true);
        // Simulate API
        setTimeout(() => {
            setIsLoading(false);
            router.replace('/(tabs)');
        }, 1500);
    };

    return (
        <SafeAreaView className="flex-1 bg-background relative" edges={['top']}>
            <Stack.Screen options={{ headerShown: false }} />
            
            {/* Header */}
            <View className="px-4 py-4 flex-row items-center gap-4 z-10 border-b-chunky border-foreground bg-card">
                <Button icon={ArrowLeft} size="icon" variant="outline" onPress={() => router.back()} />
                <Text className="text-xl font-heading font-bold">Create Account</Text>
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView 
                    className="flex-1 px-4 py-6" 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                >
                     {/* Hero Icon */}
                    <View className="items-center mb-8">
                        <View className="w-16 h-16 bg-primary rounded-2xl border-chunky border-foreground shadow-hard items-center justify-center mb-2 relative">
                            <Text className="text-3xl">🎁</Text>
                            <View className="absolute -top-1 -right-1 w-4 h-4 bg-tertiary rounded-full border-chunky border-foreground" />
                        </View>
                        <Text className="text-muted-foreground text-center">Join G'day Gift and start sending thoughtful gifts</Text>
                    </View>

                    {/* Form Card */}
                    <Card className="shadow-card-pink mb-4">
                        <CardContent className="p-6 gap-6">
                            <View className="flex-row gap-4" key="names-row">
                                <View className="flex-1 gap-3" key="firstname-col">
                                    <Label key="firstname-label">First Name</Label>
                                    <Input 
                                        key="firstname-input"
                                        placeholder="Alex" 
                                        value={formData.firstName}
                                        onChangeText={(t) => setFormData({...formData, firstName: t})}
                                    />
                                </View>
                                <View className="flex-1 gap-3" key="lastname-col">
                                    <Label key="lastname-label">Last Name</Label>
                                    <Input 
                                        key="lastname-input"
                                        placeholder="Smith" 
                                        value={formData.lastName}
                                        onChangeText={(t) => setFormData({...formData, lastName: t})}
                                    />
                                </View>
                            </View>

                            <View className="gap-3" key="email-group">
                                <Label key="email-label">Email Address</Label>
                                <Input 
                                    key="email-input"
                                    placeholder="alex@example.com" 
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={formData.email}
                                    onChangeText={(t) => setFormData({...formData, email: t})}
                                />
                            </View>

                            <View className="gap-3" key="password-group">
                                <Label key="password-label">Password</Label>
                                <View className="relative" key="password-input-container">
                                    <Input 
                                        key="password-input"
                                        placeholder="Create a password" 
                                        secureTextEntry={!showPassword}
                                        value={formData.password}
                                        onChangeText={(t) => setFormData({...formData, password: t})}
                                        autoCorrect={false}
                                        spellCheck={false}
                                        textContentType="none"
                                        autoComplete="off"
                                    />
                                    <Pressable 
                                        key="password-toggle"
                                        onPress={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 hover:opacity-70 transition-opacity"
                                    >
                                        {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
                                    </Pressable>
                                </View>
                                <Text className="text-xs text-muted-foreground" key="password-hint">Must be at least 8 characters long</Text>
                            </View>

                            <View className="gap-3" key="confirm-group">
                                <Label key="confirm-label">Confirm Password</Label>
                                <Input 
                                    key="confirm-password-input"
                                    placeholder="Confirm password" 
                                    secureTextEntry={!showPassword}
                                    value={formData.confirmPassword}
                                    onChangeText={(t) => setFormData({...formData, confirmPassword: t})}
                                    autoCorrect={false}
                                    spellCheck={false}
                                    textContentType="none"
                                    autoComplete="off"
                                />
                            </View>
                        </CardContent>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Bar */}
            <View className="absolute bottom-0 left-0 right-0 bg-card border-t-chunky border-foreground p-4">
                 <Button 
                    label={isLoading ? "Creating Account..." : "Create Account"} 
                    onPress={handleSignUp}
                    disabled={isLoading}
                    className="w-full shadow-hard"
                />
            </View>
        </SafeAreaView>
    );
}
