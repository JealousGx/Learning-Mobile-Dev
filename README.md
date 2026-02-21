# Viora - E-commerce Mobile App

Viora is a cross-platform e-commerce mobile application built with Expo and React Native. It features a modern design, user authentication, product browsing, shopping cart functionality, and user profiles.

## Features

- **User Authentication:** Secure sign-up, login, and password recovery.
- **Onboarding:** Guided introduction for new users.
- **Product Catalog:** Browse a wide range of products with detailed listings.
- **Shopping Cart:** Add, remove, and manage items in your cart.
- **Favorites:** Save products for later.
- **User Profile:** View and edit your personal information.
- **Search Functionality:** Easily find products.
- **Cross-Platform:** Available on Android, iOS, and Web.

## Technologies Used

- **Expo:** For building universal React applications.
- **React Native:** For native mobile UI development.
- **Expo Router:** File-based routing for seamless navigation.
- **Zustand:** For state management.
- **React Hook Form & Yup:** For form handling and validation.
- **TypeScript:** For type safety.
- **Biome:** For code linting and formatting.

## Get Started

Follow these steps to set up and run Viora on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone --branch viora --single-branch https://github.com/JealousGx/Learning-Mobile-Dev
   cd viora
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. **Start the Expo development server:**
   ```bash
   npx expo start
   ```
2. **Open on your device/simulator:**
   - Scan the QR code with the Expo Go app on your phone.
   - Run on Android emulator: Press `a` in the terminal.
   - Run on iOS simulator: Press `i` in the terminal.
   - Run on web browser: Press `w` in the terminal.

### Project Structure

```
├── app/                  # Application routes and screens
│   ├── (auth)/           # Authentication flows (login, signup, forgot password)
│   ├── (onboarding)/     # First-time user introduction
│   └── (tabs)/           # Main application screens (home, cart, profile, etc.)
├── components/           # Reusable UI components
├── constants/            # Application constants (colors, data, theme)
├── hooks/                # Custom React hooks
├── store/                # Zustand stores for global state
├── assets/               # Static assets (images, icons)
├── schema/               # Form validation schemas
└── utils/                # Utility functions
```

## License

This project is licensed under the MIT License.
