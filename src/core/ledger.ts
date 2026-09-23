// 家庭记忆账本 · 追加式哈希链（SHA-256，Web Crypto）
import type { LedgerEntry } from "./types";

const encoder = new TextEncoder();

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", encoder.encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export class FamilyLedger {
  private entries: LedgerEntry[] = [];
  private listeners: (() => void)[] = [];

  subscribe(fn: () => void) { this.listeners.push(fn); }
  private emit() { this.listeners.forEach(f => f()); }

  get all(): readonly LedgerEntry[] { return this.entries; }
  get lastHash(): string { return this.entries.length ? this.entries[this.entries.length - 1].hash : "0".repeat(64); }

  async append(fact: string, evidence: string, confirmedBy: string): Promise<LedgerEntry> {
    const entry: LedgerEntry = {
      index: this.entries.length,
      ts: Date.now(),
      fact, evidence, confirmedBy,
      prevHash: this.lastHash,
      hash: "",
    };
    entry.hash = await sha256(JSON.stringify({ ...entry, hash: undefined }));
    this.entries.push(entry);
    this.emit();
    return entry;
  }
}

export const ledger = new FamilyLedger();
