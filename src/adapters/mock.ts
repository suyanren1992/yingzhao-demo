// 模拟事件源：驱动开发与录演示视频；决赛由 WebSdkAdapter 替换
import type { DeviceAdapter } from "./types";
import type { DeviceEvent } from "../core/types";

const ZONES = ["厨房", "客厅", "阳台", "书房"];
const KINDS = [
  { kind: "cooking", caption: "有人在认真备菜，台面出现了土豆和牛腩" },
  { kind: "tidying", caption: "有人把散落的玩具收回了箱子" },
  { kind: "watering", caption: "有人在阳台侍弄花草，持续了一下午" },
  { kind: "reading", caption: "有人窝在沙发里读完了半本书" },
];

const GRADIENTS = [
  ["#f6d365", "#fda085"], ["#a1c4fd", "#c2e9fb"], ["#ffecd2", "#fcb69f"], ["#d4fc79", "#96e6a1"],
];

let seq = 0;
function makeEvent(delayMin: number): DeviceEvent {
  const k = KINDS[Math.floor(Math.random() * KINDS.length)];
  const g = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
  return {
    id: "ev-" + Date.now() + "-" + ++seq,
    ts: Date.now() - delayMin * 60000,
    source: "mock",
    zone: ZONES[Math.floor(Math.random() * ZONES.length)],
    kind: k.kind,
    frames: [g[0], g[1]],
    caption: k.caption,
    level: "confirmed",
  };
}

export class MockAdapter implements DeviceAdapter {
  name = "mock-adapter";

  async fetchEvents(): Promise<DeviceEvent[]> {
    // 模拟"每隔几秒有一个新事件"的在线流
    return [makeEvent(0), makeEvent(2), makeEvent(5)];
  }

  async captureFrame(): Promise<string> {
    const g = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
    return g[0];
  }
}

// 可脚本模式：为录视频提供确定性事件流
export class ScriptedAdapter implements DeviceAdapter {
  name = "scripted-adapter";
  private script: DeviceEvent[];
  private i = 0;
  constructor(script: DeviceEvent[]) { this.script = script; }
  async fetchEvents(): Promise<DeviceEvent[]> {
    if (this.i >= this.script.length) return [];
    return [this.script[this.i++]];
  }
  async captureFrame(): Promise<string> { return "#f6d365"; }
}

export function scriptedEvent(zone: string, caption: string, kind = "custom"): DeviceEvent {
  return {
    id: "ev-script-" + ++seq, ts: Date.now(), source: "mock", zone, kind,
    frames: ["#f6d365", "#fda085"], caption, level: "confirmed",
  };
}
