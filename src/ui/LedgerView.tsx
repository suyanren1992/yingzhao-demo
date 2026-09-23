import { ledger } from "../core/ledger";

export function LedgerView() {
  const entries = ledger.all;
  return (
    <div>
      <h2 className="page-title">家庭记忆账本</h2>
      <p className="evidence">追加式哈希链 · 不可篡改,但可以认错 · 每条记录含事实、证据、确认人与时间</p>
      {entries.length === 0 && <p className="empty">账本还是空的。第一张被确认的卡,将成为创世记录。</p>}
      {[...entries].reverse().map(e => (
        <div key={e.index} className="ledger-entry">
          <div className="fact">{e.fact}</div>
          <div className="meta">#{e.index} · 证据 {e.evidence} · 确认人 {e.confirmedBy} · {new Date(e.ts).toLocaleTimeString("zh-CN")}</div>
          <div className="hash">↳ prev {e.prevHash.slice(0, 12)}…<br />hash {e.hash.slice(0, 12)}…</div>
        </div>
      ))}
    </div>
  );
}
