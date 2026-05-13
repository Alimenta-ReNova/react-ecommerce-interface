import { Feather, Ionicons } from "@expo/vector-icons";
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
import BackHomeButton from "../components/back-home-button";
import { useAuth } from "../components/auth-context";
import {
  CatalogCategory,
  CatalogItem,
  useCatalog,
} from "../components/catalog-context";
import { useTheme } from "../hooks/use-theme";

const emptyItemDraft = {
  name: "",
  color: "#D4A574",
  icon: "leaf",
  label: "Novo",
  labelColor: "#6B5B4A",
};

function ItemPreview({ item }: { item: CatalogItem }) {
  return (
    <View style={[styles.itemPreview, { backgroundColor: item.color }]}>
      <Ionicons
        name={item.icon as any}
        size={24}
        color="rgba(255,255,255,0.55)"
      />
      <Text style={styles.itemPreviewName}>{item.name}</Text>
      <View
        style={[styles.itemPreviewTag, { backgroundColor: item.labelColor }]}
      >
        <Text style={styles.itemPreviewTagText}>{item.label}</Text>
      </View>
    </View>
  );
}

function CategoryPanel({
  category,
  theme,
  isAdmin,
  onUpdateCategory,
  onDeleteCategory,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}: {
  category: CatalogCategory;
  theme: ReturnType<typeof useTheme>;
  isAdmin: boolean;
  onUpdateCategory: (
    categoryId: string,
    patch: Partial<Omit<CatalogCategory, "id" | "items">>,
  ) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddItem: (categoryId: string, item: Omit<CatalogItem, "id">) => void;
  onUpdateItem: (
    categoryId: string,
    itemId: string,
    patch: Partial<Omit<CatalogItem, "id">>,
  ) => void;
  onDeleteItem: (categoryId: string, itemId: string) => void;
}) {
  const [draft, setDraft] = useState({ ...emptyItemDraft });

  return (
    <View
      style={[
        styles.categoryCard,
        { backgroundColor: theme.backgroundElement },
      ]}
    >
      <View style={styles.categoryHeader}>
        <View
          style={[
            styles.categorySwatch,
            { backgroundColor: category.accentColor },
          ]}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.categoryTitle, { color: theme.text }]}>
            {category.title}
          </Text>
          <Text
            style={[styles.categoryDescription, { color: theme.textSecondary }]}
          >
            {category.description}
          </Text>
        </View>
        <Text style={[styles.countBadge, { color: theme.text }]}>
          {category.items.length} itens
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemPreviewRow}
      >
        {category.items.map((item) => (
          <ItemPreview key={item.id} item={item} />
        ))}
      </ScrollView>

      {isAdmin && (
        <View style={styles.adminBlock}>
          <View style={styles.rowInputs}>
            <TextInput
              value={category.title}
              onChangeText={(text) =>
                onUpdateCategory(category.id, { title: text })
              }
              style={[
                styles.input,
                styles.flexInput,
                { color: theme.text, backgroundColor: theme.background },
              ]}
              placeholder="Nome da categoria"
              placeholderTextColor={theme.textSecondary}
            />
            <TextInput
              value={category.accentColor}
              onChangeText={(text) =>
                onUpdateCategory(category.id, { accentColor: text })
              }
              style={[
                styles.input,
                styles.colorInput,
                { color: theme.text, backgroundColor: theme.background },
              ]}
              placeholder="#D4A574"
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="characters"
            />
          </View>

          <TextInput
            value={category.description}
            onChangeText={(text) =>
              onUpdateCategory(category.id, { description: text })
            }
            style={[
              styles.input,
              { color: theme.text, backgroundColor: theme.background },
            ]}
            placeholder="Descrição da categoria"
            placeholderTextColor={theme.textSecondary}
          />

          <TouchableOpacity
            style={[styles.deleteButton, { borderColor: "#D92D20" }]}
            onPress={() => onDeleteCategory(category.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#D92D20" />
            <Text style={styles.deleteButtonText}>Excluir categoria</Text>
          </TouchableOpacity>

          <Text style={[styles.subsectionTitle, { color: theme.text }]}>
            Novo item
          </Text>
          <View style={styles.rowInputs}>
            <TextInput
              value={draft.name}
              onChangeText={(text) =>
                setDraft((current) => ({ ...current, name: text }))
              }
              style={[
                styles.input,
                styles.flexInput,
                { color: theme.text, backgroundColor: theme.background },
              ]}
              placeholder="Nome do item"
              placeholderTextColor={theme.textSecondary}
            />
            <TextInput
              value={draft.icon}
              onChangeText={(text) =>
                setDraft((current) => ({ ...current, icon: text }))
              }
              style={[
                styles.input,
                styles.iconInput,
                { color: theme.text, backgroundColor: theme.background },
              ]}
              placeholder="leaf"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={styles.rowInputs}>
            <TextInput
              value={draft.label}
              onChangeText={(text) =>
                setDraft((current) => ({ ...current, label: text }))
              }
              style={[
                styles.input,
                styles.flexInput,
                { color: theme.text, backgroundColor: theme.background },
              ]}
              placeholder="Etiqueta"
              placeholderTextColor={theme.textSecondary}
            />
            <TextInput
              value={draft.color}
              onChangeText={(text) =>
                setDraft((current) => ({ ...current, color: text }))
              }
              style={[
                styles.input,
                styles.colorInput,
                { color: theme.text, backgroundColor: theme.background },
              ]}
              placeholder="#D4A574"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={styles.rowInputs}>
            <TextInput
              value={draft.labelColor}
              onChangeText={(text) =>
                setDraft((current) => ({ ...current, labelColor: text }))
              }
              style={[
                styles.input,
                styles.flexInput,
                { color: theme.text, backgroundColor: theme.background },
              ]}
              placeholder="#6B5B4A"
              placeholderTextColor={theme.textSecondary}
            />
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: theme.text }]}
              onPress={() => {
                if (!draft.name.trim()) {
                  return;
                }

                onAddItem(category.id, {
                  name: draft.name.trim(),
                  color: draft.color.trim() || "#D4A574",
                  icon: draft.icon.trim() || "leaf",
                  label: draft.label.trim() || "Novo",
                  labelColor: draft.labelColor.trim() || "#6B5B4A",
                });

                setDraft({ ...emptyItemDraft });
              }}
            >
              <Text
                style={[styles.primaryButtonText, { color: theme.background }]}
              >
                Adicionar item
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.adminItemList}>
            {category.items.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.adminItemCard,
                  { borderColor: theme.backgroundSelected },
                ]}
              >
                <View style={styles.rowInputs}>
                  <TextInput
                    value={item.name}
                    onChangeText={(text) =>
                      onUpdateItem(category.id, item.id, { name: text })
                    }
                    style={[
                      styles.input,
                      styles.flexInput,
                      { color: theme.text, backgroundColor: theme.background },
                    ]}
                    placeholder="Nome"
                    placeholderTextColor={theme.textSecondary}
                  />
                  <TextInput
                    value={item.icon}
                    onChangeText={(text) =>
                      onUpdateItem(category.id, item.id, { icon: text })
                    }
                    style={[
                      styles.input,
                      styles.iconInput,
                      { color: theme.text, backgroundColor: theme.background },
                    ]}
                    placeholder="leaf"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>

                <View style={styles.rowInputs}>
                  <TextInput
                    value={item.label}
                    onChangeText={(text) =>
                      onUpdateItem(category.id, item.id, { label: text })
                    }
                    style={[
                      styles.input,
                      styles.flexInput,
                      { color: theme.text, backgroundColor: theme.background },
                    ]}
                    placeholder="Etiqueta"
                    placeholderTextColor={theme.textSecondary}
                  />
                  <TextInput
                    value={item.color}
                    onChangeText={(text) =>
                      onUpdateItem(category.id, item.id, { color: text })
                    }
                    style={[
                      styles.input,
                      styles.colorInput,
                      { color: theme.text, backgroundColor: theme.background },
                    ]}
                    placeholder="#D4A574"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>

                <View style={styles.rowInputs}>
                  <TextInput
                    value={item.labelColor}
                    onChangeText={(text) =>
                      onUpdateItem(category.id, item.id, { labelColor: text })
                    }
                    style={[
                      styles.input,
                      styles.flexInput,
                      { color: theme.text, backgroundColor: theme.background },
                    ]}
                    placeholder="#6B5B4A"
                    placeholderTextColor={theme.textSecondary}
                  />
                  <TouchableOpacity
                    style={styles.deleteItemButton}
                    onPress={() => onDeleteItem(category.id, item.id)}
                  >
                    <Feather name="trash-2" size={16} color="#D92D20" />
                    <Text style={styles.deleteButtonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

export default function CategoriesScreen() {
  const theme = useTheme();
  const { role } = useAuth();
  const {
    categories,
    isLoading,
    addCategory,
    updateCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem,
  } = useCatalog();

  const isAdmin = role === "admin";
  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
    accentColor: "#D4A574",
  });

  const catalogSize = useMemo(
    () => categories.reduce((sum, category) => sum + category.items.length, 0),
    [categories],
  );

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <BackHomeButton
          backgroundColor={theme.backgroundElement}
          iconColor={theme.text}
        />
        <View style={styles.headerCenter}>
          <Text style={[styles.kicker, { color: theme.textSecondary }]}>
            Catálogo público
          </Text>
          <Text style={[styles.title, { color: theme.text }]}>Categorias</Text>
        </View>
        <View
          style={[
            styles.headerBadge,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <Ionicons
            name={isAdmin ? "shield-checkmark" : "eye-outline"}
            size={18}
            color={theme.text}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: theme.text }]}>
          <Text style={[styles.heroTitle, { color: theme.background }]}>
            Visível para todos
          </Text>
          <Text style={[styles.heroText, { color: theme.background }]}>
            As categorias e os itens abaixo aparecem para visitantes e clientes
            logados. Somente o perfil admin pode alterar este catálogo.
          </Text>
          <View style={styles.heroStats}>
            <View>
              <Text style={[styles.heroStatValue, { color: theme.background }]}>
                {categories.length}
              </Text>
              <Text style={[styles.heroStatLabel, { color: theme.background }]}>
                categorias
              </Text>
            </View>
            <View>
              <Text style={[styles.heroStatValue, { color: theme.background }]}>
                {catalogSize}
              </Text>
              <Text style={[styles.heroStatLabel, { color: theme.background }]}>
                itens
              </Text>
            </View>
          </View>
        </View>

        {isAdmin && (
          <View
            style={[
              styles.adminComposer,
              { backgroundColor: theme.backgroundElement },
            ]}
          >
            <Text style={[styles.subsectionTitle, { color: theme.text }]}>
              Nova categoria
            </Text>
            <View style={styles.rowInputs}>
              <TextInput
                value={newCategory.title}
                onChangeText={(text) =>
                  setNewCategory((current) => ({ ...current, title: text }))
                }
                style={[
                  styles.input,
                  styles.flexInput,
                  { color: theme.text, backgroundColor: theme.background },
                ]}
                placeholder="Nome da categoria"
                placeholderTextColor={theme.textSecondary}
              />
              <TextInput
                value={newCategory.accentColor}
                onChangeText={(text) =>
                  setNewCategory((current) => ({
                    ...current,
                    accentColor: text,
                  }))
                }
                style={[
                  styles.input,
                  styles.colorInput,
                  { color: theme.text, backgroundColor: theme.background },
                ]}
                placeholder="#D4A574"
                placeholderTextColor={theme.textSecondary}
              />
            </View>
            <TextInput
              value={newCategory.description}
              onChangeText={(text) =>
                setNewCategory((current) => ({ ...current, description: text }))
              }
              style={[
                styles.input,
                { color: theme.text, backgroundColor: theme.background },
              ]}
              placeholder="Descrição da categoria"
              placeholderTextColor={theme.textSecondary}
            />
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: theme.text }]}
              onPress={async () => {
                if (!newCategory.title.trim()) {
                  return;
                }

                await addCategory({
                  title: newCategory.title.trim(),
                  description:
                    newCategory.description.trim() ||
                    "Categoria cadastrada pelo admin.",
                  accentColor: newCategory.accentColor.trim() || "#D4A574",
                });

                setNewCategory({
                  title: "",
                  description: "",
                  accentColor: "#D4A574",
                });
              }}
            >
              <Text
                style={[styles.primaryButtonText, { color: theme.background }]}
              >
                Adicionar categoria
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {categories.map((category) => (
          <CategoryPanel
            key={category.id}
            category={category}
            theme={theme}
            isAdmin={isAdmin}
            onUpdateCategory={(categoryId, patch) =>
              updateCategory(categoryId, patch)
            }
            onDeleteCategory={(categoryId) => deleteCategory(categoryId)}
            onAddItem={(categoryId, item) => addItem(categoryId, item)}
            onUpdateItem={(categoryId, itemId, patch) =>
              updateItem(categoryId, itemId, patch)
            }
            onDeleteItem={(categoryId, itemId) =>
              deleteItem(categoryId, itemId)
            }
          />
        ))}
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
  headerCenter: { flex: 1, alignItems: "center" },
  headerBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
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
  content: { padding: 20, paddingBottom: 48, gap: 16 },
  hero: { borderRadius: 28, padding: 22, gap: 10 },
  heroTitle: { fontSize: 24, fontWeight: "bold", fontFamily: "serif" },
  heroText: { fontSize: 15, lineHeight: 21 },
  heroStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  heroStatValue: { fontSize: 28, fontWeight: "bold", fontFamily: "serif" },
  heroStatLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  adminComposer: { borderRadius: 24, padding: 18, gap: 10 },
  categoryCard: { borderRadius: 24, padding: 18, gap: 14 },
  categoryHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  categorySwatch: { width: 14, height: 44, borderRadius: 999 },
  categoryTitle: { fontSize: 20, fontWeight: "bold", fontFamily: "serif" },
  categoryDescription: { fontSize: 14, marginTop: 2, lineHeight: 19 },
  countBadge: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  itemPreviewRow: { gap: 12, paddingBottom: 2 },
  itemPreview: {
    width: 130,
    minHeight: 150,
    borderRadius: 22,
    padding: 14,
    justifyContent: "space-between",
  },
  itemPreviewName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  itemPreviewTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  itemPreviewTagText: { color: "#FFF", fontSize: 11, fontWeight: "700" },
  adminBlock: { gap: 10, marginTop: 2 },
  subsectionTitle: { fontSize: 16, fontWeight: "700", fontFamily: "serif" },
  rowInputs: { flexDirection: "row", gap: 10, alignItems: "center" },
  input: {
    minHeight: 48,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(96,65,43,0.14)",
    fontSize: 14,
  },
  flexInput: { flex: 1 },
  colorInput: { width: 120 },
  iconInput: { width: 92 },
  primaryButton: {
    borderRadius: 14,
    paddingHorizontal: 14,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: { fontSize: 14, fontWeight: "700" },
  deleteButton: {
    minHeight: 44,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFF5F3",
  },
  deleteItemButton: {
    minHeight: 44,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#FFD2CE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFF5F3",
  },
  deleteButtonText: { color: "#D92D20", fontSize: 14, fontWeight: "700" },
  adminItemList: { gap: 10, marginTop: 4 },
  adminItemCard: { borderWidth: 1, borderRadius: 18, padding: 12, gap: 10 },
});
