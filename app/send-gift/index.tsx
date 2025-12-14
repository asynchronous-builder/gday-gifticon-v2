import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, MessageCircle, Send, Calendar, Clock } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { cn } from '@/lib/utils'; // Keep utils import if needed
const Circle = ({ className }: { className?: string }) => <View className={cn("rounded-full", className)} />;

export default function SendGiftScreen() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [recipientType, setRecipientType] = useState("contact");
    const [deliveryMethod, setDeliveryMethod] = useState("instant");
    const [message, setMessage] = useState("");

    const handleNext = () => {
        if (step < 2) {
            setStep(step + 1);
        } else {
            // Finish
            router.replace('/(tabs)');
        }
    };

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <View className="space-y-4">
                        <Card className="shadow-card-pink">
                             <View className="absolute -top-3 -right-3 w-12 h-12 bg-secondary rounded-full border-chunky border-foreground items-center justify-center shadow-hard z-10">
                                <Users size={24} color="white" />
                            </View>
                            <CardContent className="pt-6 pb-6">
                                <Text className="text-xl font-heading font-bold mb-4">Select Recipient</Text>
                                <RadioGroup value={recipientType} onValueChange={setRecipientType} className="space-y-3">
                                    <View className="flex-row items-center space-x-3 p-3 rounded-2xl border-chunky border-border bg-background transition-all hover:bg-muted hover:-translate-y-[1px]">
                                        <RadioGroupItem value="contact" id="contact" />
                                        <View className="w-10 h-10 rounded-full bg-primary border-chunky border-foreground items-center justify-center">
                                            <Users size={20} color="white" />
                                        </View>
                                        <Label className="flex-1 font-bold text-base">From Contacts</Label>
                                    </View>
                                    <View className="flex-row items-center space-x-3 p-3 rounded-2xl border-chunky border-border bg-background transition-all hover:bg-muted hover:-translate-y-[1px]">
                                        <RadioGroupItem value="manual" id="manual" />
                                        <View className="w-10 h-10 rounded-full bg-quaternary border-chunky border-foreground items-center justify-center">
                                            <MessageCircle size={20} color="#1e293b" />
                                        </View>
                                        <Label className="flex-1 font-bold text-base">Enter Manually</Label>
                                    </View>
                                </RadioGroup>

                                {recipientType === 'manual' && (
                                    <View className="mt-4 space-y-3" key="manual-fields-container">
                                        <View className="space-y-2" key="recipient-name-group">
                                            <Label key="recipient-name-label">Recipient Name</Label>
                                            <Input key="recipient-name-input" placeholder="Enter Name" />
                                        </View>
                                        <View className="space-y-2" key="contact-group">
                                            <Label key="contact-label">Phone or Email</Label>
                                            <Input key="contact-input" placeholder="Enter phone or email" />
                                        </View>
                                    </View>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="shadow-card-yellow">
                            <View className="absolute -top-3 -right-3 w-12 h-12 bg-tertiary rounded-full border-chunky border-foreground items-center justify-center shadow-hard z-10">
                                <MessageCircle size={24} color="#1e293b" />
                            </View>
                            <CardContent className="pt-6 pb-6">
                                <Text className="text-xl font-heading font-bold mb-4">Message</Text>
                                <Textarea 
                                    placeholder="Add a personal message..."
                                    value={message}
                                    onChangeText={setMessage}
                                    className="h-32"
                                />
                            </CardContent>
                        </Card>
                    </View>
                );
            case 2:
                return (
                    <View className="space-y-4">
                        <Card className="shadow-card-mint">
                             <View className="absolute -top-3 -right-3 w-12 h-12 bg-quaternary rounded-full border-chunky border-foreground items-center justify-center shadow-hard z-10">
                                <Send size={24} color="#1e293b" />
                            </View>
                            <CardContent className="pt-6 pb-6">
                                <Text className="text-xl font-heading font-bold mb-4">Delivery Options</Text>
                                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-3">
                                     <View className="flex-row items-start space-x-3 p-3 rounded-2xl border-chunky border-border bg-background transition-all hover:bg-muted hover:-translate-y-[1px]">
                                        <RadioGroupItem value="instant" id="instant" className="mt-1" />
                                        <View className="w-10 h-10 rounded-full bg-primary border-chunky border-foreground items-center justify-center">
                                            <Send size={20} color="white" />
                                        </View>
                                        <View className="flex-1">
                                            <Label className="font-bold text-base">Send Now</Label>
                                            <Text className="text-xs text-muted-foreground">Deliver immediately via app</Text>
                                        </View>
                                    </View>
                                     <View className="flex-row items-start space-x-3 p-3 rounded-2xl border-chunky border-border bg-background transition-all hover:bg-muted hover:-translate-y-[1px]">
                                        <RadioGroupItem value="sms" id="sms" className="mt-1" />
                                        <View className="w-10 h-10 rounded-full bg-secondary border-chunky border-foreground items-center justify-center">
                                            <MessageCircle size={20} color="white" />
                                        </View>
                                        <View className="flex-1">
                                            <Label className="font-bold text-base">Send via SMS</Label>
                                            <Text className="text-xs text-muted-foreground">Send as text message</Text>
                                        </View>
                                    </View>
                                     <View className="flex-row items-start space-x-3 p-3 rounded-2xl border-chunky border-border bg-background transition-all hover:bg-muted hover:-translate-y-[1px]">
                                        <RadioGroupItem value="scheduled" id="scheduled" className="mt-1" />
                                        <View className="w-10 h-10 rounded-full bg-tertiary border-chunky border-foreground items-center justify-center">
                                            <Calendar size={20} color="#1e293b" />
                                        </View>
                                        <View className="flex-1">
                                            <Label className="font-bold text-base">Schedule</Label>
                                            <Text className="text-xs text-muted-foreground">Choose when to deliver</Text>
                                        </View>
                                    </View>
                                </RadioGroup>
                            </CardContent>
                        </Card>

                        {/* Preview */}
                        <Card className="shadow-card">
                            <CardContent className="p-0">
                                <View className="bg-gradient-to-br from-primary/10 to-secondary/10 p-5">
                                    <View className="flex-row items-center gap-3 mb-4">
                                         <View className="w-12 h-12 bg-primary rounded-full border-chunky border-foreground items-center justify-center">
                                            <Text className="text-2xl">🎁</Text>
                                        </View>
                                        <View>
                                            <Text className="text-sm font-bold">Gifticon Received!</Text>
                                            <Text className="text-xs text-muted-foreground">From: You</Text>
                                        </View>
                                    </View>
                                    {message.length > 0 && (
                                        <View className="bg-white/80 p-3 rounded-xl mb-3 border-chunky border-border">
                                            <Text className="text-sm">{message}</Text>
                                        </View>
                                    )}
                                    <Text className="text-center font-heading font-bold text-xl">$50 Gift Card</Text>
                                </View>
                            </CardContent>
                        </Card>
                    </View>
                );
            default: return null;
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-background relative" edges={['top']}>
            <Stack.Screen options={{ headerShown: false }} />
            
            {/* Header */}
            <View className="px-4 py-4 border-b-chunky border-foreground bg-card z-10">
                <View className="flex-row items-center gap-4 mb-4">
                    <Button 
                        icon={ArrowLeft} 
                        size="icon" 
                        variant="outline" 
                        onPress={() => step === 1 ? router.back() : setStep(step - 1)} 
                    />
                    <Text className="text-xl font-heading font-bold">Send Gifticon</Text>
                </View>
                {/* Progress */}
                <View className="flex-row gap-2">
                    {[1, 2].map(i => (
                         <View 
                            key={i} 
                            className={cn(
                                "flex-1 h-2 rounded-full border-chunky",
                                i <= step ? "bg-secondary border-foreground" : "bg-muted border-border"
                            )} 
                        />
                    ))}
                </View>
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView className="flex-1 px-4 py-6 text-foreground" showsVerticalScrollIndicator={false}>
                    {renderStep()}
                </ScrollView>

                {/* Sticky Bottom */}
                <View className="p-4 bg-card border-t-chunky border-foreground">
                    <Button 
                        label={step === 2 ? "Send Gifticon" : "Continue"}
                        onPress={handleNext}
                        variant={step === 2 ? "mint" : "default"}
                        className="w-full shadow-hard"
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
