import { Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { globalStyles } from '@/styles/globalStyles';

export default function HomeScreen() {
  const router = useRouter();

  // TODO: Replace with real auth logic
  const isLoggedIn = true;

  if (!isLoggedIn) {
    router.push('/modal');
    return null;
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Welcome to BlueShelves!</Text>
      <View style={globalStyles.separator} />
      <Text style={globalStyles.subtitle}>
        Scan, manage, and connect your inventory with ease.
      </Text>

      <View style={globalStyles.actions}>
        <Button
          title="Go to Dashboard"
          onPress={() => router.push('/dashboard')}
          color="#007bff"
        />
        <Button
          title="Scan Devices"
          onPress={() => router.push('/scan')}
          color="#28a745"
        />
      </View>
    </View>
  );
}
