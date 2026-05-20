import { Platform } from "react-native";

/**
 * Cores do ReNova baseadas no Figma
 */
export const Colors = {
  light: {
    text: "#60412B",
    background: "#FDF7E7",
    backgroundElement: "#F5E6CC",
    backgroundSelected: "#E8D8B8",
    textSecondary: "#A69080",
    accent: "#4B5320", // Verde oliva dos cards
  },
  dark: {
    text: "#F3E7D4",
    background: "#0F0B08",
    backgroundElement: "#1A1410",
    backgroundSelected: "#25201B",
    textSecondary: "#B79F8D",
    accent: "#B8B07A",
  },
} as const;

export const AppAssets = {
  logos: {
    glow: require("../../assets/images/logo-glow.png"),
    expo: require("../../assets/images/expo-logo.png"),
  },
  badges: {
    expo: require("../../assets/images/expo-badge.png"),
    expoWhite: require("../../assets/images/expo-badge-white.png"),
  },
  tabs: {
    home: require("../../assets/images/tabIcons/home.png"),
    explore: require("../../assets/images/tabIcons/explore.png"),
  },
} as const;

/**
 * Fontes (Adicionadas para corrigir o erro 'mono' of undefined)
 */
export const Fonts = Platform.select({
  ios: {
    sans: "System",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "Courier",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});

/**
 * Espaçamentos
 */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const AppTheme = {
  colors: Colors,
  fonts: Fonts,
  assets: AppAssets,
  spacing: Spacing,
} as const;

// Constantes auxiliares que o template do Expo pode usar
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
