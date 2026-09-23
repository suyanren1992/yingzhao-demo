// 映照 · 领域类型（与 V2 方案实体对齐）
export type EvidenceLevel = "candidate" | "probable" | "confirmed";

export interface DeviceEvent {
  id: string;
  ts: number;            // epoch ms
  source: "camera" | "doorbell" | "mock";
  zone: string;          // 厨房 / 客厅 / 阳台 / 门口
  kind: string;          // cooking / tidying / watering / arrival ...
  frames: string[];      // 证据帧（mock 为渐变色占位，决赛为截图 base64）
  caption: string;       // 事件一句话描述
  level: EvidenceLevel;
}

export type CardKind = "moment" | "task" | "mirror";

export interface Card {
  id: string;
  kind: CardKind;
  title: string;
  body: string;
  event?: DeviceEvent;
  status: "fresh" | "guessing" | "revealed" | "responded" | "confirmed" | "expired" | "skipped";
  createdAt: number;
}

export interface LedgerEntry {
  index: number;
  ts: number;
  fact: string;
  evidence: string;
  confirmedBy: string;
  prevHash: string;
  hash: string;
}

export interface LightTx {
  ts: number;
  delta: number;
  reason: string;
}
