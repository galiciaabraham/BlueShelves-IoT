import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { bulkTrackingsUpdate } from '@/components/services/trackingService';


export default function SubmitScanning({ scannedTags, onReset }: { scannedTags: any[], onReset: () => void }) {

  const handleSubmit = async (status: "found" | "removed") => {
    const now = new Date().toISOString();

    const updates = scannedTags.map(tag => ({
      tracking_id: tag.tracking_id,
      last_seen: now,
      tracking_status: status
    }));

    try {
      const res = await bulkTrackingsUpdate(updates);

      if (res.ok) {
        Alert.alert("Success", 
          `Tags marked as ${status}`, 
          [{ text: "OK", onPress: onReset }]
        );
      } else {
        console.error("Bulk update failed", await res.text());
      }
    } catch (err) {
      console.error("Bulk update error:", err);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Process Scanned Tags</Text>
      <Text style={styles.subtitle}>
        Review {scannedTags.length} tags and submit updates to the database.
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.buttonRemove]}
          onPress={() => handleSubmit("removed")}
        >
          <Text style={styles.buttonText}>Mark as Removed</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonAdd]}
          onPress={() => handleSubmit("found")}
        >
          <Text style={styles.buttonText}>Mark as Found</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonAdd: { backgroundColor: "#28a745" },
  buttonRemove: { backgroundColor: "#dc3545" },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
