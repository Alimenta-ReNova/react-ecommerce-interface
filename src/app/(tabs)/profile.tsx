import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../components/auth-context";
import BackHomeButton from "../../components/back-home-button";
import Menu from "../../components/menu";
import { useTheme } from "../../hooks/use-theme";

interface ProfileItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  theme: any;
  onPress: () => void;
}

const ProfileMenuItem = ({
  icon,
  title,
  subtitle,
  theme,
  onPress,
}: ProfileItemProps) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.cardContent}>
        {icon}
        <View style={styles.cardText}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    {/* O divisor agora está corretamente estilizado */}
    <View style={[styles.divider, { backgroundColor: theme.textSecondary }]} />
  </View>
);

export default function ProfileScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const { isAuthenticated, isLoading, role, signOut, user, updateUserPhoto } =
    useAuth();

  useFocusEffect(
    useCallback(() => {
      if (isLoading) {
        return;
      }

      if (!isAuthenticated) {
        router.push("/login");
        return;
      }
    }, [isAuthenticated, isLoading, role, router]),
  );

  const itemColor = theme.text;

  const getImagePicker = async () => {
    try {
      return await import("expo-image-picker");
    } catch {
      return null;
    }
  };

  const handlePickPhoto = async () => {
    try {
      setPhotoLoading(true);
      const ImagePicker = await getImagePicker();

      if (!ImagePicker) {
        Alert.alert(
          "Indisponível",
          "O seletor de imagens não está disponível nesta instalação.",
        );
        return;
      }

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "Ative o acesso à galeria para selecionar uma foto.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      const selectedPhoto = result.assets?.[0]?.base64;

      if (!result.canceled && selectedPhoto) {
        await updateUserPhoto(selectedPhoto);
        Alert.alert("Sucesso", "Foto atualizada com sucesso!");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a foto.");
      console.error(error);
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleTakePhoto = async () => {
    try {
      setPhotoLoading(true);
      const ImagePicker = await getImagePicker();

      if (!ImagePicker) {
        Alert.alert(
          "Indisponível",
          "A câmera não está disponível nesta instalação.",
        );
        return;
      }

      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "Ative o acesso à câmera para tirar uma foto.",
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      const selectedPhoto = result.assets?.[0]?.base64;

      if (!result.canceled && selectedPhoto) {
        await updateUserPhoto(selectedPhoto);
        Alert.alert("Sucesso", "Foto atualizada com sucesso!");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível tirar uma foto.");
      console.error(error);
    } finally {
      setPhotoLoading(false);
    }
  };

  const handlePhotoPress = () => {
    Alert.alert("Foto do perfil", "Escolha uma opção:", [
      {
        text: "Tirar foto",
        onPress: handleTakePhoto,
      },
      {
        text: "Escolher da galeria",
        onPress: handlePickPhoto,
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

  if (isLoading || !isAuthenticated) return null;

  const photoUrl = user?.photo
    ? `data:image/jpeg;base64,${user.photo}`
    : undefined;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <View style={styles.container}>
        <Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />

        <View style={styles.header}>
          <BackHomeButton
            backgroundColor={theme.backgroundElement}
            iconColor={theme.text}
          />
          <Text
            style={[
              styles.title,
              { color: theme.text, flex: 1, textAlign: "center" },
            ]}
          >
            Perfil
          </Text>
          <TouchableOpacity
            style={[
              styles.menuBtn,
              { backgroundColor: theme.backgroundElement },
            ]}
            onPress={() => setMenuVisible(true)}
          >
            <Ionicons name="menu" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileHeader}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handlePhotoPress}
              disabled={photoLoading}
            >
              <View
                style={[styles.avatarContainer, { backgroundColor: "#E8D8B8" }]}
              >
                {photoUrl ? (
                  <Image
                    source={{ uri: photoUrl }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <FontAwesome name="user" size={50} color={itemColor} />
                )}
                <View
                  style={[
                    styles.cameraIconContainer,
                    { backgroundColor: "#E8D8B8" },
                  ]}
                >
                  <FontAwesome name="camera" size={16} color={itemColor} />
                </View>
              </View>
            </TouchableOpacity>

            <Text style={[styles.profileName, { color: theme.text }]}>
              {user?.name ?? "Ingrid Souza"}
            </Text>
            <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>
              {user?.email ?? "ingrid.souza@furg.br"}
            </Text>
            <Text style={[styles.roleBadge, { color: theme.textSecondary }]}>
              Perfil: {role === "admin" ? "Administrador" : "Usuário"}
            </Text>
          </View>

          <View style={styles.profileMenu}>
            {role === "admin" ? (
              <>
                <ProfileMenuItem
                  theme={theme}
                  icon={<Feather name="layout" size={24} color={itemColor} />}
                  title="Painel de Controle"
                  subtitle="Estoque e usuários"
                  onPress={() => router.push("/admin")}
                />
                <ProfileMenuItem
                  theme={theme}
                  icon={<Feather name="grid" size={24} color={itemColor} />}
                  title="Categorias"
                  subtitle="Gerenciar itens e sessões públicas"
                  onPress={() => router.push("/categories")}
                />
                <ProfileMenuItem
                  theme={theme}
                  icon={<Feather name="user" size={24} color={itemColor} />}
                  title="Dados Pessoais"
                  subtitle="Nome, email, CPF e telefone"
                  onPress={() => router.push("/personal-data")}
                />
              </>
            ) : (
              <>
                <ProfileMenuItem
                  theme={theme}
                  icon={<Feather name="user" size={24} color={itemColor} />}
                  title="Dados Pessoais"
                  subtitle="Nome, email, CPF e telefone"
                  onPress={() => router.push("/personal-data")}
                />
                <ProfileMenuItem
                  theme={theme}
                  icon={
                    <Feather name="shopping-bag" size={24} color={itemColor} />
                  }
                  title="Meus Produtos"
                  subtitle="Produtos Ativos"
                  onPress={() => router.push("/user-products")}
                />
                <ProfileMenuItem
                  theme={theme}
                  icon={
                    <Feather name="clipboard" size={24} color={itemColor} />
                  }
                  title="Histórico de Compras"
                  subtitle="Ver últimas compras"
                  onPress={() => router.push("/purchase-history")}
                />

                <ProfileMenuItem
                  theme={theme}
                  icon={<Feather name="settings" size={24} color={itemColor} />}
                  title="Definições"
                  subtitle="App e segurança"
                  onPress={() => router.push("/settings")}
                />
              </>
            )}

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons
                name="close-outline"
                size={28}
                color="#FF6B6B"
                style={styles.logoutIcon}
              />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    gap: 12,
  },
  menuBtn: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", fontFamily: "serif" },
  placeholder: { width: 45 },
  scrollContent: { paddingBottom: 120 },
  profileHeader: { alignItems: "center", marginBottom: 40 },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F5F5DC",
  },
  profileName: { fontSize: 24, fontWeight: "bold", fontFamily: "serif" },
  profileEmail: { fontSize: 16, marginTop: 5 },
  roleBadge: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  profileMenu: { paddingHorizontal: 20 },
  cardContainer: { marginBottom: 15 },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardContent: { flexDirection: "row", alignItems: "center", gap: 15 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: "bold", fontFamily: "serif" }, // <-- Definição que estava faltando
  cardSubtitle: { fontSize: 14, marginTop: 2 }, // <-- Definição que estava faltando
  divider: { height: 1, width: "100%", opacity: 0.1, marginTop: 15 },
  logoutButton: {
    backgroundColor: "#FFE5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FFD1D1",
  },
  logoutIcon: { marginRight: 10, fontWeight: "bold" },
  logoutText: {
    color: "#FF6B6B",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "serif",
  },
});
