// tagSimulator/simulator.ts
import { mockTags, MockTag } from './mockTags';
import { mockItems } from '@/mockItems';

export type FoundEvent = {
  tag: MockTag;
  item: typeof mockItems[number] | undefined;
};

type Options = {
  intervalMs?: number;   // how often to simulate a scan
  burstSize?: number;    // how many tags per tick
  randomize?: boolean;   // random vs sequential scanning
};

export class TagSimulator {
  // ✅ Fixed type: works in Node + React Native
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
  private tick() {
    const tags = this.pickTags(this.options.burstSize ?? 1);
    tags.forEach(tag => {
      tag.last_seen = new Date().toISOString();
      tag.tracking_status = 'active';

      const item = mockItems.find(i => i.item_id === tag.item_id);

      const event: FoundEvent = { tag, item };
      this.listeners.forEach(l => l(event));
    });
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
