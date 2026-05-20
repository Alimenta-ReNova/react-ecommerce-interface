import { Feather } from "@expo/vector-icons";
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

export default function AdminUsersScreen() {
  const theme = useTheme();
  const { accounts, registerUser } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const [formSuccess, setFormSuccess] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const users = accounts.filter((account) => account.role === "user");

  const handleCreateUser = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedCpf = cpf.trim();
    const trimmedPhone = phone.trim();
    const trimmedPassword = password.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedCpf ||
      !trimmedPhone ||
      !trimmedPassword
    ) {
      setFormError("Preencha todos os campos para cadastrar o usuário.");
      setFormSuccess("");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      await registerUser({
        name: trimmedName,
        email: trimmedEmail,
        cpf: trimmedCpf,
        phone: trimmedPhone,
        password: trimmedPassword,
      });

      setName("");
      setEmail("");
      setCpf("");
      setPhone("");
      setPassword("");
      setFormSuccess("Usuário cadastrado com sucesso.");
    } catch (error) {
      setFormSuccess("");
      setFormError(
        error instanceof Error
          ? error.message
          : "Não foi possível cadastrar o usuário.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <BackHomeButton
          backgroundColor={theme.backgroundElement}
          iconColor={theme.text}
        />
        <Text style={[styles.title, { color: theme.text }]}>
          Cadastro de usuários
        </Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: theme.text }]}>
          <Text style={[styles.heroTitle, { color: theme.background }]}>
            Novo usuário
          </Text>
          <Text style={[styles.heroText, { color: theme.background }]}>
            Cadastre clientes diretamente pelo painel administrativo.
          </Text>
        </View>

        <View
          style={[
            styles.formCard,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <View
            style={[styles.inputGroup, { backgroundColor: theme.background }]}
          >
            <Feather name="user" size={18} color={theme.textSecondary} />
            <TextInput
              placeholder="Nome completo"
              value={name}
              onChangeText={setName}
              style={[styles.input, { color: theme.text }]}
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View
            style={[styles.inputGroup, { backgroundColor: theme.background }]}
          >
            <Feather name="mail" size={18} color={theme.textSecondary} />
            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, { color: theme.text }]}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View
            style={[styles.inputGroup, { backgroundColor: theme.background }]}
          >
            <Feather name="shield" size={18} color={theme.textSecondary} />
            <TextInput
              placeholder="CPF"
              value={cpf}
              onChangeText={setCpf}
              style={[styles.input, { color: theme.text }]}
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View
            style={[styles.inputGroup, { backgroundColor: theme.background }]}
          >
            <Feather name="phone" size={18} color={theme.textSecondary} />
            <TextInput
              placeholder="Telefone"
              value={phone}
              onChangeText={setPhone}
              style={[styles.input, { color: theme.text }]}
              keyboardType="phone-pad"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View
            style={[styles.inputGroup, { backgroundColor: theme.background }]}
          >
            <Feather name="lock" size={18} color={theme.textSecondary} />
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { color: theme.text }]}
              secureTextEntry
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          {!!formError && (
            <Text style={[styles.formMessage, { color: "#B42318" }]}>
              {formError}
            </Text>
          )}

          {!!formSuccess && (
            <Text style={[styles.formMessage, { color: "#2E7D32" }]}>
              {formSuccess}
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.createButton,
              { backgroundColor: theme.text, opacity: isSubmitting ? 0.7 : 1 },
            ]}
            onPress={handleCreateUser}
            disabled={isSubmitting}
          >
            <Text
              style={[styles.createButtonText, { color: theme.background }]}
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar usuário"}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[styles.notice, { backgroundColor: theme.backgroundElement }]}
        >
          <Text style={[styles.noticeTitle, { color: theme.text }]}>
            Usuários cadastrados
          </Text>
          <Text style={[styles.noticeText, { color: theme.textSecondary }]}>
            O login passa a aceitar a nova conta assim que o cadastro é salvo.
          </Text>

          {users.length === 0 ? (
            <Text style={[styles.emptyState, { color: theme.textSecondary }]}>
              Nenhum usuário cadastrado.
            </Text>
          ) : (
            users.map((user) => (
              <View key={user.email} style={styles.userRow}>
                <View style={styles.userAvatar}>
                  <Feather name="user" size={18} color={theme.text} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.userName, { color: theme.text }]}>
                    {user.name}
                  </Text>
                  <Text
                    style={[styles.userMeta, { color: theme.textSecondary }]}
                  >
                    {user.email}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
  },
  content: { padding: 20, paddingBottom: 40, gap: 14 },
  hero: { borderRadius: 28, padding: 22, gap: 8 },
  heroTitle: { fontSize: 22, fontWeight: "bold", fontFamily: "serif" },
  heroText: { fontSize: 15, lineHeight: 21 },
  formCard: { borderRadius: 20, padding: 18, gap: 12 },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 16,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  input: { flex: 1, fontSize: 15, paddingVertical: 12 },
  formMessage: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
  createButton: {
    marginTop: 2,
    borderRadius: 14,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  createButtonText: { fontSize: 14, fontWeight: "700" },
  notice: { borderRadius: 20, padding: 18 },
  noticeTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "serif",
    marginBottom: 6,
  },
  noticeText: { fontSize: 14, lineHeight: 20 },
  emptyState: { marginTop: 12, fontSize: 14 },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E8D8B8",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: { fontSize: 15, fontWeight: "700" },
  userMeta: { fontSize: 13, marginTop: 2 },
});
