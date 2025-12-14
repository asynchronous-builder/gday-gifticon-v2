import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, MessageSquare, DollarSign, CheckCircle, Smartphone } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { authenticateUser } from '@/lib/auth';
import { scheduleNotification } from '@/lib/notifications';
import { businesses } from '@/constants/data';
import { cn } from '@/lib/utils';;

export default function PurchaseModal() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const businessId = Number(params.businessId);
    const business = businesses.find(b => b.id === businessId) || businesses[0]; // Fallback

    const [step, setStep] = useState(1);
    const [giftAmount, setGiftAmount] = useState<string>('');
    const [message, setMessage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleNext = async () => {
        if (step === 1 && !giftAmount) {
             Alert.alert("Missing Amount", "Please enter a gift amount.");
             return;
        }

        if (step < 3) {
            setStep(step + 1);
        } else {
            // Processing Payment
            setIsProcessing(true);
            
            // 1. Biometric Check
            const isAuthenticated = await authenticateUser();
            if (!isAuthenticated) {
                setIsProcessing(false);
                Alert.alert("Authentication Failed", "We couldn't verify your identity.");
                return;
            }

            // 2. Simulate API Call
            setTimeout(async () => {
                setIsProcessing(false);
                
                // 3. Notification
                await scheduleNotification(
                    "Gifticon Sent! 🎁", 
                    `You sent a $${giftAmount} gift to your friend.`
                );

                Alert.alert("Success!", "Your Gifticon has been sent.", [
                    { text: "View Wallet", onPress: () => router.dismiss() } // Ideally navigate to wallet
                ]);
            }, 1500);
        }
    };

    const renderProgress = () => (
        <View className="flex-row gap-2 mb-4">
            {[1, 2, 3].map((i) => (
                <View
                    key={i}
                    className={cn(
                        "flex-1 h-2 rounded-full border-chunky transition-all",
                        i <= step ? "bg-primary border-foreground" : "bg-muted border-border"
                    )}
                />
            ))}
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-background">
             {/* Header */}
            <View className="px-4 py-4 border-b-chunky border-foreground bg-card z-10">
                <View className="flex-row items-center gap-4 mb-4">
                    <Button 
                        icon={ArrowLeft} 
                        size="icon" 
                        variant="outline" 
                        onPress={() => step === 1 ? router.back() : setStep(step - 1)}
                        className="h-10 w-10"
                    />
                    <Text className="text-xl font-heading font-bold text-foreground">
                        {step === 1 ? "Gift Details" : step === 2 ? "Payment" : "Review Order"}
                    </Text>
                </View>
                {renderProgress()}
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 120 }}>
                    {step === 1 && (
                        <View className="space-y-6">
                            {/* Amount Card */}
                             <Card className="shadow-card-yellow pt-6 overflow-visible mt-2">
                                 <View className="absolute -top-3 -right-3 w-12 h-12 bg-tertiary rounded-full border-chunky border-foreground items-center justify-center shadow-hard z-10">
                                    <DollarSign size={24} color="#1e293b" />
                                </View>
                                <CardHeader>
                                    <CardTitle>Gift Amount</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Label>Enter Amount ($)</Label>
                                    <Input 
                                        keyboardType="numeric" 
                                        placeholder="50" 
                                        value={giftAmount} 
                                        onChangeText={setGiftAmount} 
                                        className="text-2xl font-bold font-heading h-16"
                                    />
                                    <View className="flex-row gap-2 mt-4 flex-wrap">
                                        {[25, 50, 100].map(amt => (
                                            <Pressable 
                                                key={amt} 
                                                onPress={() => setGiftAmount(amt.toString())}
                                                className="bg-muted px-4 py-2 rounded-full border-chunky border-border transition-all hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-sm active:translate-y-[1px] active:translate-x-[1px]"
                                            >
                                                <Text className="font-bold font-body">${amt}</Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                </CardContent>
                            </Card>
    
                            {/* Message Card */}
                            <Card className="shadow-card-pink pt-6 overflow-visible mt-4">
                                 <View className="absolute -top-3 -right-3 w-12 h-12 bg-secondary rounded-full border-chunky border-foreground items-center justify-center shadow-hard z-10">
                                    <MessageSquare size={24} color="white" />
                                </View>
                                <CardHeader>
                                    <CardTitle>Personal Message</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea 
                                        placeholder="Write a sweet note..." 
                                        value={message}
                                        onChangeText={setMessage}
                                    />
                                    <Text className="text-xs text-muted-foreground mt-2 text-right">{message.length}/200</Text>
                                </CardContent>
                            </Card>
                        </View>
                    )}
    
                    {step === 2 && (
                        <View className="space-y-6">
                             <Card className="shadow-card-mint pt-6">
                                <CardHeader>
                                    <CardTitle>Select Payment Method</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                                        {[
                                            { id: 'card', label: 'Credit Card', icon: CreditCard, color: 'bg-primary' },
                                            { id: 'apple', label: 'Apple Pay', icon: Smartphone, color: 'bg-foreground' },
                                        ].map(method => (
                                            <Pressable 
                                                key={method.id} 
                                                onPress={() => setPaymentMethod(method.id)}
                                                className="flex-row items-center space-x-3 p-4 rounded-xl border-chunky border-border bg-background transition-all hover:bg-muted hover:-translate-y-[1px] active:scale-[0.99]"
                                            >
                                                <RadioGroupItem value={method.id} />
                                                <View className={cn("w-10 h-10 rounded-full border-chunky border-foreground items-center justify-center", method.color)}>
                                                    <method.icon size={20} color={method.id === 'apple' ? 'white' : 'white'} />
                                                </View>
                                                <Text className="font-bold text-foreground text-base flex-1">{method.label}</Text>
                                            </Pressable>
                                        ))}
                                    </RadioGroup>
                                </CardContent>
                             </Card>
    
                             {paymentMethod === 'card' && (
                                 <Card className="shadow-card">
                                     <CardContent className="space-y-4 pt-6">
                                        <View>
                                            <Label>Card Number</Label>
                                            <Input placeholder="0000 0000 0000 0000" keyboardType="numeric" />
                                        </View>
                                        <View className="flex-row gap-4">
                                            <View className="flex-1">
                                                <Label>Expiry</Label>
                                                <Input placeholder="MM/YY" />
                                            </View>
                                            <View className="flex-1">
                                                <Label>CVV</Label>
                                                <Input placeholder="123" keyboardType="numeric" />
                                            </View>
                                        </View>
                                     </CardContent>
                                 </Card>
                             )}
                        </View>
                    )}
    
                    {step === 3 && (
                        <View className="space-y-6">
                            <Card className="shadow-card pt-6 overflow-visible mt-2">
                                 <View className="absolute -top-3 -right-3 w-12 h-12 bg-primary rounded-full border-chunky border-foreground items-center justify-center shadow-hard z-10">
                                    <CheckCircle size={24} color="white" />
                                </View>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <View className="flex-row gap-4">
                                        <View className="w-16 h-16 bg-muted rounded-xl border-chunky border-foreground" />
                                        <View>
                                            <Text className="font-heading font-bold text-lg text-foreground">{business.name}</Text>
                                            <Text className="text-muted-foreground">${giftAmount} Gift Card</Text>
                                        </View>
                                    </View>
    
                                    {message && (
                                         <View className="bg-tertiary/20 p-4 rounded-xl border-chunky border-tertiary/30">
                                            <Text className="text-xs font-bold uppercase text-muted-foreground mb-1">Message:</Text>
                                            <Text className="font-body text-foreground">{message}</Text>
                                        </View>
                                    )}
    
                                    <View className="border-t-chunky border-border pt-4 mt-2">
                                        <View className="flex-row justify-between mb-2">
                                            <Text className="text-muted-foreground">Subtotal</Text>
                                            <Text className="font-bold">${giftAmount}</Text>
                                        </View>
                                        <View className="flex-row justify-between mb-2">
                                            <Text className="text-muted-foreground">Fee</Text>
                                            <Text className="font-bold">$0.99</Text>
                                        </View>
                                         <View className="flex-row justify-between pt-2 border-t-chunky border-foreground">
                                            <Text className="text-xl font-heading font-bold">Total</Text>
                                            <Text className="text-xl font-heading font-bold text-primary">${(Number(giftAmount) + 0.99).toFixed(2)}</Text>
                                        </View>
                                    </View>
                                </CardContent>
                            </Card>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Footer */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t-chunky border-foreground">
                <Button 
                    label={isProcessing ? "Processing..." : step === 3 ? "Complete Purchase" : "Continue"} 
                    variant={step === 3 ? "mint" : "default"}
                    onPress={handleNext}
                    disabled={isProcessing}
                    className="w-full shadow-hard"
                />
            </View>
        </SafeAreaView>
    );
}
