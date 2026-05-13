import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../components/auth-context";
import BackHomeButton from "../components/back-home-button";
import { useTheme } from "../hooks/use-theme";

export default function PersonalData() {
  const router = useRouter();
  const theme = useTheme();
  const { isAuthenticated, user } = useAuth();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <BackHomeButton
            backgroundColor={theme.backgroundElement}
            iconColor={theme.text}
          />
          <Text style={[styles.title, { color: theme.text }]}>
            Dados Pessoais
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.label}>Nome Completo</Text>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: theme.backgroundElement },
            ]}
          >
            <TextInput
              style={[styles.input, { color: theme.text }]}
              defaultValue={user?.name ?? "Ingrid Souza"}
            />
          </View>

          {/* Campo CPF - Bloqueado se estiver logado */}
          <Text style={styles.label}>CPF (Não editável após cadastro)</Text>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: theme.backgroundElement },
              isAuthenticated && { opacity: 0.5 },
            ]}
          >
            <Feather
              name="shield"
              size={18}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              defaultValue={user?.cpf ?? "123.456.789-00"}
              editable={!isAuthenticated}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.label}>E-mail</Text>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: theme.backgroundElement },
            ]}
          >
            <Feather
              name="mail"
              size={18}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              defaultValue={user?.email ?? "ingrid.souza@furg.br"}
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.label}>Telefone</Text>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: theme.backgroundElement },
            ]}
          >
            <Feather
              name="phone"
              size={18}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              defaultValue={user?.phone ?? "(53) 9xxxx-xxxx"}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: theme.text }]}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={[styles.saveButtonText, { color: theme.background }]}>
              Salvar Alterações
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", padding: 20, gap: 15 },
  title: { fontSize: 24, fontWeight: "bold", fontFamily: "serif" },
  scrollContent: { padding: 20, paddingBottom: 50 },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8B735B",
    marginBottom: 8,
    marginTop: 18,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 15,
    height: 55,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, fontFamily: "sans-serif-medium" },
  saveButton: {
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  saveButtonText: { fontSize: 18, fontWeight: "bold", fontFamily: "serif" },
});
