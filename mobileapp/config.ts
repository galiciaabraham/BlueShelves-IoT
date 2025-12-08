// config.ts
// Centralized configuration for environment variables

// Base API
export const API_BASE_URL: string = process.env.EXPO_PUBLIC_API_URL!;

// Mobile API Key
export const MOBILE_API_KEY: string = process.env.EXPO_PUBLIC_MOBILE_API_KEY!;

// Firebase configuration
export const FIREBASE_CONFIG = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// Google OAuth configuration
export const GOOGLE_AUTH_CONFIG = {
  expoClientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID!,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID!,
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID!,
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
};

// Utility: check if config is loaded correctly
export const validateConfig = () => {
  if (!API_BASE_URL) {
    throw new Error("Missing EXPO_PUBLIC_API_URL in .env");
  }
  if (!MOBILE_API_KEY) {
    console.warn("⚠️ MOBILE_API_KEY not set — some features may be disabled.");
  }
  if (!FIREBASE_CONFIG.apiKey) {
    throw new Error("Missing Firebase API key in .env");
  }
  if (!GOOGLE_AUTH_CONFIG.webClientId) {
    console.warn("⚠️ GOOGLE_WEB_CLIENT_ID not set — Google login may not work.");
  }
};