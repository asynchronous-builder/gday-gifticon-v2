# Architecture Design: Gday Gift Mobile 🏗️

This document outlines the architectural decisions, technology stack, and structure of the **Gday Gift** mobile application.

## 1. Technology Stack

| Category       | Technology              | Reasoning                                                                                            |
| :------------- | :---------------------- | :--------------------------------------------------------------------------------------------------- |
| **Framework**  | **Expo (SDK 53)**       | Provides a robust, managed React Native environment with OTA updates and easy build pipelines (EAS). |
| **Core**       | **React Native**        | Allows 70% logic reuse from the web platform (React hooks, state, utils).                            |
| **Styling**    | **NativeWind (v4)**     | Enables **Tailwind CSS** styling in React Native, ensuring design consistency with the web app.      |
| **Navigation** | **Expo Router**         | File-based routing (similar to Next.js) that handles deep linking and native stacks automatically.   |
| **Fonts**      | **Expo Google Fonts**   | Standardized typography (_Outfit_ for headings, _Plus Jakarta Sans_ for body).                       |
| **Icons**      | **Lucide React Native** | Consistent, scalable SVG icons that match the web design system.                                     |

## 2. Project Structure

The project follows a **Feature-First** directory structure with file-based routing.

```
mobile/
├── app/                      # Expo Router (Navigation)
│   ├── (tabs)/               # Main App Interface (Protected)
│   │   ├── _layout.tsx       # Tab Bar Configuration
│   │   ├── index.tsx         # Home Screen
│   │   ├── wallet.tsx        # Wallet Screen
│   │   └── settings.tsx      # Settings Screen
│   ├── onboarding/           # Auth Flow (Public)
│   ├── business/[id].tsx     # Dynamic Routes
│   └── _layout.tsx           # Root Stack Configuration
├── components/
│   └── ui/                   # Reusable Design Primitives (Button, Card, Input)
├── constants/                # Static Data (Mock Data, Theme Constants)
├── lib/                      # Utilities (Auth, Formatter, Helper Functions)
└── assets/                   # Static Assets (Images, Fonts)
```

## 3. Design System Implementation

The app implements a **Neo-Brutalist / Pop** design language using `NativeWind`.

- **Tokens**: Defined in `tailwind.config.js` (colors, border-radius, shadows).
- **Shadows**: Custom "Hard" shadows (`shadow-hard`) using direct CSS box-shadow simulation.
- **Components**:
  - **Button**: Supports variants (`default`, `pink`, `mint`, `yellow`) directly mapped to brand colors.
  - **Card**: Base container with chunky borders.

## 4. Key Architectural Patterns

### Navigation (Expo Router)

- **File-System Routing**: Folders define stacks. `(tabs)` group routes into a tab bar.
- **Deep Linking**: `gdaygift://business/1` maps directly to `app/business/[id].tsx`.
- **Modals**: Screens like `purchase-modal.tsx` are defined as `presentation: 'modal'` in `_layout.tsx`.

### Data Flow

- **Local State**: `useState` is used for UI state (forms, tab selection).
- **Mock Data**: Currently uses static arrays in `constants/data.ts` to simulate API complexity.
- **Future State**: Designed to allow `TanStack Query` (React Query) to replace the static data hooks without UI refactors.

### Device Capabilities

- **Biometrics**: `expo-local-authentication` wraps native FaceID/TouchID.
- **Notifications**: Mocked `expo-notifications` implementation for reliable Expo Go development (SDK 53 constraint).

## 5. Security & Performance

- **Safe Areas**: `react-native-safe-area-context` ensures UI doesn't clip on Notches or Dynamic Islands.
- **Font Loading**: `expo-splash-screen` holds the launch image until fonts are ready Use `useFonts`.
- **Type Safety**: Full strict TypeScript configuration.
