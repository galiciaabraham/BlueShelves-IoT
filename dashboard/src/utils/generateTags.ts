
export type NewMockTag = {
  tracking_id: number;
  item_id: number;
  last_seen: string | null;
   tracking_status: 'lost';
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

function generateUniqueId(){    
    return Math.floor(Math.random() * 1_000_000);
}

async function generateUniqueTrackingId(existingIds: Set<number>): Promise<number> {
    let newId = generateUniqueId();

    while (existingIds.has(newId)) {
        newId = generateUniqueId();
    }

    existingIds.add(newId);
    return newId;
}

async function getExistingTrackingIds(): Promise<Set<number>> {
    try {
        const res = await fetch(`${API_BASE_URL}/trackings`, {
            headers: { Accept: 'application/json', 'x-api-key': API_KEY },
        })

        if (!res.ok) {
            console.error('Error fetching trackings:', res.statusText);
            return new Set();
        }

        const trackings = await res.json();
        return new Set(trackings.map((t: any) => t.tracking_id));
    } catch (err) {
        console.error('Error fetching trackings:', err);
        return new Set();
    }
}

async function getItemIds() : Promise<number[]> {
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
    const errors : string[] = [];
    let created = 0;

    const itemIds = await getItemIds();
    const existingTrackingIds = await getExistingTrackingIds();

    if (itemIds.length === 0) {
        errors.push('No item IDs available to generate tags.');
        return { success : false, created, errors}
    }

    const newTags: NewMockTag[] = [];

    for (let i = 0; i < count; i++) {

        const randomItemId = itemIds[Math.floor(Math.random() * itemIds.length)];

        const uniqueTrackingId = await generateUniqueTrackingId(existingTrackingIds);

        newTags.push({
            tracking_id: uniqueTrackingId,
            item_id: randomItemId,
            last_seen: new Date().toISOString(),
            tracking_status: 'lost',
        });
    }

    for (const tag of newTags) {
        try {
            const res = await fetch(`${API_BASE_URL}/trackings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
                body: JSON.stringify(tag),
            });

            if (!res.ok) {
                errors.push(`Failed to create tag with tracking_id ${tag.tracking_id}: ${await res.text()}`);
            } else {
                created++;
            }
        } catch (err) {
            errors.push(`Error posting tag with tracking_id ${tag.tracking_id}: ${String(err)}`);
        }
    }

    return { success: errors.length === 0, created, errors };
}