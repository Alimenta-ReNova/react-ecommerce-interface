import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../components/auth-context";
import { Colors } from "../constants/theme";

const adminCards = [
  { title: "Usuários ativos", value: "128", icon: "users" as const },
  { title: "Produtos cadastrados", value: "56", icon: "package" as const },
  { title: "Alertas pendentes", value: "9", icon: "bell" as const },
];

export default function AdminScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme as keyof typeof Colors];
  const { isAuthenticated, isLoading, role, signOut } = useAuth();

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
        <View>
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
            Separação de acesso
          </Text>
          <Text style={[styles.heroText, { color: theme.background }]}>
            O login agora distingue usuário comum e administrador.
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
            Próximos controles
          </Text>
          <Text style={[styles.noticeText, { color: theme.textSecondary }]}>
            Aqui você pode ligar as telas de gestão de usuários, produtos e
            relatórios quando quiser ampliar o painel.
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
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
});
