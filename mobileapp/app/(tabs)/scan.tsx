import { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import SubmitScanning from '@/components/utilities/SubmitScanning';
import { simulateScan } from '@/tagSimulator/scanService';
import { API_BASE_URL } from '@/config'; // ✅ central config

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTags, setScannedTags] = useState<any[]>([]);
  const [showSubmitButtons, setShowSubmitButtons] = useState(false);

  // Helper to fetch tracking + item
  const fetchTracking = async (tracking_id: number) => {
    try {
      const trackRes = await fetch(`${API_BASE_URL}/trackings/${tracking_id}`, {
        headers: { Accept: 'application/json' },
      });

      if (!trackRes.ok) {
        return {
          tracking_id,
          tracking_status: 'unknown',
          last_seen: null,
          item_id: null,
          item_name: null,
          item_color: null,
          item_size: null,
          item_quantity: null,
          item_sku: null,
        };
      }

      const trackData = await trackRes.json();

      let itemData = {};
      if (trackData.item_id) {
        const itemRes = await fetch(`${API_BASE_URL}/items/${trackData.item_id}`, {
          headers: { Accept: 'application/json' },
        });
        if (itemRes.ok) {
          itemData = await itemRes.json();
        }
      }

      // ✅ Flatten item fields directly into the returned object
      return {
        tracking_id: trackData.tracking_id,
        tracking_status: trackData.tracking_status,
        last_seen: trackData.last_seen,
        ...itemData,
      };
    } catch (error) {
      console.error('Error fetching tracking:', error);
      return {
        tracking_id,
        tracking_status: 'unknown',
        last_seen: null,
        item_id: null,
        item_name: null,
        item_color: null,
        item_size: null,
        item_quantity: null,
        item_sku: null,
      };
    }
  };

  // Single Scan
  const handleSingleScan = async () => {
    setIsScanning(true);
    setShowSubmitButtons(false);

    const result = await simulateScan();
    const trackingData = await fetchTracking(result.tracking_id);

    setScannedTags([trackingData]);
    setIsScanning(false);
    setShowSubmitButtons(true);
  };

  // Continuous Scan
  const handleContinuousScan = async () => {
    setIsScanning(true);
    setShowSubmitButtons(false);

    const results: any[] = [];
    for (let i = 0; i < 8; i++) {
      const result = await simulateScan();
      const trackingData = await fetchTracking(result.tracking_id);
      results.push(trackingData);
    }

    setScannedTags(results);
    setIsScanning(false);
    setShowSubmitButtons(true);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Scan for Devices</Text>
      <Text style={globalStyles.subtitle}>Tap on a card to see details</Text>

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

          <Pressable style={globalStyles.buttonPrimary} onPress={handleContinuousScan}>
            <Text style={globalStyles.buttonText}>Continuous Scan</Text>
          </Pressable>
        </View>
      )}

      {/* Display Scanned Tags */}
      {scannedTags.length > 0 && (
        <FlatList
          style={{ marginTop: 20 }}
          data={scannedTags}
          keyExtractor={(item, index) => `${item.tracking_id}-${index}`} // ✅ unique key
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 10,
                padding: 10,
                backgroundColor: '#f1f1f1',
                borderRadius: 8,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>Tracking ID: {item.tracking_id}</Text>
              {item.item_name ? (
                <>
                  <Text>Item: {item.item_name}</Text>
                  <Text>Color: {item.item_color}</Text>
                  <Text>Size: {item.item_size}</Text>
                  <Text>Quantity: {item.item_quantity}</Text>
                  <Text>SKU: {item.item_sku}</Text>
                </>
              ) : (
                <Text style={{ color: 'red', fontStyle: 'italic' }}>Unknown Item</Text>
              )}
              <Text>Last Seen: {item.last_seen ?? 'N/A'}</Text>
              <Text>Status: {item.tracking_status}</Text>
            </View>
          )}
        />
      )}

      {/* SubmitScanning Buttons */}
      {showSubmitButtons && scannedTags.length > 0 && (
        <SubmitScanning
          scannedTags={scannedTags.map((st) => ({
            item_id: st.item_id ?? 0,
            tracking_id: st.tracking_id,
            tracking_status: st.tracking_status,
            last_seen: st.last_seen,
          }))}
        />
      )}
    </View>
  );
}
