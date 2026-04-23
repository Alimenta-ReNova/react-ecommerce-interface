import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors } from '../../constants/theme';

// O segredo está aqui: EXPORT DEFAULT
export default function CartScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme as keyof typeof Colors];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Meu Carrinho</Text>
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
        Seu carrinho está vazio no momento.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10,
    fontFamily: 'serif' 
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center'
  }
});