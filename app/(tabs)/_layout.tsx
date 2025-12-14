import React from 'react';
import { Tabs } from 'expo-router';
import { Home, WalletCards, Settings } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#8b5cf6', // primary
            tabBarInactiveTintColor: '#94a3b8', // muted-foreground
            tabBarStyle: {
                borderTopWidth: 2,
                borderTopColor: '#1e293b', // foreground
                // height: 60,
                paddingBottom: 8,
                paddingTop: 8,
                elevation: 0,
                backgroundColor: '#fff',
            },
            tabBarLabelStyle: {
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 12,
                fontWeight: '700',
            }
        }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <WalletCards size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
