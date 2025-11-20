import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { globalStyles } from '@/styles/globalStyles';

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);

    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      alert('Pretend we found some devices 🎉');
    }, 2000);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Scan for Devices</Text>
      <Text style={globalStyles.subtitle}>
        This is a demo screen — scanning is simulated.
      </Text>

      {isScanning ? (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={globalStyles.hint}>Scanning in progress...</Text>
        </View>
      ) : (
        <Pressable style={globalStyles.buttonSecondary} onPress={handleScan}>
          <Text style={globalStyles.buttonText}>Start Scan</Text>
        </Pressable>
      )}
    </View>
  );
}
