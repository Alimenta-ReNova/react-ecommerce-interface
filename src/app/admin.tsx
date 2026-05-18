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
import { useCatalog } from "../components/catalog-context";
import BackHomeButton from "../components/back-home-button";
import { useTheme } from "../hooks/use-theme";

export default function AdminScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { isAuthenticated, isLoading, role, signOut } = useAuth();
  const { categories } = useCatalog();
  const totalItems = categories.reduce(
    (sum, category) => sum + category.items.length,
    0,
  );

  const adminCards = [
    { title: "Usuários ativos", value: "128", icon: "users" as const },
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
