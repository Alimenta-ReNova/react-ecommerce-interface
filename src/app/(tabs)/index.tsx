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

interface Product {
  id: string;
  name: string;
  color: string;
  icon: string;
  label: string;
  labelColor: string;
}

const selecionadosProducts: Product[] = [
  {
    id: "s1",
    name: "Aveia",
    color: "#D4A574",
    icon: "leaf",
    label: "Orgânico",
    labelColor: "#6B5B4A",
  },
  {
    id: "s2",
    name: "Chia",
    color: "#A67B87",
    icon: "leaf",
    label: "Premium",
    labelColor: "#6B3E4E",
  },
  {
    id: "s3",
    name: "Linhaça",
    color: "#8B7355",
    icon: "leaf",
    label: "Natural",
    labelColor: "#5A4A3D",
  },
  {
    id: "s4",
    name: "Mel",
    color: "#D4AF6A",
    icon: "star",
    label: "Popular",
    labelColor: "#8B7355",
  },
];

const recomendadosProducts: Product[] = [
  {
    id: "r1",
    name: "Amendoim",
    color: "#B8860B",
    icon: "leaf",
    label: "Orgânico",
    labelColor: "#6B5B4A",
  },
  {
    id: "r2",
    name: "Granola",
    color: "#CD853F",
    icon: "leaf",
    label: "Premium",
    labelColor: "#6B3E4E",
  },
  {
    id: "r3",
    name: "Azeite",
    color: "#8B7355",
    icon: "leaf",
    label: "Natural",
    labelColor: "#5A4A3D",
  },
  {
    id: "r4",
    name: "Sementes",
    color: "#A0826D",
    icon: "star",
    label: "Premium",
    labelColor: "#6B5B4A",
  },
];

const maisVendidosProducts: Product[] = [
  {
    id: "m1",
    name: "Castanha",
    color: "#8B6914",
    icon: "leaf",
    label: "Orgânico",
    labelColor: "#5A4A3D",
  },
  {
    id: "m2",
    name: "Arroz",
    color: "#A68064",
    icon: "leaf",
    label: "Premium",
    labelColor: "#6B3E4E",
  },
  {
    id: "m3",
    name: "Feijão",
    color: "#654321",
    icon: "leaf",
    label: "Natural",
    labelColor: "#4A3A2D",
  },
  {
    id: "m4",
    name: "Lentilha",
    color: "#A0826D",
    icon: "star",
    label: "Popular",
    labelColor: "#6B5B4A",
  },
];

const ProductCard = ({ product, theme }: { product: Product; theme: any }) => (
  <TouchableOpacity style={[styles.card, { backgroundColor: product.color }]}>
    <View style={styles.cardContent}>
      <Ionicons
        name={product.icon as any}
        size={48}
        color="rgba(255,255,255,0.3)"
      />
      <Text style={styles.cardName}>{product.name}</Text>
      <View style={[styles.cardLabel, { backgroundColor: product.labelColor }]}>
        <Text style={styles.cardLabelText}>{product.label}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ProductRow = ({
  title,
  products,
  theme,
}: {
  title: string;
  products: Product[];
  theme: any;
}) => (
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
      {products.map((p) => (
        <ProductCard key={p.id} product={p} theme={theme} />
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
        <ProductRow
          title="Selecionados"
          products={selecionadosProducts}
          theme={theme}
        />
        <ProductRow
          title="Top's Recomendados"
          products={recomendadosProducts}
          theme={theme}
        />
        <ProductRow
          title="Mais Vendidos"
          products={maisVendidosProducts}
          theme={theme}
        />
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
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  cardName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
    marginTop: 8,
    textAlign: "center",
  },
  cardLabel: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 10,
  },
  cardLabelText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },
  seeMoreArrow: { padding: 10 },
});
