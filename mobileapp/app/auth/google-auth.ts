// app/(auth)/google-auth.ts
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { Button } from "react-native";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useRouter } from "expo-router";

export default function GoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID",
  });

  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then(() => router.replace("/(tabs)/dashboard"));
    }
  }, [response]);

  return <Button disabled={!request} title="Sign in with Google" onPress={() => promptAsync()} />;
}
