import { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import SubmitScanning from '@/components/utilities/SubmitScanning';
import { simulateScan, startScan, ScanResult } from '@/tagSimulator/scanService';

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTags, setScannedTags] = useState<ScanResult[]>([]);

  // Single scan (one-off)
  const handleSingleScan = () => {
    setIsScanning(true);

    setTimeout(() => {
      const result = simulateScan();
      if (result.tag) {
        setScannedTags(prev => {
          // Avoid duplicates by uuid
          if (prev.find(t => t.tag.uuid === result.tag.uuid)) return prev;
          return [...prev, result];
        });
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
          if (prev.find(t => t.tag.uuid === result.tag.uuid)) return prev;
          return [...prev, result];
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

      {/* Dynamic list of scanned items */}
      {scannedTags.length > 0 && (
        <FlatList
          style={{ marginTop: 20 }}
          data={scannedTags}
          keyExtractor={(item) => item.tag.uuid}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10, padding: 10, backgroundColor: '#f1f1f1', borderRadius: 8 }}>
              <Text style={{ fontWeight: 'bold' }}>UUID: {item.tag.uuid}</Text>
              <Text>Item: {item.item?.item_name}</Text>
              <Text>Color: {item.item?.item_color}</Text>
              <Text>Size: {item.item?.item_size}</Text>
              <Text>Quantity: {item.item?.item_quantity}</Text>
              <Text>SKU: {item.item?.item_sku}</Text>
              <Text>Last Seen: {item.tag.last_seen}</Text>
              <Text>Status: {item.tag.tracking_status}</Text>
            </View>
          )}
        />
      )}

      {/* Submit scanned tags for DB verification */}
      {scannedTags.length > 0 && (
        <SubmitScanning scannedTags={scannedTags.map(st => ({ tracking_id: st.tag.item_id }))} />
      )}
    </View>
  );
}