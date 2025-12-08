
export type NewMockTag = {
  tracking_id: number;
  item_id: number;
  last_seen: string | null;
   tracking_status: 'lost';
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

function generateUniqueId(){    
    return Math.floor(Math.random() * 1000000);
}

async function fetchItemItds() : Promise<number[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/items/`, {
            headers: { Accept: 'application/json', 'x-api-key': API_KEY },
        })
        if (!res.ok) {
            console.error('Error fetching items:', res.statusText);
            return [];
        }

        const items = await res.json();

        return items.map((item: any) => item.item_id);
    } catch (err) {
        console.error('Error fetching items:', err);
        return [];
        }
    }

export async function generateTags(count: number) {

    const itemIds = await fetchItemItds();

    if (itemIds.length === 0) {
        console.error('No item IDs available to generate tags.');
    }

    const newTags: NewMockTag[] = [];

    for (let i = 0; i < count; i++) {

        const randomItemId = itemIds[Math.floor(Math.random() * itemIds.length)];

        newTags.push({
            tracking_id: generateUniqueId(),
            item_id: randomItemId,
            last_seen: new Date().toISOString(),
            tracking_status: 'lost',
        });
    }

    for (const tag of newTags) {
        try {
            const res = await fetch(`${API_BASE_URL}/tags/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
                body: JSON.stringify(tag),
            });
        } catch (error) {
            console.error('Error posting tag:', error);
        }
    }

    return newTags;
}