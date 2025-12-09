import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';

//mocking login. Google auth commented out below

export default function LoginScreen({onLoginSuccess} : {onLoginSuccess: () => void}) {
  const router = useRouter();

  // Local state for mock login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Built-in password for mock authentication
  const BUILT_IN_PASSWORD = 'letmein123';

  const handleLogin = () => {
    if (password === BUILT_IN_PASSWORD) {
      console.log('Mock login successful for user:', username);
      onLoginSuccess(); // navigate to dashboard
    } else {
      Alert.alert('Login Failed', 'Incorrect password. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MobileApp</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});


// import React, { useEffect } from 'react';
// import { View, Button, StyleSheet, Text } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import * as AuthSession from 'expo-auth-session';
// import { useRouter } from 'expo-router';
// import { GOOGLE_AUTH_CONFIG } from '../config'; // import from your config.ts

// // ✅ Must be called at the top level, outside any component
// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen() {
//   const router = useRouter();

//   // ✅ Use custom scheme for standalone build
//   const redirectUri = AuthSession.makeRedirectUri({
//     scheme: "blueshelves", // matches app.json
//     // useProxy: false,       // standalone build, no Expo proxy
//   });
//   console.log("Redirect URI:", redirectUri);

//   // ✅ Configure Google OAuth with redirectUri
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     clientId: GOOGLE_AUTH_CONFIG.expoClientId,   // optional for dev
//     iosClientId: GOOGLE_AUTH_CONFIG.iosClientId, // required for iOS standalone
//     androidClientId: GOOGLE_AUTH_CONFIG.androidClientId, // required for Android standalone
//     webClientId: GOOGLE_AUTH_CONFIG.webClientId, // optional for web
//     redirectUri,   // critical for standalone build
//   });

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { authentication } = response;
//       // Fetch user info from Google
//       fetch('https://www.googleapis.com/userinfo/v2/me', {
//         headers: { Authorization: `Bearer ${authentication?.accessToken}` },
//       })
//         .then(res => res.json())
//         .then(userInfo => {
//           console.log('User Info:', userInfo);
//           router.replace('/(tabs)'); // navigate to dashboard
//         })
//         .catch(err => console.error(err));
//     }
//   }, [response]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MobileApp</Text>
//       <Button
//         title="Sign in with Google"
//         disabled={!request}
//         onPress={() => promptAsync()} // ✅ no arguments
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     marginBottom: 20,
//     fontWeight: '600',
//   },
// });
