import { Button, View } from "react-native";


export default function SubmitScanning ({scannedTags} : {scannedTags: any[]}) {
    return (
        <View>
            <Button title="Add Scanned Items" onPress={() => VerifyScanning(scannedTags, submitAdd)} />
            <Button title="Remove Scanned Items" onPress={() => VerifyScanning(scannedTags, submitRemove)} />
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