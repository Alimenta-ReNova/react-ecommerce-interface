import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeMode } from "../components/auth-context";
import { Colors } from "../constants/theme";

export default function Settings() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme as keyof typeof Colors];
  const { themeMode, toggleThemeMode } = useThemeMode();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: theme.backgroundElement }]}
        >
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Configurações</Text>
        <View style={{ width: 45 }} />
      </View>

      <View style={styles.content}>
        <View
          style={[styles.option, { backgroundColor: theme.backgroundElement }]}
        >
          <Feather
            name={themeMode === "dark" ? "moon" : "sun"}
            size={20}
            color={theme.text}
          />
          <View style={styles.optionContent}>
            <Text style={[styles.optionText, { color: theme.text }]}>
              Tema Escuro
            </Text>
            <Text
              style={[styles.optionSubtext, { color: theme.textSecondary }]}
            >
              {themeMode === "dark" ? "Ativado" : "Desativado"}
            </Text>
          </View>
          <Switch
            value={themeMode === "dark"}
            onValueChange={toggleThemeMode}
            trackColor={{ false: "#D9D9D9", true: "#8B735B" }}
            thumbColor={themeMode === "dark" ? theme.background : "#f4f3f4"}
          />
        </View>

        <TouchableOpacity
          style={[styles.option, { backgroundColor: theme.backgroundElement }]}
        >
          <Feather name="lock" size={20} color={theme.text} />
          <Text style={[styles.optionText, { color: theme.text }]}>
            Alterar Senha
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={theme.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, { backgroundColor: theme.backgroundElement }]}
        >
          <Feather name="trash-2" size={20} color="#FF6B6B" />
          <Text style={[styles.optionText, { color: "#FF6B6B" }]}>
            Excluir Conta
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  backBtn: { padding: 10, borderRadius: 12 },
  title: { fontSize: 24, fontWeight: "bold", fontFamily: "serif" },
  content: { padding: 20 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    gap: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionContent: { flex: 1 },
  optionText: { fontSize: 16, fontWeight: "600", fontFamily: "serif" },
  optionSubtext: { fontSize: 12, fontWeight: "400", marginTop: 4 },
});
