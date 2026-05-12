import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Menu from "../../components/menu";
import { Colors, Fonts, Spacing } from "../../constants/theme";

// 1. DEFINIÇÃO DO COMPONENTE (O nome deve ser exatamente ProductRow)
const ProductRow = ({ title, theme }: { title: string; theme: any }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
      <TouchableOpacity style={styles.arrowCircle}>
        <Ionicons name="chevron-forward" size={16} color={theme.text} />
      </TouchableOpacity>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalScroll}
    >
      {[1, 2, 3, 4].map((i) => (
        <View
          key={i}
          style={[styles.card, { backgroundColor: theme.backgroundElement }]}
        />
      ))}
      <TouchableOpacity style={styles.seeMoreArrow}>
        <Ionicons name="chevron-forward" size={24} color={theme.text} />
      </TouchableOpacity>
    </ScrollView>
  </View>
);

export default function Home() {
  const [menuVisible, setMenuVisible] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme as keyof typeof Colors];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Menu Lateral */}
      <Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />

      {/* Top Bar: Menu + Pesquisa */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.menuBtn, { backgroundColor: theme.backgroundElement }]}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="menu" size={24} color={theme.text} />
        </TouchableOpacity>

        <View
          style={[
            styles.searchBox,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <TextInput
            placeholder="Pesquisar"
            placeholderTextColor={theme.textSecondary}
            style={[styles.input, { color: theme.text }]}
          />
          <Ionicons name="search" size={20} color={theme.text} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainScroll}
      >
        {/* 2. USO DO COMPONENTE (Agora o nome bate com a definição acima) */}
        <ProductRow title="Selecionados" theme={theme} />
        <ProductRow title="Top's Recomendados" theme={theme} />
        <ProductRow title="Mais Vendidos" theme={theme} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Spacing.six / 2 },
  header: {
    flexDirection: "row",
    paddingHorizontal: Spacing.three,
    gap: 12,
    marginBottom: Spacing.three,
    alignItems: "center",
  },
  menuBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  input: { flex: 1, fontSize: 16, fontFamily: Fonts?.sans ?? "normal" },
  mainScroll: { paddingBottom: 100 },
  section: { marginBottom: Spacing.four },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.three,
    gap: 10,
    marginBottom: Spacing.one,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: Fonts?.serif ?? "serif",
    color: Colors.light.text,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.light.backgroundSelected,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalScroll: {
    paddingLeft: Spacing.three,
    paddingRight: Spacing.one,
    alignItems: "center",
  },
  card: {
    width: 132,
    height: 180,
    borderRadius: 20,
    marginRight: Spacing.two,
    backgroundColor: Colors.light.backgroundElement,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  seeMoreArrow: { padding: 10 },
});
