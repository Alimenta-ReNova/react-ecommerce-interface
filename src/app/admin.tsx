import { Feather, Ionicons } from "@expo/vector-icons";
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
import { useCatalog } from "../components/catalog-context";
import { useTheme } from "../hooks/use-theme";

export default function AdminScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { accounts, isAuthenticated, isLoading, registerUser, role, signOut } =
    useAuth();
  const { categories } = useCatalog();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const [formSuccess, setFormSuccess] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const totalItems = categories.reduce(
    (sum, category) => sum + category.items.length,
    0,
  );
  const users = accounts.filter((account) => account.role === "user");

  const adminCards = [
    {
      title: "Usuários cadastrados",
      value: String(users.length),
      icon: "users" as const,
    },
    {
      title: "Categorias cadastradas",
      value: String(categories.length),
      icon: "grid" as const,
    },
    {
      title: "Itens em estoque",
      value: String(totalItems),
      icon: "package" as const,
    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated || role !== "admin") {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, role, router]);

  if (isLoading || !isAuthenticated || role !== "admin") {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

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

        <View style={styles.headerCenter}>
          <Text style={[styles.kicker, { color: theme.textSecondary }]}>
            Painel de controle
          </Text>
          <Text style={[styles.title, { color: theme.text }]}>Admin</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.logoutBtn,
            { backgroundColor: theme.backgroundElement },
          ]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: theme.text }]}>
          <Text style={[styles.heroTitle, { color: theme.background }]}>
            Painel de estoque e usuários
          </Text>
          <Text style={[styles.heroText, { color: theme.background }]}>
            Interface administrativa focada em controle de usuários, categorias
            e itens disponíveis no catálogo público.
          </Text>
        </View>

        {adminCards.map((card) => (
          <View
            key={card.title}
            style={[styles.card, { backgroundColor: theme.backgroundElement }]}
          >
            <View style={styles.cardIconWrap}>
              <Feather name={card.icon} size={22} color={theme.text} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {card.title}
              </Text>
              <Text style={[styles.cardValue, { color: theme.textSecondary }]}>
                {card.value}
              </Text>
            </View>
          </View>
        ))}

        <View
          style={[
            styles.formCard,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Cadastrar usuário
          </Text>
          <Text style={[styles.sectionText, { color: theme.textSecondary }]}>
            Crie novas contas de cliente sem sair do painel administrativo.
          </Text>

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
            {users.length > 0
              ? "As contas criadas pelo admin ficam disponíveis no login imediatamente."
              : "Nenhum usuário foi cadastrado ainda."}
          </Text>

          {users.slice(0, 3).map((user) => (
            <View key={user.email} style={styles.userRow}>
              <View style={styles.userAvatar}>
                <Feather name="user" size={18} color={theme.text} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.userName, { color: theme.text }]}>
                  {user.name}
                </Text>
                <Text style={[styles.userMeta, { color: theme.textSecondary }]}>
                  {user.email}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={[styles.notice, { backgroundColor: theme.backgroundElement }]}
        >
          <Text style={[styles.noticeTitle, { color: theme.text }]}>
            Gerenciamento do catálogo
          </Text>
          <Text style={[styles.noticeText, { color: theme.textSecondary }]}>
            As categorias e os itens visíveis para visitantes e clientes ficam
            centralizados na tela pública de catálogo.
          </Text>
          <TouchableOpacity
            style={[styles.noticeButton, { backgroundColor: theme.text }]}
            onPress={() => router.push("/categories")}
          >
            <Text
              style={[styles.noticeButtonText, { color: theme.background }]}
            >
              Abrir catálogo
            </Text>
          </TouchableOpacity>
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
  headerCenter: { flex: 1, alignItems: "center" },
  kicker: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "serif",
    marginTop: 4,
  },
  logoutBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  content: { padding: 20, paddingBottom: 40, gap: 14 },
  hero: { borderRadius: 28, padding: 22, gap: 8 },
  heroTitle: { fontSize: 22, fontWeight: "bold", fontFamily: "serif" },
  heroText: { fontSize: 15, lineHeight: 21 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderRadius: 20,
    padding: 16,
  },
  cardIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8D8B8",
  },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 3,
    fontFamily: "serif",
  },
  formCard: { borderRadius: 20, padding: 18, gap: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "700", fontFamily: "serif" },
  sectionText: { fontSize: 14, lineHeight: 20 },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 16,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
  },
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
  notice: { borderRadius: 20, padding: 18, marginTop: 8 },
  noticeTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "serif",
    marginBottom: 6,
  },
  noticeText: { fontSize: 14, lineHeight: 20 },
  noticeButton: {
    marginTop: 14,
    borderRadius: 14,
    minHeight: 46,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  noticeButtonText: { fontSize: 14, fontWeight: "700" },
});
