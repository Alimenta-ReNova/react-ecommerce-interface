import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

type BackHomeButtonProps = {
  backgroundColor: string;
  iconColor: string;
  style?: StyleProp<ViewStyle>;
  size?: number;
};

export default function BackHomeButton({
  backgroundColor,
  iconColor,
  style,
  size = 24,
}: BackHomeButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      accessibilityLabel="Voltar para a tela inicial"
      onPress={() => router.replace("/(tabs)")}
      style={[styles.button, { backgroundColor }, style]}
    >
      <Ionicons name="chevron-back" size={size} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
