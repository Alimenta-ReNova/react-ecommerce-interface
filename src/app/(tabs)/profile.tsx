import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from '../../components/menu';
import { Colors } from '../../constants/theme';

interface ProfileItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  theme: any;
  onPress: () => void;
}

const ProfileMenuItem = ({ icon, title, subtitle, theme, onPress }: ProfileItemProps) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.cardContent}>
        {icon}
        <View style={styles.cardText}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
    {/* O divisor agora está corretamente estilizado */}
    <View style={[styles.divider, { backgroundColor: theme.textSecondary }]} />
  </View>
);

export default function ProfileScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme as keyof typeof Colors];
  const router = useRouter();

  // Simulação: Começamos como 'false' para forçar o login ao clicar
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // Lógica: Redireciona para login apenas quando a aba ganha foco
  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn) {
        // Usamos push para o login aparecer por cima das tabs
        router.push('/login');
      }
    }, [isLoggedIn])
  );

  const itemColor = theme.text; 

  const handleLogout = () => {
    console.log('Saindo...');
    setIsLoggedIn(false);
    router.replace('/login');
  };

  // Enquanto não está logado, não renderizamos o conteúdo para evitar "piscadas"
  if (!isLoggedIn) return null;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />

        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.menuBtn, { backgroundColor: theme.backgroundElement }]} 
            onPress={() => setMenuVisible(true)}
          >
            <Ionicons name="menu" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>Perfil</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatarContainer, { backgroundColor: '#E8D8B8' }]}>
              <FontAwesome name="user" size={50} color={itemColor} />
              <TouchableOpacity style={[styles.cameraIconContainer, { backgroundColor: '#E8D8B8' }]}>
                <FontAwesome name="camera" size={16} color={itemColor} />
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.profileName, { color: theme.text }]}>Ingrid Souza</Text>
            <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>ingrid.souza@furg.br</Text>
          </View>

          <View style={styles.profileMenu}>
            <ProfileMenuItem 
              theme={theme}
              icon={<Feather name="user" size={24} color={itemColor} />}
              title="Dados Pessoais"
              subtitle="Nome, email, CPF e telefone"
              onPress={() => router.push('/personal-data')} 
            />
            <ProfileMenuItem 
              theme={theme}
              icon={<Feather name="shopping-bag" size={24} color={itemColor} />}
              title="Meus Produtos"
              subtitle="Produtos Ativos"
              onPress={() => router.push('/user-products')}
            />
            <ProfileMenuItem 
              theme={theme}
              icon={<Feather name="clipboard" size={24} color={itemColor} />}
              title="Histórico de Compras"
              subtitle="Ver últimas compras"
              onPress={() => router.push('/purchase-history')}
            />
            <ProfileMenuItem 
              theme={theme}
              icon={<Feather name="bell" size={24} color={itemColor} />}
              title="Preferências de alerta"
              subtitle="Horário e Canal"
              onPress={() => router.push('/alert-preferences')}
            />
            <ProfileMenuItem 
              theme={theme}
              icon={<Feather name="settings" size={24} color={itemColor} />}
              title="Definições"
              subtitle="App e segurança"
              onPress={() => router.push('/settings')}
            />

            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
            >
              <Ionicons name="close-outline" size={28} color="#FF6B6B" style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Terminar Sessão</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 30 },
  menuBtn: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', fontFamily: 'serif' },
  placeholder: { width: 45 },
  scrollContent: { paddingBottom: 120 },
  profileHeader: { alignItems: 'center', marginBottom: 40 },
  avatarContainer: { width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  cameraIconContainer: { position: 'absolute', bottom: 5, right: 5, width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#F5F5DC' },
  profileName: { fontSize: 24, fontWeight: 'bold', fontFamily: 'serif' },
  profileEmail: { fontSize: 16, marginTop: 5 },
  profileMenu: { paddingHorizontal: 20 },
  cardContainer: { marginBottom: 15 },
  card: { width: '100%', backgroundColor: '#fff', borderRadius: 20, padding: 15, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  cardContent: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', fontFamily: 'serif' }, // <-- Definição que estava faltando
  cardSubtitle: { fontSize: 14, marginTop: 2 }, // <-- Definição que estava faltando
  divider: { height: 1, width: '100%', opacity: 0.1, marginTop: 15 }, // <-- Definição que estava faltando
  logoutButton: { backgroundColor: '#FFE5E5', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18, borderRadius: 20, marginTop: 10, borderWidth: 1, borderColor: '#FFD1D1' },
  logoutIcon: { marginRight: 10, fontWeight: 'bold' },
  logoutText: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', fontFamily: 'serif' }
});