// import * as Notifications from 'expo-notifications'; 
// SDK 53 removes expo-notifications from Expo Go.
// We are MOCKING this entire module to prevent crashes during development.

// Mock Handler
const setNotificationHandler = (handler: any) => {
    console.log('[Mock Notifications] Handler set:', handler);
};

// Mock Scheduler
export async function scheduleNotification(title: string, body: string, seconds = 1) {
    console.log(`[Mock Notification] Scheduled: "${title}" - "${body}" in ${seconds}s`);
    // Simulate success
    return true;
}

// Export a dummy object if needed by other consumers, but we primarily export the function above.
export const Notifications = {
    setNotificationHandler,
    scheduleNotificationAsync: async (args: any) => console.log('[Mock] scheduleNotificationAsync', args),
    requestPermissionsAsync: async () => ({ status: 'granted' }),
    AndroidNotificationPriority: { HIGH: 'high' }
};

// Initialize handler immediately (safe no-op)
setNotificationHandler({});
