import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHomeButton from "../../components/back-home-button";
import { useTheme } from "../../hooks/use-theme";

type PurchaseItem = {
  id: string;
  date: string;
  total: number;
  items: number;
  status: "completed" | "pending" | "cancelled";
};

const mockPurchases: PurchaseItem[] = [
  {
    id: "1",
    date: "15 Maio 2026",
    total: 145.9,
    items: 5,
    status: "completed",
  },
  {
    id: "2",
    date: "10 Maio 2026",
    total: 89.5,
    items: 3,
    status: "completed",
  },
  {
    id: "3",
    date: "5 Maio 2026",
    total: 234.8,
    items: 8,
    status: "completed",
  },
  {
    id: "4",
    date: "28 Abril 2026",
    total: 67.2,
    items: 2,
    status: "completed",
  },
  {
    id: "5",
    date: "20 Abril 2026",
    total: 156.4,
    items: 6,
    status: "completed",
  },
];

function getStatusLabel(status: string): string {
  return status === "completed"
    ? "Entregue"
    : status === "pending"
      ? "Pendente"
      : "Cancelado";
}

function getStatusColor(status: string, theme: any): string {
  return status === "completed"
    ? "#6B7340"
    : status === "pending"
      ? "#C4A747"
      : "#A69080";
}

export default function History() {
  const theme = useTheme();

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
          Histórico de Compras
        </Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {mockPurchases.map((purchase) => (
          <TouchableOpacity
            key={purchase.id}
            style={[
              styles.purchaseCard,
              { backgroundColor: theme.backgroundElement },
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.cardDate, { color: theme.text }]}>
                  {purchase.date}
                </Text>
                <Text
                  style={[styles.cardItems, { color: theme.textSecondary }]}
                >
                  {purchase.items} produto{purchase.items > 1 ? "s" : ""}
                </Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={[styles.cardTotal, { color: theme.text }]}>
                  R$ {purchase.total.toFixed(2)}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        getStatusColor(purchase.status, theme) + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(purchase.status, theme) },
                    ]}
                  >
                    {getStatusLabel(purchase.status)}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.backgroundSelected },
              ]}
            />

            <View style={styles.cardFooter}>
              <Ionicons
                name="receipt-outline"
                size={16}
                color={theme.textSecondary}
              />
              <Text
                style={[styles.detailsLink, { color: theme.textSecondary }]}
              >
                Ver detalhes
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={theme.textSecondary}
              />
            </View>
          </TouchableOpacity>
        ))}

        {mockPurchases.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons
              name="cart-outline"
              size={48}
              color={theme.textSecondary}
            />
            <Text
              style={[styles.emptyStateText, { color: theme.textSecondary }]}
            >
              Nenhuma compra realizada
            </Text>
          </View>
        )}
      </ScrollView>
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
  title: { fontSize: 24, fontWeight: "bold", fontFamily: "serif" },
  content: { padding: 20, paddingBottom: 100 },
  purchaseCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardDate: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  cardItems: { fontSize: 13, fontWeight: "500" },
  cardRight: { alignItems: "flex-end" },
  cardTotal: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: "600" },
  divider: { height: 1, marginVertical: 12 },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailsLink: { fontSize: 13, fontWeight: "600", flex: 1 },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateText: { fontSize: 16, marginTop: 12, fontWeight: "500" },
});
