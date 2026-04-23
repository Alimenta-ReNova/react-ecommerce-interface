import { Platform } from 'react-native';

/**
 * Cores do ReNova baseadas no Figma
 */
export const Colors = {
  light: {
    text: '#60412B',
    background: '#FDF7E7',
    backgroundElement: '#F5E6CC',
    backgroundSelected: '#E8D8B8',
    textSecondary: '#A69080',
    accent: '#4B5320', // Verde oliva dos cards
  },
  dark: {
    text: '#FDF7E7',
    background: '#2B1B12',
    backgroundElement: '#3D2B1F',
    backgroundSelected: '#4D3B2F',
    textSecondary: '#A69080',
    accent: '#6B7340',
  },
} as const;

/**
 * Fontes (Adicionadas para corrigir o erro 'mono' of undefined)
 */
export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'Courier',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
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

// Constantes auxiliares que o template do Expo pode usar
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;