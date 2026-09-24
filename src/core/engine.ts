// 卡片引擎：事件 → 卡片（复核分级、打扰预算、灯火规则）
import type { Card, DeviceEvent } from "./types";
import { ledger } from "./ledger";

export const light = {
  balance: 0,
  txs: [] as { ts: number; delta: number; reason: string }[],
  listeners: [] as (() => void)[],
  add(delta: number, reason: string) {
    this.balance += delta;
    this.txs.unshift({ ts: Date.now(), delta, reason });
    this.listeners.forEach(f => f());
  },
  subscribe(fn: () => void) { this.listeners.push(fn); },
};

let seq = 0;
export const cards: Card[] = [];
const cardListeners = new Set<() => void>();
export function onCards(fn: () => void) { cardListeners.add(fn); }
function emit() { cardListeners.forEach(f => f()); }

const DAILY_BUDGET = 3;
export function todayCount(): number {
  const d = new Date().toDateString();
  return cards.filter(c => new Date(c.createdAt).toDateString() === d).length;
}

// 只有"确认"级事件成卡；每天最多 3 张（打扰预算）
export function ingestEvent(ev: DeviceEvent): Card | null {
  if (ev.level !== "confirmed") return null;
  if (todayCount() >= DAILY_BUDGET) return null;
  const card: Card = {
    id: "card-" + ++seq,
    kind: "moment",
    title: "刚刚，" + ev.zone + "有人忙了一会儿",
    body: ev.caption,
    event: ev,
    status: "fresh",
    createdAt: Date.now(),
  };
  cards.unshift(card);
  emit();
  return card;
}

export function transition(card: Card, status: Card["status"]) {
  card.status = status;
  emit();
}

// 确认即理解：确认入册 + 灯火（奖励"被看见"，不是"猜对"）
export async function confirmCard(card: Card, who: string) {
  transition(card, "confirmed");
  await ledger.append(card.body, "画面 #" + (card.event?.id ?? "—"), who);
  light.add(1, "时刻被确认入册 · 被看见");
}

// 任务卡
const TASK_POOL = [
  { title: "要不要站起来活动 3 分钟？", body: "你今天已在沙发连续工作 3 小时——这是镜头看到的客观事实", verify: "镜头将核实画面中出现的站立活动" },
  { title: "今天要不要翻 10 分钟书？", body: "你上次翻开书，是 12 天前——这是镜头看到的客观事实", verify: "镜头将核实阅读姿态与持续时长" },
  { title: "要不要陪团长 5 分钟？", body: "它今天独自在家 9 小时了——这是镜头看到的客观事实", verify: "镜头将核对你与它的互动画面" },
];

export function drawTaskCard(): Card {
  const t = TASK_POOL[Math.floor(Math.random() * TASK_POOL.length)];
  const card: Card = { id: "task-" + ++seq, kind: "task", title: t.title, body: t.body, verify: t.verify, status: "fresh", createdAt: Date.now() };
  cards.unshift(card);
  emit();
  return card;
}

// 任务完成：进入镜头核实（自觉不是机制，核实才是）
export function startVerify(card: Card) {
  transition(card, "verifying");
}

export function completeTask(card: Card, method: "镜头核实" | "拍照核实") {
  transition(card, "confirmed");
  light.add(1, "任务卡完成 · " + method);
}

// 悟见卡（行为事实镜像，只对自己可见）
export function drawMirrorCard(): Card {
  const card: Card = {
    id: "mirror-" + ++seq, kind: "mirror",
    title: "上周你有 4 天 23 点后还在客厅",
    body: "是这样吗？不评判、不标签，附证据可查看。",
    status: "fresh", createdAt: Date.now(),
  };
  cards.unshift(card);
  emit();
  return card;
}

export async function answerMirror(card: Card, ans: "是" | "不是") {
  transition(card, "confirmed");
  await ledger.append(card.title + " → 本人确认：" + ans, "活动日志 · 悟见卡", "本人");
}
