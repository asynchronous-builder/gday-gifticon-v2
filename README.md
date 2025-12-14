# Gday Gift 🎁

A modern mobile application for sharing gift cards and experiences, built with React Native and Expo.

## 🚀 Features

- **Hybrid Architecture**: Leverages Expo & React Native for cross-platform compatibility.
- **Modern UI**: Styled with **NativeWind** (Tailwind CSS for RN) and custom "Neo-Brutalist" components.
- **File-based Routing**: Utilizes **Expo Router** for intuitive navigation.
- **Secure**: Mocked biometric authentication and secure storage handling.
- **TestFlight Ready**: Configured for EAS Build and Deployment.

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 50+)
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS)
- **Navigation**: Expo Router
- **Icons**: Lucide React Native
- **Fonts**: Outfit & Plus Jakarta Sans

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (LTS recommended)
- `npm` or `yarn`
- [Expo Go](https://expo.dev/client) app on your physical device OR an iOS Simulator/Android Emulator.

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd gday-gifticon-v2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

## 📱 Running the App

- **Press `i`** to open in the iOS Simulator.
- **Press `a`** to open in the Android Emulator.
- **Scan the QR code** with your phone's camera (iOS) or the Expo Go app (Android) to run on a physical device.

## 📂 Project Structure

- `app/`: Application screens and routing (Expo Router).
- `components/`: Reusable UI components (Buttons, Cards, Inputs).
- `constants/`: Global configuration and dummy data.
- `assets/`: Images, fonts, and static resources.

## 📦 Deployment

This project uses **EAS Build** for deployment. See [IMPLEMENTATION.md](IMPLEMENTATION.md) for detailed deployment instructions, including TestFlight setup.

## 🤝 Contributing

Please refer to [ARCHITECTURE.md](ARCHITECTURE.md) for coding standards and architectural decisions.

---

Built with ❤️ by the Gday Team.
