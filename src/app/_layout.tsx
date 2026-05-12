import { Stack } from "expo-router";
import { AuthProvider } from "../components/auth-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" options={{ presentation: "modal" }} />
        <Stack.Screen name="admin" />
        <Stack.Screen name="personal-data" />
        <Stack.Screen name="user-products" />
        <Stack.Screen name="purchase-history" />
        <Stack.Screen name="alert-preferences" />
        <Stack.Screen name="settings" />
      </Stack>
    </AuthProvider>
  );
}
