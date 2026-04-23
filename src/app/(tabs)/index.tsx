import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import Menu from '../../components/menu';
import { Colors } from '../../constants/theme';

// 1. DEFINIÇÃO DO COMPONENTE (O nome deve ser exatamente ProductRow)
const ProductRow = ({ title, theme }: { title: string, theme: any }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
      <TouchableOpacity style={styles.arrowCircle}>
        <Ionicons name="chevron-forward" size={16} color={theme.text} />
      </TouchableOpacity>
    </View>
    
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={[styles.card, { backgroundColor: theme.backgroundElement }]} />
      ))}
      <TouchableOpacity style={styles.seeMoreArrow}>
        <Ionicons name="chevron-forward" size={24} color={theme.text} />
      </TouchableOpacity>
    </ScrollView>
  </View>
);

export default function Home() {
  const [menuVisible, setMenuVisible] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
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
        
        <View style={[styles.searchBox, { backgroundColor: theme.backgroundElement }]}>
          <TextInput 
            placeholder="Pesquisar" 
            placeholderTextColor={theme.textSecondary}
            style={[styles.input, { color: theme.text }]}
          />
          <Ionicons name="search" size={20} color={theme.text} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainScroll}>
        {/* 2. USO DO COMPONENTE (Agora o nome bate com a definição acima) */}
        <ProductRow title="Selecionados" theme={theme} />
        <ProductRow title="Top's Recomendados" theme={theme} />
        <ProductRow title="Mais Vendidos" theme={theme} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 20, alignItems: 'center' },
  menuBtn: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  searchBox: { flex: 1, flexDirection: 'row', height: 48, borderRadius: 15, paddingHorizontal: 15, alignItems: 'center' },
  input: { flex: 1, fontSize: 16 },
  mainScroll: { paddingBottom: 100 },
  section: { marginBottom: 30 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 10, marginBottom: 15 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold' },
  arrowCircle: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#E8D8B8', justifyContent: 'center', alignItems: 'center' },
  horizontalScroll: { paddingLeft: 20, paddingRight: 10, alignItems: 'center' },
  card: { width: 120, height: 160, borderRadius: 20, marginRight: 15 },
  seeMoreArrow: { padding: 10 }
});