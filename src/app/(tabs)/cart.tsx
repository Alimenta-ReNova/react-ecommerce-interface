import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHomeButton from "../../components/back-home-button";
import { useTheme } from "../../hooks/use-theme";

// O segredo está aqui: EXPORT DEFAULT
export default function CartScreen() {
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
        <Text style={[styles.title, { color: theme.text }]}>Meu Carrinho</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.container}>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
          Seu carrinho está vazio no momento.
        </Text>
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
    paddingTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});
