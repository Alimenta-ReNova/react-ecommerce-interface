import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme as keyof typeof Colors];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)')}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={[styles.welcomeText, { color: theme.text }]}>
            {isLogin ? 'Alimenta ReNova' : 'Criar Conta'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {isLogin ? 'Gerencie seus produtos naturais com inteligência' : 'Preencha os dados abaixo'}
          </Text>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <View style={[styles.inputGroup, { backgroundColor: theme.backgroundElement }]}>
              <Feather name="user" size={18} color={theme.textSecondary} />
              <TextInput placeholder="Nome" style={styles.input} />
            </View>
          )}

          {!isLogin && (
            <View style={[styles.inputGroup, { backgroundColor: theme.backgroundElement }]}>
              <Feather name="shield" size={18} color={theme.textSecondary} />
              <TextInput placeholder="CPF" style={styles.input} keyboardType="numeric" />
            </View>
          )}

          <View style={[styles.inputGroup, { backgroundColor: theme.backgroundElement }]}>
            <Feather name="mail" size={18} color={theme.textSecondary} />
            <TextInput placeholder="E-mail" style={styles.input} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={[styles.inputGroup, { backgroundColor: theme.backgroundElement }]}>
            <Feather name="lock" size={18} color={theme.textSecondary} />
            <TextInput placeholder="Senha" style={styles.input} secureTextEntry />
          </View>

          <TouchableOpacity 
            style={[styles.mainButton, { backgroundColor: theme.text }]} 
            onPress={() => router.replace('/(tabs)')} // Simula sucesso e volta para as abas
          >
            <Text style={[styles.buttonText, { color: theme.background }]}>
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.switchButton}>
            <Text style={[styles.switchText, { color: theme.textSecondary }]}>
              {isLogin ? 'Não tem uma conta? ' : 'Já possui conta? '}
              <Text style={{ color: theme.text, fontWeight: 'bold' }}>
                {isLogin ? 'Cadastre-se' : 'Faça Login'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 30 },
  backButton: { marginBottom: 20 },
  header: { marginBottom: 40 },
  welcomeText: { fontSize: 32, fontWeight: 'bold', fontFamily: 'serif' },
  subtitle: { fontSize: 16, marginTop: 10 },
  form: { width: '100%' },
  inputGroup: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderRadius: 15, height: 55, marginBottom: 15 },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  mainButton: { height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  buttonText: { fontSize: 18, fontWeight: 'bold', fontFamily: 'serif' },
  switchButton: { marginTop: 30, alignItems: 'center' },
  switchText: { fontSize: 14 }
});