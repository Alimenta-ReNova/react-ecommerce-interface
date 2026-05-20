import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CatalogItem, useCatalog } from "../../components/catalog-context";
import Menu from "../../components/menu";
import { Colors, Fonts, Spacing } from "../../constants/theme";
import { useTheme } from "../../hooks/use-theme";

const ProductCard = ({ product }: { product: CatalogItem }) => (
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
  subtitle,
  products,
  theme,
  onPressCategory,
}: {
  title: string;
  subtitle: string;
  products: CatalogItem[];
  theme: any;
  onPressCategory: () => void;
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {title}
        </Text>
        <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
      <TouchableOpacity style={styles.arrowCircle} onPress={onPressCategory}>
        <Ionicons name="chevron-forward" size={16} color={theme.text} />
      </TouchableOpacity>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalScroll}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
      <TouchableOpacity style={styles.seeMoreArrow} onPress={onPressCategory}>
        <Ionicons name="chevron-forward" size={24} color={theme.text} />
      </TouchableOpacity>
    </ScrollView>
  </View>
);

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function Home() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const theme = useTheme();
  const { categories } = useCatalog();

  const filteredCategories = useMemo(() => {
    const query = normalizeText(searchQuery);

    if (!query) {
      return categories;
    }

    return categories
      .map((category) => {
        const matchedItems = category.items.filter((item) => {
          const searchableText = normalizeText(
            `${item.name} ${item.label} ${category.title} ${category.description}`,
          );

          return searchableText.includes(query);
        });

        return {
          ...category,
          items: matchedItems,
        };
      })
      .filter((category) => category.items.length > 0);
  }, [categories, searchQuery]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
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
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.input, { color: theme.text }]}
          />
          <Ionicons name="search" size={20} color={theme.text} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainScroll}
      >
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <ProductRow
              key={category.id}
              title={category.title}
              subtitle={category.description}
              products={category.items}
              theme={theme}
              onPressCategory={() => router.push("/categories")}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              Nenhum item encontrado
            </Text>
            <Text
              style={[styles.emptySubtitle, { color: theme.textSecondary }]}
            >
              Tente pesquisar por nome, categoria ou etiqueta.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
  emptyState: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: Fonts?.serif ?? "serif",
    textAlign: "center",
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
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
  sectionSubtitle: { fontSize: 13, marginTop: 2 },
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
