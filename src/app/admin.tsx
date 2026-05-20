import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../components/auth-context";
import BackHomeButton from "../components/back-home-button";
import { useCatalog } from "../components/catalog-context";
import { useTheme } from "../hooks/use-theme";

type AdminAction = {
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  href: string;
};

export default function AdminScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { accounts, isAuthenticated, isLoading, role, signOut } = useAuth();
  const { categories } = useCatalog();

  const users = accounts.filter((account) => account.role === "user");
  const totalItems = categories.reduce(
    (sum, category) => sum + category.items.length,
    0,
  );

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

  const actions: AdminAction[] = [
    {
      title: "Cadastro de usuários",
      description: "Criar novas contas de clientes e revendedores.",
      icon: "user-plus",
      href: "/admin-users",
    },
    {
      title: "Cadastro de estoque / catálogo",
      description: "Adicionar e editar categorias e itens do catálogo.",
      icon: "archive",
      href: "/categories",
    },
    {
      title: "Dashboard",
      description: "Ver usuários, compras e itens mais comprados.",
      icon: "bar-chart-2",
      href: "/admin-dashboard",
    },
  ];

  const stats = [
    { title: "Usuários", value: String(users.length), icon: "users" as const },
    {
      title: "Categorias",
      value: String(categories.length),
      icon: "grid" as const,
    },
    {
      title: "Itens",
      value: String(totalItems),
      icon: "package" as const,
    },
  ];

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
            Admin
          </Text>
          <Text style={[styles.title, { color: theme.text }]}>Painel</Text>
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
            Gestão administrativa
          </Text>
          <Text style={[styles.heroText, { color: theme.background }]}>
            Escolha o atalho que quer usar para cadastrar usuários, manter o
            catálogo ou acompanhar a operação.
          </Text>
        </View>

        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View
              key={stat.title}
              style={[
                styles.statCard,
                { backgroundColor: theme.backgroundElement },
              ]}
            >
              <View style={styles.statIconWrap}>
                <Feather name={stat.icon} size={20} color={theme.text} />
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {stat.title}
              </Text>
            </View>
          ))}
        </View>

        {actions.map((action) => (
          <TouchableOpacity
            key={action.title}
            style={[
              styles.actionCard,
              { backgroundColor: theme.backgroundElement },
            ]}
            onPress={() => router.push(action.href as any)}
          >
            <View style={styles.actionIconWrap}>
              <Feather name={action.icon} size={22} color={theme.text} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.actionTitle, { color: theme.text }]}>
                {action.title}
              </Text>
              <Text
                style={[
                  styles.actionDescription,
                  { color: theme.textSecondary },
                ]}
              >
                {action.description}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        ))}

        <View
          style={[styles.notice, { backgroundColor: theme.backgroundElement }]}
        >
          <Text style={[styles.noticeTitle, { color: theme.text }]}>
            Resumo rápido
          </Text>
          <Text style={[styles.noticeText, { color: theme.textSecondary }]}>
            O cadastro de usuários foi separado em uma tela própria, e o
            catálogo continua na tela de categorias para edição do estoque.
          </Text>
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
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: { flex: 1, borderRadius: 18, padding: 14, gap: 8 },
  statIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8D8B8",
  },
  statValue: { fontSize: 22, fontWeight: "bold", fontFamily: "serif" },
  statLabel: { fontSize: 12, fontWeight: "600" },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 20,
    padding: 18,
  },
  actionIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8D8B8",
  },
  actionTitle: { fontSize: 16, fontWeight: "700" },
  actionDescription: { fontSize: 13, lineHeight: 18, marginTop: 3 },
  notice: { borderRadius: 20, padding: 18 },
  noticeTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "serif",
    marginBottom: 6,
  },
  noticeText: { fontSize: 14, lineHeight: 20 },
});
