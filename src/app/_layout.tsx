import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Aqui você chama apenas o GRUPO das abas */}
      <Stack.Screen name="(tabs)" /> 
      
      {/* Aqui você chama apenas as telas que estão FORA da pasta (tabs) */}
      <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      <Stack.Screen name="personal-data" />
      <Stack.Screen name="user-products" />
      <Stack.Screen name="purchase-history" />
      <Stack.Screen name="alert-preferences" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}