import { Feather, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../components/auth-context";
import BackHomeButton from "../components/back-home-button";
import { useTheme } from "../hooks/use-theme";

type PurchaseItem = {
  name: string;
  quantity: number;
};

type PurchaseRecord = {
  id: string;
  userEmail: string;
  createdAt: string;
  total: number;
  items: PurchaseItem[];
};

const mockPurchases: PurchaseRecord[] = [
  {
    id: "p-1001",
    userEmail: "ingrid.souza@furg.br",
    createdAt: "2026-04-20",
    total: 145.9,
    items: [
      { name: "Aveia", quantity: 2 },
      { name: "Granola", quantity: 1 },
      { name: "Mel", quantity: 1 },
    ],
  },
  {
    id: "p-1002",
    userEmail: "ingrid.souza@furg.br",
    createdAt: "2026-03-12",
    total: 89.2,
    items: [
      { name: "Castanha", quantity: 1 },
      { name: "Lentilha", quantity: 2 },
    ],
  },
  {
    id: "p-1003",
    userEmail: "cliente@renova.com",
    createdAt: "2026-05-03",
    total: 212.4,
    items: [
      { name: "Arroz", quantity: 3 },
      { name: "Feijão", quantity: 4 },
      { name: "Azeite", quantity: 1 },
    ],
  },
  {
    id: "p-1004",
    userEmail: "cliente@renova.com",
    createdAt: "2026-05-10",
    total: 154.7,
    items: [
      { name: "Chia", quantity: 2 },
      { name: "Aveia", quantity: 3 },
    ],
  },
];

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function BarChart({
  data,
  maxValue,
  theme,
}: {
  data: Array<{ label: string; value: number }>;
  maxValue: number;
  theme: any;
}) {
  return (
    <View style={styles.chartContainer}>
      {data.map((item) => (
        <View key={item.label} style={styles.barRow}>
          <Text style={[styles.barLabel, { color: theme.textSecondary }]}>
            {item.label}
          </Text>
          <View style={styles.barBackground}>
            <View
              style={[
                styles.bar,
                {
                  backgroundColor: theme.text,
                  width: `${Math.max((item.value / maxValue) * 100, 5)}%`,
                },
              ]}
            />
          </View>
          <Text style={[styles.barValue, { color: theme.text }]}>
            {formatCurrency(item.value)}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function AdminDashboardScreen() {
  const theme = useTheme();
  const { accounts } = useAuth();
  const users = accounts.filter((account) => account.role === "user");
  const totalRevenue = mockPurchases.reduce(
    (sum, purchase) => sum + purchase.total,
    0,
  );

  const purchasesByUser = users.map((user) => {
    const purchases = mockPurchases.filter(
      (purchase) =>
        purchase.userEmail.toLowerCase() === user.email.toLowerCase(),
    );

    return {
      user,
      purchases,
      totalSpent: purchases.reduce((sum, purchase) => sum + purchase.total, 0),
    };
  });

  const userChartData = purchasesByUser
    .filter((u) => u.totalSpent > 0)
    .map((u) => ({
      label: u.user.name.split(" ")[0],
      value: u.totalSpent,
    }));

  const maxUserSpent =
    userChartData.length > 0
      ? Math.max(...userChartData.map((d) => d.value))
      : 1;

  const monthlyData = [
    { label: "Março", value: 120.5 },
    { label: "Abril", value: 235.1 },
    { label: "Maio", value: 360.0 },
  ];

  const maxMonthly =
    monthlyData.length > 0 ? Math.max(...monthlyData.map((d) => d.value)) : 1;

  const stats = [
    { label: "Usuários", value: String(users.length), icon: "users" as const },
    {
      label: "Compras",
      value: String(mockPurchases.length),
      icon: "shopping-bag" as const,
    },
    {
      label: "Faturamento",
      value: formatCurrency(totalRevenue),
      icon: "dollar-sign" as const,
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
        <Text style={[styles.title, { color: theme.text }]}>Dashboard</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: theme.text }]}>
          <Text style={[styles.heroTitle, { color: theme.background }]}>
            Visão geral da operação
          </Text>
          <Text style={[styles.heroText, { color: theme.background }]}>
            Acompanhe usuários, compras e desempenho em tempo real.
          </Text>
        </View>

        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View
              key={stat.label}
              style={[
                styles.statCard,
                { backgroundColor: theme.backgroundElement },
              ]}
            >
              <View style={styles.statIconWrap}>
                <Feather name={stat.icon} size={18} color={theme.text} />
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.sectionCard,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Faturamento por cliente
          </Text>
          {userChartData.length > 0 ? (
            <BarChart
              data={userChartData}
              maxValue={maxUserSpent}
              theme={theme}
            />
          ) : (
            <Text style={[styles.emptyState, { color: theme.textSecondary }]}>
              Sem compras registradas.
            </Text>
          )}
        </View>

        <View
          style={[
            styles.sectionCard,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Tendência de compras
          </Text>
          <BarChart data={monthlyData} maxValue={maxMonthly} theme={theme} />
        </View>

        <View
          style={[
            styles.sectionCard,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Usuários cadastrados
          </Text>
          <Text
            style={[styles.sectionDescription, { color: theme.textSecondary }]}
          >
            Todos os clientes registrados no sistema.
          </Text>

          {users.map((user) => {
            const userPurchases = mockPurchases.filter(
              (p) => p.userEmail.toLowerCase() === user.email.toLowerCase(),
            );
            const userTotal = userPurchases.reduce((s, p) => s + p.total, 0);

            return (
              <View
                key={user.email}
                style={[styles.userCard, { backgroundColor: theme.background }]}
              >
                <View style={styles.userHeader}>
                  <View
                    style={[
                      styles.userAvatar,
                      { backgroundColor: user.photo ? "#E8D8B8" : "#D4A574" },
                    ]}
                  >
                    {user.photo ? (
                      <Text style={styles.photoPlaceholder}>
                        {user.photo.slice(0, 2)}
                      </Text>
                    ) : (
                      <FontAwesome name="user" size={20} color={theme.text} />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.userName, { color: theme.text }]}>
                      {user.name}
                    </Text>
                    <Text
                      style={[styles.userEmail, { color: theme.textSecondary }]}
                    >
                      {user.email}
                    </Text>
                  </View>
                  <View style={styles.userStats}>
                    <Text style={[styles.userStat, { color: theme.text }]}>
                      {userPurchases.length}
                    </Text>
                    <Text
                      style={[
                        styles.userStatLabel,
                        { color: theme.textSecondary },
                      ]}
                    >
                      compras
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.divider,
                    { backgroundColor: theme.textSecondary + "20" },
                  ]}
                />

                <View style={styles.userFooter}>
                  <Text
                    style={[
                      styles.userTotalLabel,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Total gasto
                  </Text>
                  <Text style={[styles.userTotalValue, { color: theme.text }]}>
                    {formatCurrency(userTotal)}
                  </Text>
                </View>
              </View>
            );
          })}

          {users.length === 0 && (
            <Text style={[styles.emptyState, { color: theme.textSecondary }]}>
              Nenhum usuário cadastrado.
            </Text>
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
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
  },
  content: { padding: 20, paddingBottom: 40, gap: 14 },
  hero: { borderRadius: 28, padding: 22, gap: 8 },
  heroTitle: { fontSize: 22, fontWeight: "bold", fontFamily: "serif" },
  heroText: { fontSize: 15, lineHeight: 21 },
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: { flex: 1, borderRadius: 18, padding: 14, gap: 8 },
  statIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8D8B8",
  },
  statValue: { fontSize: 18, fontWeight: "bold", fontFamily: "serif" },
  statLabel: { fontSize: 12, fontWeight: "600" },
  sectionCard: { borderRadius: 20, padding: 18, gap: 14 },
  sectionTitle: { fontSize: 18, fontWeight: "700", fontFamily: "serif" },
  sectionDescription: { fontSize: 14, lineHeight: 20 },
  chartContainer: { gap: 14 },
  barRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  barLabel: { width: 60, fontSize: 13, fontWeight: "600" },
  barBackground: {
    flex: 1,
    height: 24,
    backgroundColor: "#E8D8B8",
    borderRadius: 8,
    overflow: "hidden",
  },
  bar: { height: "100%", borderRadius: 8 },
  barValue: { width: 80, fontSize: 13, fontWeight: "700", textAlign: "right" },
  userCard: { borderRadius: 18, padding: 14, gap: 12, marginTop: 12 },
  userHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  photoPlaceholder: { fontSize: 14, fontWeight: "700", color: "#333" },
  userName: { fontSize: 15, fontWeight: "700" },
  userEmail: { fontSize: 13, marginTop: 2 },
  userStats: { alignItems: "center", gap: 2 },
  userStat: { fontSize: 16, fontWeight: "700", fontFamily: "serif" },
  userStatLabel: { fontSize: 11, fontWeight: "600" },
  divider: { height: 1 },
  userFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userTotalLabel: { fontSize: 13, fontWeight: "600" },
  userTotalValue: { fontSize: 16, fontWeight: "700", fontFamily: "serif" },
  emptyState: { fontSize: 14, marginTop: 8 },
});
