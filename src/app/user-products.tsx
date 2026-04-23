import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';

export default function UserProducts() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme as keyof typeof Colors];

  const products = [
    { id: '1', name: 'Castanha do Pará', qty: '500g', status: 'Em estoque' },
    { id: '2', name: 'Farinha de Aveia', qty: '200g', status: 'Acabando' },
    { id: '3', name: 'Amêndoas', qty: '150g', status: 'Em estoque' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={[styles.backBtn, { backgroundColor: theme.backgroundElement }]}
        >
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Meus Produtos</Text>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.text }]}>
          <Ionicons name="add" size={24} color={theme.background} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {products.map(product => (
          <View key={product.id} style={[styles.productCard, { backgroundColor: theme.backgroundElement }]}>
            <View style={[styles.productIcon, { backgroundColor: theme.background }]}>
              <Feather name="package" size={24} color={theme.text} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.productName, { color: theme.text }]}>{product.name}</Text>
              <Text style={[styles.productQty, { color: theme.textSecondary }]}>{product.qty}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: product.status === 'Acabando' ? '#FFE5E5' : '#E8D8B8' }]}>
              <Text style={[styles.statusText, { color: product.status === 'Acabando' ? '#FF6B6B' : theme.text }]}>
                {product.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
  backBtn: { padding: 10, borderRadius: 12 },
  addBtn: { padding: 10, borderRadius: 12, elevation: 3 },
  title: { fontSize: 22, fontWeight: 'bold', fontFamily: 'serif' },
  content: { padding: 20, paddingBottom: 40 },
  productCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 20, 
    marginBottom: 15, 
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productIcon: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  productName: { fontSize: 16, fontWeight: 'bold', fontFamily: 'serif' },
  productQty: { fontSize: 13 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: 'bold' }
});