import * as LocalAuthentication from 'expo-local-authentication';

export async function authenticateUser() {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      // Fallback: If no biometrics, just allow it (or prompt for password in a real app)
      // For this MVP, we consider it 'authenticated' if device doesn't support it, 
      // or return true to simulate success.
      return true;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to complete purchase',
      fallbackLabel: 'Enter Passcode',
    });

    return result.success;
  } catch (error) {
    console.error("Biometric auth error:", error);
    return false;
  }
}
