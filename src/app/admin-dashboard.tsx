import { Feather } from "@expo/vector-icons";
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

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
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

  const itemRanking = mockPurchases.reduce<Record<string, number>>(
    (acc, purchase) => {
      purchase.items.forEach((item) => {
        acc[item.name] = (acc[item.name] ?? 0) + item.quantity;
      });
      return acc;
    },
    {},
  );

  const topItems = Object.entries(itemRanking)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 5)
    .map(([name, quantity]) => ({ name, quantity }));

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
            Acompanhe os usuários cadastrados, o histórico das compras e os
            itens mais comprados em um único lugar.
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
            Itens mais comprados
          </Text>
          {topItems.map((item, index) => (
            <View key={item.name} style={styles.rankingRow}>
              <Text
                style={[styles.rankingIndex, { color: theme.textSecondary }]}
              >
                {index + 1}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.rankingName, { color: theme.text }]}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.rankingMeta, { color: theme.textSecondary }]}
                >
                  {item.quantity} unidades vendidas
                </Text>
              </View>
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
            Usuários e compras
          </Text>
          <Text
            style={[styles.sectionDescription, { color: theme.textSecondary }]}
          >
            Cada usuário aparece com seus pedidos registrados e o total gasto.
          </Text>

          {purchasesByUser.map(({ user, purchases, totalSpent }) => (
            <View
              key={user.email}
              style={[styles.userCard, { backgroundColor: theme.background }]}
            >
              <View style={styles.userHeader}>
                <View style={styles.userAvatar}>
                  <Feather name="user" size={18} color={theme.text} />
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
                <Text style={[styles.userTotal, { color: theme.text }]}>
                  {formatCurrency(totalSpent)}
                </Text>
              </View>

              {purchases.length > 0 ? (
                purchases.map((purchase) => (
                  <View key={purchase.id} style={styles.purchaseRow}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.purchaseDate,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {formatDate(purchase.createdAt)}
                      </Text>
                      <Text style={[styles.purchaseId, { color: theme.text }]}>
                        Pedido {purchase.id}
                      </Text>
                      <Text
                        style={[
                          styles.purchaseItems,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {purchase.items
                          .map((item) => `${item.name} x${item.quantity}`)
                          .join(" · ")}
                      </Text>
                    </View>
                    <Text style={[styles.purchaseTotal, { color: theme.text }]}>
                      {formatCurrency(purchase.total)}
                    </Text>
                  </View>
                ))
              ) : (
                <Text
                  style={[
                    styles.emptyPurchases,
                    { color: theme.textSecondary },
                  ]}
                >
                  Nenhuma compra registrada para este usuário.
                </Text>
              )}
            </View>
          ))}
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
  rankingRow: { flexDirection: "row", gap: 12, alignItems: "center" },
  rankingIndex: { width: 24, fontSize: 14, fontWeight: "700" },
  rankingName: { fontSize: 15, fontWeight: "700" },
  rankingMeta: { fontSize: 13, marginTop: 2 },
  userCard: { borderRadius: 18, padding: 14, gap: 12 },
  userHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E8D8B8",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: { fontSize: 15, fontWeight: "700" },
  userEmail: { fontSize: 13, marginTop: 2 },
  userTotal: { fontSize: 14, fontWeight: "700" },
  purchaseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.08)",
  },
  purchaseDate: { fontSize: 12, fontWeight: "600" },
  purchaseId: { fontSize: 14, fontWeight: "700", marginTop: 2 },
  purchaseItems: { fontSize: 13, marginTop: 3, lineHeight: 18 },
  purchaseTotal: { fontSize: 14, fontWeight: "700", alignSelf: "center" },
  emptyPurchases: { fontSize: 13 },
});
