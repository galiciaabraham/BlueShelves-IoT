import { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import SubmitScanning from '@/components/utilities/SubmitScanning';
import { fetchTracking } from '@/components/services/trackingService';
import { fetchItemById } from '@/components/services/inventoryService';
import { simulateScan } from '@/tagSimulator/scanService';

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTags, setScannedTags] = useState<any[]>([]);
  const [showSubmitButtons, setShowSubmitButtons] = useState(false);

  const resetScan = () => {
    setScannedTags([]);
    setShowSubmitButtons(false);
  }
  // Helper to fetch tracking + item

  const fetchTrackingWithItem = async (tracking_id: number) => {
    try {
      const trackData = await fetchTracking(tracking_id);
      if (!trackData) {
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

      let itemData = {};
      if (trackData.item_id) {
        const item = await fetchItemById(trackData.item_id);
        if (item) {
          itemData = {
            item_id: item.item_id,
            item_name: item.item_name,
            item_color: item.item_color,
            item_size: item.item_size,
            item_quantity: item.item_quantity,
            item_sku: item.item_sku,
          };
        }
      }

      // ✅ Flatten item fields directly into the 
      // returned object
      return {
        tracking_id: trackData.tracking_id,
        tracking_status: trackData.tracking_status,
        last_seen: trackData.last_seen,
        ...itemData,
      };

    } catch (error) {
      console.error('Error merging tracking and item:', error);
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
    const trackingData = await fetchTrackingWithItem(result.tracking_id);

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
      const trackingData = await fetchTrackingWithItem(result.tracking_id);
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
          scannedTags = {scannedTags.map((st) => ({
            item_id: st.item_id,
            tracking_id: st.tracking_id,
            tracking_status: st.tracking_status,
            last_seen: st.last_seen,
          }))}
          onReset={resetScan}
        />
      )}
    </View>
  );
}
