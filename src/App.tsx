import { useEffect, useState } from "react";
import { cards, onCards, ingestEvent, light } from "./core/engine";
import { ledger } from "./core/ledger";
import { MockAdapter } from "./adapters/mock";
import type { DeviceAdapter } from "./adapters/types";
import { CardView, DrawButtons } from "./ui/CardView";
import { Timeline } from "./ui/Timeline";
import { LedgerView } from "./ui/LedgerView";
import { LightView } from "./ui/LightView";

const adapter: DeviceAdapter = new MockAdapter();

export default function App() {
  const [, force] = useState(0);
  const [tab, setTab] = useState<"cards" | "timeline" | "ledger" | "light">("cards");

  useEffect(() => {
    onCards(() => force(n => n + 1));
    light.subscribe(() => force(n => n + 1));
    ledger.subscribe(() => force(n => n + 1));
    const timer = setInterval(async () => {
      const evs = await adapter.fetchEvents(Date.now());
      evs.forEach(ev => ingestEvent(ev));
    }, 12000);
    adapter.fetchEvents(0).then(evs => evs.slice(0, 1).forEach(ev => ingestEvent(ev)));
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="phone">
      <header className="statusbar">
        <span className="logo">映照</span>
        <span className="motto">AI 发现事实 · 家人确认意义</span>
      </header>
      <main className="screen">
        {tab === "cards" && (
          <div className="card-list">
            <p className="budget">今日卡片 {Math.min(cards.filter(c => c.kind === "moment").length, 3)}/3 · 打扰预算</p>
            <DrawButtons />
            {cards.length === 0 && <p className="empty">正在静静感知这个家……</p>}
            {cards.map(c => <CardView key={c.id} card={c} />)}
          </div>
        )}
        {tab === "timeline" && <Timeline />}
        {tab === "ledger" && <LedgerView />}
        {tab === "light" && <LightView />}
      </main>
      <nav className="tabbar">
        {([["cards", "🕯️ 卡片"], ["timeline", "🕰️ 时间线"], ["ledger", "⛓️ 账本"], ["light", "🪔 灯火"]] as const).map(([k, label]) => (
          <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{label}</button>
        ))}
      </nav>
    </div>
  );
}
