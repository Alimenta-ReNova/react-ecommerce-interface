import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';

export default function AlertPreferences() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme as keyof typeof Colors];

  const [stockAlert, setStockAlert] = useState(true);
  const [expiryAlert, setExpiryAlert] = useState(true);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
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
        <View style={[styles.settingRow, { backgroundColor: theme.backgroundElement }]}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>Aviso de estoque baixo</Text>
          <Switch 
            value={stockAlert} 
            onValueChange={setStockAlert} 
            trackColor={{ false: '#D9D9D9', true: '#8B735B' }}
            thumbColor={stockAlert ? theme.background : '#f4f3f4'}
          />
        </View>

        <View style={[styles.settingRow, { backgroundColor: theme.backgroundElement }]}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>Notificação de validade</Text>
          <Switch 
            value={expiryAlert} 
            onValueChange={setExpiryAlert} 
            trackColor={{ false: '#D9D9D9', true: '#8B735B' }}
            thumbColor={expiryAlert ? theme.background : '#f4f3f4'}
          />
        </View>
        
        <Text style={[styles.helperText, { color: theme.textSecondary }]}>
          Essas notificações ajudam o Alimenta ReNova a prever quando seus produtos naturais vão precisar de reposição.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
  backBtn: { padding: 10, borderRadius: 12 },
  title: { fontSize: 24, fontWeight: 'bold', fontFamily: 'serif' },
  content: { padding: 20 },
  settingRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingLabel: { fontSize: 16, fontWeight: '600', fontFamily: 'serif' },
  helperText: { textAlign: 'center', marginTop: 20, fontSize: 14, paddingHorizontal: 20 }
});