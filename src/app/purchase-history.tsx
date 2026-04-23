import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';

export default function PurchaseHistory() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme as keyof typeof Colors];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={[styles.backBtn, { backgroundColor: theme.backgroundElement }]}
        >
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Histórico</Text>
        <View style={{ width: 45 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Exemplo de item do histórico */}
        <View style={[styles.historyCard, { backgroundColor: theme.backgroundElement }]}>
          <View style={styles.historyInfo}>
            <Text style={[styles.dateText, { color: theme.textSecondary }]}>20 de Abril, 2026</Text>
            <Text style={[styles.itemTitle, { color: theme.text }]}>Pedido #8829 - Empório Natu</Text>
          </View>
          <Text style={[styles.price, { color: theme.text }]}>R$ 145,90</Text>
        </View>

        <View style={[styles.historyCard, { backgroundColor: theme.backgroundElement }]}>
          <View style={styles.historyInfo}>
            <Text style={[styles.dateText, { color: theme.textSecondary }]}>12 de Março, 2026</Text>
            <Text style={[styles.itemTitle, { color: theme.text }]}>Pedido #7540 - Grão Real</Text>
          </View>
          <Text style={[styles.price, { color: theme.text }]}>R$ 89,20</Text>
        </View>

        <View style={styles.divider} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
  backBtn: { padding: 10, borderRadius: 12 },
  title: { fontSize: 24, fontWeight: 'bold', fontFamily: 'serif' },
  scrollContent: { padding: 20 },
  historyCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 18, 
    borderRadius: 20, 
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  historyInfo: { flex: 1 },
  dateText: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', fontFamily: 'serif' },
  price: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  divider: { height: 1, backgroundColor: '#E8D8B8', opacity: 0.5, marginTop: 20 }
});