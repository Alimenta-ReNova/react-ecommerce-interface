import { useColorScheme } from "react-native";
import { useThemeMode } from "../components/auth-context";
import { Colors } from "../constants/theme";

export function useThemeColor() {
  const { themeMode } = useThemeMode();

  // Se o usuário tiver preferência salva, usar isso, caso contrário usar sistema
  let scheme: "light" | "dark" = themeMode;

  // Se o tema for light/dark e não for system, usar a preferência
  // Caso contrário, usar o tema do sistema
  if (themeMode === "light" || themeMode === "dark") {
    scheme = themeMode;
  } else {
    scheme = useColorScheme() ?? "light";
  }

  return Colors[scheme as keyof typeof Colors];
}
