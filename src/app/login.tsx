import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    getMockAccount,
    useAuth,
    UserRole,
    validateMockCredentials,
} from "../components/auth-context";
import BackHomeButton from "../components/back-home-button";
import { Fonts, Spacing } from "../constants/theme";
import { useTheme } from "../hooks/use-theme";

export default function LoginScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const theme = useTheme();
  const { registerUser, signIn, isLoading, isAuthenticated, role } = useAuth();
  const mockAccount = getMockAccount(selectedRole);

  const handleSubmit = async () => {
    if (!isLogin) {
      if (selectedRole !== "user") {
        setErrorMessage(
          "Contas de administrador são criadas apenas no painel admin.",
        );
        return;
      }

      if (
        !name.trim() ||
        !cpf.trim() ||
        !phone.trim() ||
        !email.trim() ||
        !password.trim()
      ) {
        setErrorMessage("Preencha todos os campos para criar sua conta.");
        return;
      }

      try {
        await registerUser({
          name,
          cpf,
          phone,
          email,
          password,
        });

        await signIn("user", email);
        router.replace("/profile");
        return;
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Não foi possível criar a conta.",
        );
        return;
      }
    }

    if (!validateMockCredentials(selectedRole, email, password)) {
      setErrorMessage("E-mail ou senha inválidos para este perfil.");
      return;
    }

    setErrorMessage("");
    await signIn(selectedRole, email);
    router.replace(selectedRole === "admin" ? "/admin" : "/profile");
  };

  useEffect(() => {
    if (!mockAccount) {
      return;
    }

    if (isLogin) {
      setEmail(mockAccount.email);
      setPassword(mockAccount.password);
      setErrorMessage("");
    }
  }, [isLogin, mockAccount]);

  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      return;
    }

    router.replace(role === "admin" ? "/admin" : "/profile");
  }, [isAuthenticated, isLoading, role, router]);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <BackHomeButton
          backgroundColor={theme.backgroundElement}
          iconColor={theme.text}
          style={styles.backButton}
        />

        <View style={styles.header}>
          <Image
            source={require("../../assets/images/logo-glow.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.welcomeText, { color: theme.text }]}>
            {isLogin ? "Alimenta ReNova" : "Criar Conta"}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {isLogin
              ? "Gerencie seus produtos naturais com inteligência"
              : "Preencha os dados abaixo"}
          </Text>
        </View>

        <View style={styles.form}>
          <View
            style={[
              styles.mockBox,
              { backgroundColor: theme.backgroundElement },
            ]}
          >
            <Text style={[styles.mockTitle, { color: theme.text }]}>
              Mock selecionado
            </Text>
            <Text style={[styles.mockText, { color: theme.textSecondary }]}>
              {mockAccount?.name}
            </Text>
            <Text style={[styles.mockText, { color: theme.textSecondary }]}>
              {mockAccount?.email}
            </Text>
            <Text style={[styles.mockText, { color: theme.textSecondary }]}>
              Senha: {mockAccount?.password}
            </Text>
          </View>

          <View style={styles.roleSelector}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                {
                  backgroundColor:
                    selectedRole === "user"
                      ? theme.text
                      : theme.backgroundElement,
                },
              ]}
              onPress={() => setSelectedRole("user")}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  {
                    color:
                      selectedRole === "user" ? theme.background : theme.text,
                  },
                ]}
              >
                Usuário
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                {
                  backgroundColor:
                    selectedRole === "admin"
                      ? theme.text
                      : theme.backgroundElement,
                },
              ]}
              onPress={() => setSelectedRole("admin")}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  {
                    color:
                      selectedRole === "admin" ? theme.background : theme.text,
                  },
                ]}
              >
                Admin
              </Text>
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <View
              style={[
                styles.inputGroup,
                { backgroundColor: theme.backgroundElement },
              ]}
            >
              <Feather name="user" size={18} color={theme.textSecondary} />
              <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholderTextColor={theme.textSecondary}
              />
            </View>
          )}

          {!isLogin && (
            <View
              style={[
                styles.inputGroup,
                { backgroundColor: theme.backgroundElement },
              ]}
            >
              <Feather name="shield" size={18} color={theme.textSecondary} />
              <TextInput
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor={theme.textSecondary}
              />
            </View>
          )}

          {!isLogin && (
            <View
              style={[
                styles.inputGroup,
                { backgroundColor: theme.backgroundElement },
              ]}
            >
              <Feather name="phone" size={18} color={theme.textSecondary} />
              <TextInput
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
          )}

          <View
            style={[
              styles.inputGroup,
              { backgroundColor: theme.backgroundElement },
            ]}
          >
            <Feather name="mail" size={18} color={theme.textSecondary} />
            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View
            style={[
              styles.inputGroup,
              { backgroundColor: theme.backgroundElement },
            ]}
          >
            <Feather name="lock" size={18} color={theme.textSecondary} />
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
          </View>

          {!!errorMessage && (
            <Text style={[styles.errorText, { color: "#B42318" }]}>
              {errorMessage}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: theme.accent }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.buttonText, { color: theme.background }]}>
              {isLogin ? "Entrar" : "Cadastrar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsLogin(!isLogin)}
            style={styles.switchButton}
          >
            <Text style={[styles.switchText, { color: theme.textSecondary }]}>
              {isLogin ? "Não tem uma conta? " : "Já possui conta? "}
              <Text style={{ color: theme.text, fontWeight: "bold" }}>
                {isLogin ? "Cadastre-se" : "Faça Login"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: Spacing.four, flexGrow: 1, justifyContent: "center" },
  backButton: { marginBottom: Spacing.two },
  header: { marginBottom: Spacing.five, alignItems: "center" },
  logo: { width: 120, height: 120, marginBottom: Spacing.two },
  welcomeText: {
    fontSize: 34,
    fontWeight: "700",
    fontFamily: Fonts?.serif ?? "serif",
    textAlign: "center",
  },
  subtitle: { fontSize: 15, marginTop: Spacing.one, textAlign: "center" },
  form: { width: "100%", maxWidth: 520, alignSelf: "center" },
  roleSelector: { flexDirection: "row", gap: 12, marginBottom: Spacing.two },
  roleButton: {
    flex: 1,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  roleButtonText: { fontSize: 15, fontWeight: "700" },
  mockBox: {
    borderRadius: 16,
    padding: Spacing.two,
    marginBottom: Spacing.two,
    gap: 4,
  },
  mockTitle: { fontSize: 14, fontWeight: "700", marginBottom: 4 },
  mockText: { fontSize: 13, lineHeight: 20 },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 14,
    height: 56,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: Fonts?.sans ?? "normal",
  },
  mainButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.three,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: Fonts?.serif ?? "serif",
  },
  errorText: { marginTop: 8, fontSize: 13, fontWeight: "600" },
  switchButton: { marginTop: Spacing.four, alignItems: "center" },
  switchText: { fontSize: 14 },
});
