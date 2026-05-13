import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";
import { useSafeStorage } from "../hooks/use-safe-storage";

export default function AlertDetails() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme as keyof typeof Colors];
  const storage = useSafeStorage();

  const [advanceDays, setAdvanceDays] = useState(3);
  const [remindToggle, setRemindToggle] = useState(true);
  const [avoidSpamToggle, setAvoidSpamToggle] = useState(false);

  const products = [
    {
      id: "p1",
      name: "Aveia Integral",
      subtitle: "Ciclo 30 dias",
      enabled: true,
    },
    {
      id: "p2",
      name: "Chia Orgânica",
      subtitle: "Ciclo 21 dias",
      enabled: false,
    },
    {
      id: "p3",
      name: "Linhaça Dourada",
      subtitle: "Ciclo 30 dias",
      enabled: true,
    },
    {
      id: "p4",
      name: "Quinoa",
      subtitle: "Sem compras recentes",
      enabled: false,
    },
  ];

  const [productStates, setProductStates] = useState(
    Object.fromEntries(products.map((p) => [p.id, p.enabled])),
  );

  const KEY_ADVANCE = "@renova:alerts-advance";
  const KEY_REMIND = "@renova:alerts-remind";
  const KEY_AVOID = "@renova:alerts-avoid";
  const KEY_PRODUCTS = "@renova:alerts-products";

  useEffect(() => {
    (async () => {
      try {
        const a = await storage.getItem(KEY_ADVANCE);
        const r = await storage.getItem(KEY_REMIND);
        const v = await storage.getItem(KEY_AVOID);
        const p = await storage.getItem(KEY_PRODUCTS);
        if (a) setAdvanceDays(Number(a));
        if (r) setRemindToggle(r === "1");
        if (v) setAvoidSpamToggle(v === "1");
        if (p) {
          const parsed = JSON.parse(p);
          setProductStates((s) => ({ ...s, ...parsed }));
        }
      } catch {
        // ignore
      }
    })();
  }, [storage]);

  useEffect(() => {
    storage.setItem(KEY_ADVANCE, String(advanceDays));
  }, [advanceDays, storage]);
  useEffect(() => {
    storage.setItem(KEY_REMIND, remindToggle ? "1" : "0");
  }, [remindToggle, storage]);
  useEffect(() => {
    storage.setItem(KEY_AVOID, avoidSpamToggle ? "1" : "0");
  }, [avoidSpamToggle, storage]);
  useEffect(() => {
    storage.setItem(KEY_PRODUCTS, JSON.stringify(productStates));
  }, [productStates, storage]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: theme.backgroundElement }]}
        >
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>
          Detalhes das Notificações
        </Text>
        <View style={{ width: 45 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Antecedência do Aviso
        </Text>
        <View style={styles.chipsRow}>
          {[1, 3, 5, 7].map((d) => (
            <TouchableOpacity
              key={d}
              onPress={() => setAdvanceDays(d)}
              style={[styles.chip, advanceDays === d && styles.chipActive]}
            >
              <Text
                style={
                  advanceDays === d ? styles.chipTextActive : styles.chipText
                }
              >
                {d} dia{d > 1 ? "s" : ""}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Repetir Aviso
        </Text>
        <View
          style={[
            styles.optionCard,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={[styles.optionTitle, { color: theme.text }]}>
                Lembrete se ignorado
              </Text>
              <Text
                style={[styles.optionSubtitle, { color: theme.textSecondary }]}
              >
                Reenvio após 24h sem ação
              </Text>
            </View>
            <Switch
              value={remindToggle}
              onValueChange={setRemindToggle}
              trackColor={{ false: "#D9D9D9", true: "#8B735B" }}
              thumbColor={remindToggle ? theme.background : "#f4f3f4"}
            />
          </View>
        </View>

        <View
          style={[
            styles.optionCard,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={[styles.optionTitle, { color: theme.text }]}>
                Parar após 2 reenvios
              </Text>
              <Text
                style={[styles.optionSubtitle, { color: theme.textSecondary }]}
              >
                Evitar spam ao cliente
              </Text>
            </View>
            <Switch
              value={avoidSpamToggle}
              onValueChange={setAvoidSpamToggle}
              trackColor={{ false: "#D9D9D9", true: "#8B735B" }}
              thumbColor={avoidSpamToggle ? theme.background : "#f4f3f4"}
            />
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Meus Produtos
        </Text>
        {products.map((p) => (
          <View
            key={p.id}
            style={[
              styles.productRow,
              { backgroundColor: theme.backgroundElement },
            ]}
          >
            <View>
              <Text style={[styles.productName, { color: theme.text }]}>
                {p.name}
              </Text>
              <Text
                style={[styles.productSubtitle, { color: theme.textSecondary }]}
              >
                {p.subtitle}
              </Text>
            </View>
            <Switch
              value={!!productStates[p.id]}
              onValueChange={(val) =>
                setProductStates((s) => ({ ...s, [p.id]: val }))
              }
              trackColor={{ false: "#D9D9D9", true: "#8B735B" }}
              thumbColor={productStates[p.id] ? theme.background : "#f4f3f4"}
            />
          </View>
        ))}

        <View style={{ height: 40 }} />
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
    marginBottom: 10,
  },
  backBtn: { padding: 10, borderRadius: 12 },
  title: { fontSize: 20, fontWeight: "700" },
  container: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  chipsRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#EDE6DF",
    marginRight: 10,
  },
  chipActive: { backgroundColor: "#8B735B" },
  chipText: { color: "#5A4B47", fontWeight: "600" },
  chipTextActive: { color: "#fff", fontWeight: "700" },
  optionCard: { padding: 14, borderRadius: 12, marginBottom: 12 },
  optionTitle: { fontSize: 15, fontWeight: "700" },
  optionSubtitle: { fontSize: 12, marginTop: 4 },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  productName: { fontSize: 15, fontWeight: "700" },
  productSubtitle: { fontSize: 12, marginTop: 4 },
});
