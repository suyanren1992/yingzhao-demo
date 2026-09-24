import { cards } from "../core/engine";

export function Timeline() {
  const confirmed = cards.filter(c => c.status === "confirmed");
  return (
    <div>
      <h2 className="page-title">家庭时间线</h2>
      {confirmed.length === 0 && <p className="empty">确认入册的时刻会出现在这里,成为这个家的共同记忆。</p>}
      {confirmed.map(c => (
        <div key={c.id} className="tl-item">
          <span className="tl-dot lantern-color">·</span>
          <div><b>{c.title}</b><br /><small>{new Date(c.createdAt).toLocaleString("zh-CN")}</small></div>
        </div>
      ))}
    </div>
  );
}
