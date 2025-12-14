import React from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings as SettingsIcon, CreditCard, User, ChevronRight, Bell, Shield, HelpCircle, LogOut } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { cn } from '@/lib/utils'; // Keep this import for 'cn' usage

// Reusing Card component structures
const SettingRow = ({ icon: Icon, label, subLabel, color, hasSwitch = false, hasArrow = true, isDestructive = false }: any) => (
    <View className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center gap-4 flex-1">
            <View className={cn("w-10 h-10 rounded-full border-chunky border-foreground items-center justify-center", color)}>
                <Icon size={20} color={isDestructive ? 'white' : (color === 'bg-white' || color === 'bg-transparent' ? '#1e293b' : 'white')} />
            </View>
            <View className="flex-1">
                <Text className={cn("font-bold text-base", isDestructive ? "text-destructive" : "text-foreground")}>{label}</Text>
                {subLabel && <Text className="text-xs text-muted-foreground">{subLabel}</Text>}
            </View>
        </View>
        
        {hasSwitch && <Switch value={true} trackColor={{false: '#e2e8f0', true: '#8b5cf6'}} thumbColor={true ? '#fff' : '#f4f3f4'} />}
        {hasArrow && !hasSwitch && (
             <View className="w-8 h-8 rounded-full bg-muted items-center justify-center">
                <ChevronRight size={16} color="#1e293b" />
            </View>
        )}
    </View>
);

export default function SettingsScreen() {
    return (
         <SafeAreaView className="flex-1 bg-background" edges={['top']}>
             {/* Header */}
            <View className="px-4 py-4 border-b-chunky border-foreground bg-card mb-4">
                <View className="flex-row items-center gap-4">
                    <View className="w-12 h-12 rounded-full bg-quaternary border-chunky border-foreground shadow-hard items-center justify-center">
                        <SettingsIcon size={24} color="#1e293b" />
                    </View>
                    <Text className="text-3xl font-heading font-bold text-foreground">Settings</Text>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="px-4 pb-32 gap-6">
                    {/* Payment Card */}
                    <Card className="shadow-card-yellow pt-6 overflow-visible mt-2">
                        <View className="absolute -top-4 -right-4 w-14 h-14 bg-tertiary rounded-full border-chunky border-foreground shadow-hard items-center justify-center z-10">
                            <CreditCard size={28} color="#1e293b" />
                        </View>
                        <CardHeader>
                            <CardTitle className="text-xl">Register Card Info</CardTitle>
                            <CardDescription>Add your payment card to make purchases faster and easier</CardDescription>
                        </CardHeader>
                         <CardContent>
                            <Button label="Add Payment Card" className="w-full" />
                        </CardContent>
                    </Card>

                    {/* Account Section */}
                    <View>
                        <Text className="text-lg font-heading font-bold text-foreground mb-2 ml-1">Account</Text>
                        <Card className="p-0 shadow-card">
                             <CardContent className="p-0">
                                <SettingRow icon={User} label="Profile Settings" subLabel="Update your personal information" color="bg-primary" />
                            </CardContent>
                        </Card>
                    </View>

                    {/* Preferences Section */}
                    <View>
                         <Text className="text-lg font-heading font-bold text-foreground mb-2 ml-1">Preferences</Text>
                         <Card className="p-0 shadow-card-pink">
                            <CardContent className="p-0 divide-y divide-border">
                                 <SettingRow icon={Bell} label="Push Notifications" subLabel="Expiry reminders and updates" color="bg-secondary" hasSwitch hasArrow={false} />
                                 <SettingRow icon={Shield} label="Face ID / Touch ID" subLabel="Secure app access" color="bg-quaternary" hasSwitch hasArrow={false} />
                            </CardContent>
                        </Card>
                    </View>

                    {/* Support Section */}
                    <View>
                         <Text className="text-lg font-heading font-bold text-foreground mb-2 ml-1">Support</Text>
                         <Card className="p-0 shadow-card-mint">
                            <CardContent className="p-0">
                                 <SettingRow icon={HelpCircle} label="Help & FAQ" subLabel="Get answers to common questions" color="bg-primary" />
                            </CardContent>
                        </Card>
                    </View>

                    {/* Logout */}
                    <Card className="p-0 border-destructive shadow-[4px_4px_0px_0px_#EF4444] mt-2 mb-8">
                         <CardContent className="p-0">
                            <SettingRow 
                                icon={LogOut} 
                                label="Sign Out" 
                                color="bg-destructive" 
                                isDestructive 
                                hasArrow={false} 
                            />
                        </CardContent>
                    </Card>

                    <View className="items-center pb-8">
                        <Text className="text-xs font-mono font-bold text-muted-foreground">G'day Gift v1.0.0</Text>
                    </View>
                </View>
            </ScrollView>
         </SafeAreaView>
    );
}
