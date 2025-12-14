# Implementation Guide & Migration Plan 🚀

This document serves as the master guide for the **Gday Gift** mobile application development. It captures the migration strategy from the web platform and the step-by-step implementation log.

## 1. Migration Strategy: Web to Mobile

We chose a **Hybrid Migration** approach, leveraging **Expo (React Native)** to reuse business logic while rewriting the UI for native performance.

| Concept        | Web (Original)         | Mobile (Current)                 |
| :------------- | :--------------------- | :------------------------------- |
| **Framework**  | React + Vite           | React Native + Expo              |
| **Routing**    | React Router / State   | Expo Router (File-based)         |
| **Styling**    | Tailwind CSS           | NativeWind (Tailwind for RN)     |
| **Primitives** | HTML (`div`, `button`) | RN (`View`, `Pressable`, `Text`) |
| **Icons**      | Lucide React           | Lucide React Native              |

### Key Adaptations

- **DOM to Native**: `div` replaced with `View`. `className` prop preserved via `NativeWind`.
- **Navigation**: "Tabs" replaced custom navbar components. "Modals" replaced overlaid divs.
- **Gestures**: Added generic touch feedback (`active:scale`, `hover` states mapped to press states).

---

## 2. Implementation Log (Phases)

### Phase 1: Foundation Setup ✅

- [x] **Initialize Expo**: Created project with TypeScript and Navigation template.
- [x] **Configure NativeWind**: Set up `tailwind.config.js` with brand colors (`primary`, `secondary`, `tertiary`) and fonts (`Outfit`).
- [x] **Type Safety**: Configured TypeScript environments.

### Phase 2: UI Primitives ✅

Created the core "Lego blocks" of the application in `components/ui/`:

- [x] **Button**: Supports multiple variants (Pink, Mint, Ghost) and loading states.
- [x] **Card**: Chunky border cards with hard shadows.
- [x] **Input / Textarea**: Form elements with focus states.
- [x] **Badge**: Status indicators (Active, Expired).

### Phase 3: Core Screens ✅

- [x] **Tab Layout**: Implemented Bottom Tabs using Expo Router.
- [x] **Home Screen**:
  - Horizontal Categories scroll.
  - "Near You" business list with shadow cards.
- [x] **Business Details**:
  - Parallax header image.
  - Sticky "Purchase" footer.
- [x] **Wallet**:
  - "Apple Wallet" style list.
  - Tabs for "Received" vs "Purchased".
  - Empty states.

### Phase 4: Advanced Flows (Current) ✅

- [x] **Purchase Flow**:
  - Multi-step wizard (Amount -> Message -> Payment).
  - Biometric Authentication mock (`expo-local-authentication`).
- [x] **Onboarding**:
  - Splash screen with "Candy Buttons".
  - Email Sign Up form.
- [x] **Redemption**:
  - QR Code generation (`react-native-qrcode-svg`).
  - Screen brightness control hook.

### Phase 5: Polish & Refinement ✅

- [x] **Spacing**: Refined "Neo-Brutalist" margins (p-6, gap-4).
- [x] **Interactions**: Added `Pressable` animations.
- [x] **Notifications**: Implemented Safe Mock for Expo Go (preventing native crash).
- [x] **Project Identity**: Renamed to "Gday Gift".

### Phase 6: Deployment Setup (Pending) 🚧

- [ ] **Identity**: Configure iOS Bundle Identifier in `app.json`.
- [ ] **EAS Configuration**: Generate `eas.json` for build profiles.
- [ ] **Apple Developer**: Ensure valid Apple Developer account is connected.
- [ ] **TestFlight**: Run first build and submit.

---

## 3. Workflow Guidelines

### Adding New Screens

1. Create a file in `app/`. Name it `my-screen.tsx`.
2. Wrap content in `SafeAreaView`.
3. Use `NativeWind` for layout: `<View className="flex-1 bg-background">`.

### Styling Rules

- **Spacing**: Use standard grid (`p-4`, `gap-4`).
- **Text**: Always specify font family (`font-heading` or `font-body`).
- **Colors**: Use semantic names (`bg-primary`) not hex codes.

### Mocking Data

- Add new entities to `constants/data.ts`.
- Use `useLocalSearchParams` to pass IDs between screens.

---

## 4. Deployment Strategy

### Apple TestFlight (iOS)

We use **EAS Build** (Expo Application Services) to build and submit the app to Apple TestFlight.

**Prerequisites:**

- Apple Developer Account (Enrolled)
- EAS CLI installed (`npm install -g eas-cli`)

**Steps:**

1. **Configure Bundle Identifier:**
   Update `app.json` with a unique bundle ID (e.g., `com.yourname.gdaygift`).

   ```json
   "ios": {
     "bundleIdentifier": "com.company.gdaygift",
     "supportsTablet": true
   }
   ```

2. **Login to Expo:**

   ```bash
   eas login
   ```

3. **Configure Project:**
   Comparison of build profiles is stored in `eas.json`. run this if not yet configured:

   ```bash
   eas build:configure
   ```

4. **Build for iOS:**
   This command creates a build artifact signed for distribution. It will guide you through setting up credentials if they don't exist.

   ```bash
   eas build --platform ios
   ```

5. **Submit to TestFlight:**
   Once the build completes, you can submit it directly to App Store Connect.
   ```bash
   eas submit -p ios
   ```
