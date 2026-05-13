import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // 1. Importe o router
import React from "react";
import {
    Dimensions,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../constants/theme";
import { useAuth } from "./auth-context";

interface MenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function Menu({ visible, onClose }: MenuProps) {
  const theme = Colors.light;
  const router = useRouter(); // 2. Inicialize o router
  const { user, signOut } = useAuth();

  // 3. Adicione o 'path' correspondente ao nome do arquivo/rota
  const menuItems = [
    { label: "Inicio", path: "/", active: true },
    { label: "Categorias", path: "/categories", active: false },
    { label: "Alertas", path: "/(tabs)/alerts", active: false },
    { label: "Meu Perfil", path: "/(tabs)/profile", active: false },
    { label: "Entre em contato", path: "/contact", active: false },
    { label: "Configurações", path: "/settings", active: false },
  ];

  // Função para navegar e fechar o menu ao mesmo tempo
  const navigateTo = (path: string) => {
    onClose(); // Fecha o modal bege
    router.push(path as any); // Vai para a tela
  };

  const handleLogout = async () => {
    onClose();
    await signOut();
    router.replace("/login");
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.drawer, { backgroundColor: theme.background }]}>
            {/* Header: Avatar e Botão Voltar */}
            <View style={styles.header}>
              <View style={styles.userInfo}>
                <View style={[styles.avatar, { backgroundColor: "#E8D8B8" }]}>
                  <Ionicons name="person" size={30} color={theme.text} />
                </View>
                <View>
                  <Text style={[styles.userName, { color: theme.text }]}>
                    {user?.name ?? "Convidado"}
                  </Text>
                  {user && (
                    <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
                      {user.email}
                    </Text>
                  )}
                </View>
              </View>

              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            {/* Lista de Itens */}
            <View style={styles.menuList}>
              {menuItems.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={[styles.menuItem, item.active && styles.activeItem]}
                    onPress={() => navigateTo(item.path)} // 4. Adicione o clique aqui
                  >
                    <Text style={[styles.menuText, { color: theme.text }]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={[styles.divider, { backgroundColor: "#BCA89F" }]}
                  />
                </View>
              ))}
            </View>

            {/* Linhas decorativas */}
            <View style={styles.extraDecor}>
              <View
                style={[
                  styles.divider,
                  { backgroundColor: "#BCA89F", marginTop: 40 },
                ]}
              />
              <View
                style={[
                  styles.divider,
                  { backgroundColor: "#BCA89F", marginTop: 40 },
                ]}
              />
            </View>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={22} color="#B42318" />
              <Text style={styles.logoutText}>Sair da conta</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    </Modal>
  );
}

// ... seus estilos continuam iguais
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  safeArea: {
    flex: 1,
  },
  drawer: {
    width: Dimensions.get("window").width * 0.75,
    height: "100%",
    borderTopRightRadius: 45,
    borderBottomRightRadius: 45,
    padding: 25,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#E8D8B8",
    padding: 10,
    borderRadius: 14,
  },
  menuList: {
    marginTop: 10,
  },
  menuItem: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 6,
  },
  activeItem: {
    borderWidth: 2,
    borderColor: "#3182CE",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "600",
  },
  divider: {
    height: 1.5,
    width: "100%",
    opacity: 0.5,
  },
  extraDecor: {
    flex: 1,
    justifyContent: "flex-start",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#FFE5E5",
    borderWidth: 1,
    borderColor: "#FFCCCC",
  },
  logoutText: {
    color: "#B42318",
    fontSize: 16,
    fontWeight: "700",
  },
});
