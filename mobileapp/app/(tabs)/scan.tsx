import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { globalStyles } from '@/styles/globalStyles';
import SubmitScanning  from '@/components/utilities/SubmitScanning';

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTags, setScannedTags] = useState<null | any[]>(null);
  // Eventually it should find real tags and conver the found tags to scannedTags array
  //Then it should pass scannedTags to SubmmitScanning component for verification and updating the database
  const handleScan = () => {
    setIsScanning(true);
    const simulatedTags = [
      { tracking_id: 1 },
      { tracking_id: 2 },
      { tracking_id: 3 }
    ];
    // Simulate scanning delay
    setTimeout(() => {
      setScannedTags(simulatedTags);
      setIsScanning(false);
      alert('Pretend we found some tags 🎉');
    }, 2000);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Scan for Devices</Text>
      <Text style={globalStyles.subtitle}>
        This is a demo screen — scanning is simulated.
      </Text>

    {/* If scanning, show loading indicator, else show scan button */}
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
      {/* When scan is complete, show SubmitScanning component */}
      {scannedTags && <SubmitScanning scannedTags={scannedTags} />}
    </View>
  );
}
