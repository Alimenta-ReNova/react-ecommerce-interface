import { Redirect } from "expo-router";

import { useAuth } from "../components/auth-context";
import ProfileScreen from "./(tabs)/profile";

export default function ProfileRoute() {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (role === "admin") {
    return <ProfileScreen />;
  }

  return <Redirect href="/(tabs)/profile" />;
}
