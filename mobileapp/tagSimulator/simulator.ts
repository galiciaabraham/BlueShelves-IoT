// tagSimulator/simulator.ts
import { mockTags, MockTag } from './mockTags';

export type Item = {
  item_id: number;
  item_name: string;
  item_color: string;
  item_size: string;
  item_quantity: number;
  item_sku: string;
  updated_at: string;
};

export type FoundEvent = {
  tag: MockTag;
  item: Item | undefined;
};

type Options = {
  intervalMs?: number;   // how often to simulate a scan
  burstSize?: number;    // how many tags per tick
  randomize?: boolean;   // random vs sequential scanning
};

export class TagSimulator {
  private timer?: ReturnType<typeof setInterval>;
  private listeners: Array<(ev: FoundEvent) => void> = [];
  private index = 0;

  constructor(private options: Options = { intervalMs: 2000, burstSize: 1, randomize: true }) {}

  // Subscribe to scan events
  onFound(listener: (ev: FoundEvent) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Start scanning loop
  start() {
    if (this.timer) return;
    this.timer = setInterval(() => this.tick(), this.options.intervalMs);
  }

  // Stop scanning loop
  stop() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = undefined;
  }

  // Internal tick — simulate discovery
  private async tick() {
    const tags = this.pickTags(this.options.burstSize ?? 1);
    for (const tag of tags) {
      tag.last_seen = new Date().toISOString();
      if (tag.item_id !== 0) {
        tag.tracking_status = 'active';
      }

      let item: Item | undefined;
      if (tag.item_id !== 0) {
        try {
          const res = await fetch(`http://localhost:3000/items/${tag.item_id}`, {
            headers: { Accept: 'application/json' },
          });
          if (res.ok) {
            item = await res.json();
          }
        } catch (err) {
          console.error('Error fetching item:', err);
        }
      }

      const event: FoundEvent = { tag, item };
      this.listeners.forEach(l => l(event));
    }
  }

  // Pick tags either randomly or sequentially
  private pickTags(count: number): MockTag[] {
    if (this.options.randomize) {
      const picks: MockTag[] = [];
      for (let i = 0; i < count; i++) {
        picks.push(mockTags[Math.floor(Math.random() * mockTags.length)]);
      }
      return picks;
    } else {
      const picks: MockTag[] = [];
      for (let i = 0; i < count; i++) {
        picks.push(mockTags[this.index % mockTags.length]);
        this.index++;
      }
      return picks;
    }
  }
}
