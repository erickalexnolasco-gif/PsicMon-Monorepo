// PsiCare Mobile — App entry (scaffold)
// Reutiliza @psicare/db (Supabase) y @psicare/types
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌸 PsiCare</Text>
      <Text style={styles.subtitle}>Tu consulta en el bolsillo</Text>
      <Text style={styles.note}>
        Scaffold listo. Para activar:{"\n"}
        1. Copia .env.local.example a .env y agrega tus Supabase keys{"\n"}
        2. yarn install{"\n"}
        3. yarn start{"\n\n"}
        Las pantallas y navegación se construyen en /src/screens
      </Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF6F6", alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 48, fontWeight: "300", color: "#3D2B35", fontFamily: "serif" },
  subtitle: { fontSize: 18, color: "#9B7B87", marginTop: 8, marginBottom: 30 },
  note: { fontSize: 13, color: "#9B7B87", textAlign: "center", lineHeight: 20 },
});
