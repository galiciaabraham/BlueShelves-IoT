// app/(auth)/google-auth.tsx
import * as Google from "expo-auth-session";
import { useEffect } from "react";
import { Button } from "react-native";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();
export default function GoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      clientId: "YOUR_EXPO_CLIENT_ID",
      redirectUri: Google.makeRedirectUri(),
    },
    AuthSession.useAutoDiscovery("https://accounts.google.com")
  );

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