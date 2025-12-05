
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_MOBILE_API_KEY;

export async function fetchTracking(tracking_id: number) {
    try {
        const response = await fetch(`${API_URL}/trackings/${tracking_id}`, {
            headers: {
                Accept : 'application/json',
                'x-api-key': API_KEY || ''
            }
            });

            if (!response.ok) {
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
                }
            };
            return response.json();

    } catch (error) {
        console.error('Error fetching tracking:', error);
    }
}

export async function bulkTrackingsUpdate(updates: { tracking_id: string; last_seen: string; tracking_status: "found" | "removed"; }[]) {
    try {
        const response = await fetch(`${API_URL}/trackings/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY || '',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to bulk update trackings');
      }
      return response.json();

    } catch (error) {
        console.error('Error in bulkTrackingsUpdate:', error);
        throw error;
    }
}