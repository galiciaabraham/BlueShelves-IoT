import { View, Text, Pressable, StyleSheet } from "react-native";

// Component to handle submission of scanned tags
// It verifies each tag against the database and updates its status depending on user action
export default function SubmitScanning ({scannedTags} : {scannedTags: any[]}) {
    return (
        <View>
            <Text style={styles.title}>Process Scanned Tags</Text>
            <Text style={styles.subtitle}>
                Review { scannedTags.length } tags and submit updates to the database.
            </Text>

            <View style={styles.buttonContainer}>
        <Pressable 
            style={[styles.button, styles.butttonRemove]}
            onPress={() => VerifyScanning(scannedTags, submitRemove)}>
                <Text style={styles.buttonText}>Mark as Removed</Text>
            </Pressable>

            <Pressable 
            style={[styles.button, styles.buttonAdd]}
            onPress={() => VerifyScanning(scannedTags, submitAdd)}>
                <Text style={styles.buttonText}>Mark as Added</Text>
            </Pressable>
    </View>
        </View>
    
    
    );
}
// Verify if tracking_id exists in database, if true update last_seen and tracking_status.
async function VerifyScanning (scannedTags : any[], submitOperation : (id: number) => Promise<void>) {


    for (const tag of scannedTags) {
        const tracking_id = tag.tracking_id;

        try { 
        let res = await fetch(`http://localhost:3000/trackings/${tracking_id}`)

        if (res.ok) {
            await submitOperation(tracking_id);
            console.log(`Tracking ID ${tracking_id} updated successfully.`);
        } else {
            console.log(`Tracking ID ${tracking_id} not found in database.`);
        }
      } catch (error) {
            console.error(`Error verifying tracking ID ${tracking_id}:`, error);
        }
    }
}

// Patch tracking last_seen and tracking_status to 'found'
const submitAdd = async (id : number) => {
    const now = new Date().toISOString();

    await fetch(`http://localhost:3000/tracking/patch/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            last_seen: now,
            tracking_status: 'found'
        })
    });
}
// Patch tracking last_seen and tracking_status to 'removed'
const submitRemove = async (id : number) => {
    const now = new Date().toISOString();

    await fetch(`http://localhost:3000/tracking/patch/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            last_seen: now,
            tracking_status: 'removed'
        })
    });
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: { 
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonAdd: {
        backgroundColor: '#28a745',
    },
    butttonRemove: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});