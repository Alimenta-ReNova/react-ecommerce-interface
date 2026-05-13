import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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

export default function AlertPreferences() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme as keyof typeof Colors];
  const storage = useSafeStorage();

  const [stockAlert, setStockAlert] = useState(true);
  const [expiryAlert, setExpiryAlert] = useState(true);

  const STORAGE_KEY_STOCK = "@renova:alert-stock";
  const STORAGE_KEY_EXPIRY = "@renova:alert-expiry";

  useEffect(() => {
    (async () => {
      try {
        const s = await storage.getItem(STORAGE_KEY_STOCK);
        const e = await storage.getItem(STORAGE_KEY_EXPIRY);
        if (s !== null) setStockAlert(s === "1");
        if (e !== null) setExpiryAlert(e === "1");
      } catch (err) {
        // ignore
      }
    })();
  }, [storage]);

  useEffect(() => {
    storage.setItem(STORAGE_KEY_STOCK, stockAlert ? "1" : "0");
  }, [stockAlert, storage]);

  useEffect(() => {
    storage.setItem(STORAGE_KEY_EXPIRY, expiryAlert ? "1" : "0");
  }, [expiryAlert, storage]);

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
        <Text style={[styles.title, { color: theme.text }]}>Alertas</Text>
        <View style={{ width: 45 }} />
      </View>

      <View style={styles.content}>
        <View
          style={[
            styles.settingRow,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <Text style={[styles.settingLabel, { color: theme.text }]}>
            Aviso de estoque baixo
          </Text>
          <Switch
            value={stockAlert}
            onValueChange={setStockAlert}
            trackColor={{ false: "#D9D9D9", true: "#8B735B" }}
            thumbColor={stockAlert ? theme.background : "#f4f3f4"}
          />
        </View>

        <View
          style={[
            styles.settingRow,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <Text style={[styles.settingLabel, { color: theme.text }]}>
            Notificação de validade
          </Text>
          <Switch
            value={expiryAlert}
            onValueChange={setExpiryAlert}
            trackColor={{ false: "#D9D9D9", true: "#8B735B" }}
            thumbColor={expiryAlert ? theme.background : "#f4f3f4"}
          />
        </View>

        <Text style={[styles.helperText, { color: theme.textSecondary }]}>
          Essas notificações ajudam o Alimenta ReNova a prever quando seus
          produtos naturais vão precisar de reposição.
        </Text>
        <TouchableOpacity
          style={[
            styles.moreButton,
            { backgroundColor: theme.backgroundElement },
          ]}
          onPress={() => router.push("/alert-details")}
        >
          <Text style={[styles.moreButtonText, { color: theme.text }]}>
            Mais opções
          </Text>
        </TouchableOpacity>
      </View>
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
  backBtn: { padding: 10, borderRadius: 12 },
  title: { fontSize: 24, fontWeight: "bold", fontFamily: "serif" },
  content: { padding: 20 },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingLabel: { fontSize: 16, fontWeight: "600", fontFamily: "serif" },
  helperText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    paddingHorizontal: 20,
  },
  moreButton: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  moreButtonText: { fontSize: 16, fontWeight: "700" },
});
