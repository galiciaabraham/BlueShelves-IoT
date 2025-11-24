import { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import SubmitScanning from '@/components/utilities/SubmitScanning';
import { simulateScan, startScan } from '@/tagSimulator/scanService';

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTags, setScannedTags] = useState<any[]>([]);

  // Single scan (one-off)
  const handleSingleScan = () => {
    setIsScanning(true);

    // Simulate scanning delay
    setTimeout(() => {
      const result = simulateScan();
      if (result.tag) {
        setScannedTags(prev => [...prev, { tracking_id: result.tag.item_id }]);
      }
      setIsScanning(false);
      alert('Pretend we found a tag 🎉');
    }, 1500);
  };

  // Continuous scan (looping)
  const handleStartScan = () => {
    setIsScanning(true);
    const stop = startScan((result) => {
      if (result.tag) {
        setScannedTags(prev => {
          // Avoid duplicates by uuid
          if (prev.find(t => t.tracking_id === result.tag.item_id)) return prev;
          return [...prev, { tracking_id: result.tag.item_id }];
        });
      }
    }, 2000);

    // Stop after 10 seconds for demo
    setTimeout(() => {
      stop();
      setIsScanning(false);
      alert('Finished simulated continuous scan 🎉');
    }, 10000);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Scan for Devices</Text>
      <Text style={globalStyles.subtitle}>
        This is a demo screen — scanning is simulated using tagSimulator.
      </Text>

      {/* If scanning, show loading indicator, else show scan buttons */}
      {isScanning ? (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={globalStyles.hint}>Scanning in progress...</Text>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <Pressable style={globalStyles.buttonSecondary} onPress={handleSingleScan}>
            <Text style={globalStyles.buttonText}>Single Scan</Text>
          </Pressable>
          <Pressable style={globalStyles.buttonPrimary} onPress={handleStartScan}>
            <Text style={globalStyles.buttonText}>Continuous Scan</Text>
          </Pressable>
        </View>
      )}

      {/* When scan is complete, show SubmitScanning component */}
      {scannedTags.length > 0 && <SubmitScanning scannedTags={scannedTags} />}
    </View>
  );
}
