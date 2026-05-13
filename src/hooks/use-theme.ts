/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useAuth } from "@/components/auth-context";
import { Colors } from "@/constants/theme";

export function useTheme() {
  const { themeMode } = useAuth();

  return Colors[themeMode];
}
