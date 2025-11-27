import { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, FlatList, TextInput, Modal } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import SubmitScanning from '@/components/utilities/SubmitScanning';
import { simulateScan, startScan, ScanResult } from '@/tagSimulator/scanService';

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTags, setScannedTags] = useState<ScanResult[]>([]);
  const [editingItem, setEditingItem] = useState<ScanResult | null>(null);
  const [editedValues, setEditedValues] = useState<any>({});

  const API_URL = 'https://blueshelves-iot.onrender.com';

  // Single scan
  const handleSingleScan = async () => {
    setIsScanning(true);
    setTimeout(async () => {
      const result = await simulateScan();

      const trackRes = await fetch(`${API_URL}/trackings/${result.tracking_id}`);
      const trackData = await trackRes.json();

      setScannedTags(prev => [...prev, trackData]);
      setIsScanning(false);

      alert('Pretend we found a tag 🎉');
    }, 1500);
  };

  // Continuous scan
  const handleStartScan = () => {
    setIsScanning(true);

    const stop = startScan(async (result) => {
      const trackRes = await fetch(`${API_URL}/trackings/${result.tracking_id}`);
      const trackData = await trackRes.json();
      setScannedTags(prev => [...prev, trackData]);
    }, 2000);

    setTimeout(() => {
      stop();
      setIsScanning(false);
      alert('Finished simulated continuous scan 🎉');
    }, 10000);
  };

  // Save edits to backend
  const handleSaveEdit = async () => {
    if (!editingItem?.item) return;

    try {
      await fetch(`${API_URL}/items/${editingItem.item.item_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedValues),
      });

      setScannedTags(prev =>
        prev.map(st =>
          st.tag.tracking_id === editingItem.tag.tracking_id
            ? { ...st, item: { ...st.item, ...editedValues } }
            : st
        )
      );

      setEditingItem(null);
      setEditedValues({});
      alert('Item updated successfully ✅');
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item ❌');
    }
  };

  // Register new item
  const handleRegisterNewItem = async () => {
    if (!editingItem) return;

    try {
      const res = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedValues),
      });

      const newItem = await res.json();

      setScannedTags(prev =>
        prev.map(st =>
          st.tag.tracking_id === editingItem.tag.tracking_id
            ? { ...st, item: newItem }
            : st
        )
      );

      setEditingItem(null);
      setEditedValues({});
      alert('Item registered successfully ✅');
    } catch (error) {
      console.error('Error registering item:', error);
      alert('Failed to register item ❌');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Scan for Devices</Text>
      <Text style={globalStyles.subtitle}>
        Tap on an item to edit or register it.
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

      {scannedTags.length > 0 && (
        <FlatList
          style={{ marginTop: 20 }}
          data={scannedTags}
          keyExtractor={(item) => String(item.tag.tracking_id)}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setEditingItem(item);
                setEditedValues(item.item ?? {
                  item_name: '',
                  item_color: '',
                  item_size: '',
                  item_quantity: 0,
                  item_sku: '',
                });
              }}
              style={{
                marginBottom: 10,
                padding: 10,
                backgroundColor: '#f1f1f1',
                borderRadius: 8,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>
                Tracking ID: {item.tag.tracking_id}
              </Text>

              {item.item ? (
                <>
                  <Text>Item: {item.item.item_name}</Text>
                  <Text>Color: {item.item.item_color}</Text>
                  <Text>Size: {item.item.item_size}</Text>
                  <Text>Quantity: {item.item.item_quantity}</Text>
                  <Text>SKU: {item.item.item_sku}</Text>
                </>
              ) : (
                <Text style={{ color: 'red', fontStyle: 'italic' }}>
                  Not Registered in Database
                </Text>
              )}

              <Text>Last Seen: {item.tag.last_seen}</Text>
              <Text>Status: {item.tag.tracking_status}</Text>
            </Pressable>
          )}
        />
      )}

      {/* Edit/Register Modal */}
      <Modal visible={!!editingItem} animationType="slide">
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {editingItem?.item ? 'Edit Item' : 'Register New Item'}
          </Text>

          <TextInput
            style={globalStyles.input}
            value={editedValues.item_name}
            onChangeText={(text) => setEditedValues({ ...editedValues, item_name: text })}
            placeholder="Item Name"
          />

          <TextInput
            style={globalStyles.input}
            value={editedValues.item_color}
            onChangeText={(text) => setEditedValues({ ...editedValues, item_color: text })}
            placeholder="Color"
          />

          <TextInput
            style={globalStyles.input}
            value={editedValues.item_size}
            onChangeText={(text) => setEditedValues({ ...editedValues, item_size: text })}
            placeholder="Size"
          />

          <TextInput
            style={globalStyles.input}
            value={String(editedValues.item_quantity)}
            onChangeText={(text) =>
              setEditedValues({ ...editedValues, item_quantity: Number(text) })
            }
            placeholder="Quantity"
            keyboardType="numeric"
          />

          <TextInput
            style={globalStyles.input}
            value={editedValues.item_sku}
            onChangeText={(text) => setEditedValues({ ...editedValues, item_sku: text })}
            placeholder="SKU"
          />

          <Pressable
            style={globalStyles.buttonPrimary}
            onPress={editingItem?.item ? handleSaveEdit : handleRegisterNewItem}
          >
            <Text style={globalStyles.buttonText}>
              {editingItem?.item ? 'Save Changes' : 'Register Item'}
            </Text>
          </Pressable>

          <Pressable
            style={globalStyles.buttonSecondary}
            onPress={() => setEditingItem(null)}
          >
            <Text style={globalStyles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Submit Scanning */}
      {scannedTags.length > 0 && (
        <SubmitScanning
          scannedTags={scannedTags.map(st => ({
            item_id: st.item?.item_id ?? 0,
            tracking_id: st.tag.tracking_id,
            tracking_status: st.tag.tracking_status,
            last_seen: st.tag.last_seen,
          }))}
        />
      )}
    </View>
  );
}
