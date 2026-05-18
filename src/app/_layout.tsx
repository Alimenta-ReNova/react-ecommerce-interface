import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../components/auth-context";
import { CatalogProvider } from "../components/catalog-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CatalogProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="login" options={{ presentation: "modal" }} />
            <Stack.Screen name="admin" />
            <Stack.Screen name="categories" />
            <Stack.Screen name="personal-data" />
            <Stack.Screen name="user-products" />
            <Stack.Screen name="purchase-history" />
            <Stack.Screen name="alert-preferences" />
            <Stack.Screen name="alert-details" />
            <Stack.Screen name="settings" />
          </Stack>
        </CatalogProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
