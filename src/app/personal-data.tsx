import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';

export default function PersonalData() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme as keyof typeof Colors];

  // Simulação de estado de login (depois integraremos com o Supabase)
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: theme.backgroundElement }]}>
            <Ionicons name="chevron-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>Dados Pessoais</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.label}>Nome Completo</Text>
          <View style={[styles.inputContainer, { backgroundColor: theme.backgroundElement }]}>
            <TextInput style={[styles.input, { color: theme.text }]} defaultValue="Ingrid Souza" />
          </View>

          {/* Campo CPF - Bloqueado se estiver logado */}
          <Text style={styles.label}>CPF (Não editável após cadastro)</Text>
          <View style={[
            styles.inputContainer, 
            { backgroundColor: theme.backgroundElement },
            isLoggedIn && { opacity: 0.5 } // Fica "apagadinho" se logado
          ]}>
            <Feather name="shield" size={18} color={theme.textSecondary} style={styles.inputIcon} />
            <TextInput 
              style={[styles.input, { color: theme.text }]} 
              defaultValue="123.456.789-00"
              editable={!isLoggedIn} // <--- AQUI A MÁGICA: se logado, não edita
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.label}>E-mail</Text>
          <View style={[styles.inputContainer, { backgroundColor: theme.backgroundElement }]}>
            <Feather name="mail" size={18} color={theme.textSecondary} style={styles.inputIcon} />
            <TextInput style={[styles.input, { color: theme.text }]} defaultValue="ingrid.souza@furg.br" keyboardType="email-address" />
          </View>

          <Text style={styles.label}>Telefone</Text>
          <View style={[styles.inputContainer, { backgroundColor: theme.backgroundElement }]}>
            <Feather name="phone" size={18} color={theme.textSecondary} style={styles.inputIcon} />
            <TextInput style={[styles.input, { color: theme.text }]} defaultValue="(53) 9xxxx-xxxx" keyboardType="phone-pad" />
          </View>

          <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.text }]} onPress={() => router.back()}>
            <Text style={[styles.saveButtonText, { color: theme.background }]}>Salvar Alterações</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', fontFamily: 'serif' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#8B735B', marginBottom: 8, marginTop: 18, marginLeft: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderRadius: 15, height: 55 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, fontFamily: 'sans-serif-medium' },
  saveButton: { height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  saveButtonText: { fontSize: 18, fontWeight: 'bold', fontFamily: 'serif' }
});