// app/_layout.tsx
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Slot, useRouter } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        router.replace("/(auth)/login");
      }
      setLoading(false);
    });

    return unsubscribe; // cleanup
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Wrap Slot in AuthProvider for global auth context access
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
