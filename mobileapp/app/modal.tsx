import { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { globalStyles } from '@/styles/globalStyles';

export default function LoginModal() {
  const { login } = useAuth();   // ✅ use login() instead of setIsLoggedIn
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      login();            // ✅ simulate login
      router.replace('/'); // redirect to Home
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login to BlueShelves</Text>

      <Text style={globalStyles.label}>Username</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={globalStyles.label}>Password</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={globalStyles.buttonPrimary} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </Pressable>

      <Text style={globalStyles.hint}>
        This is a demo login — no backend required.
      </Text>
    </View>
  );
}
