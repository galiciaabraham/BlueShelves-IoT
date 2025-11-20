// app/(tabs)/dashboard.tsx
import { View, Text, Button } from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to your Dashboard!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
