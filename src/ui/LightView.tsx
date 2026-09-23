import { light } from "../core/engine";

export function LightView() {
  return (
    <div>
      <h2 className="page-title">灯火</h2>
      <div className="flame-big">🕯️</div>
      <p className="balance-big">{light.balance}</p>
      <p className="evidence">只进个人账本 · 全家不排名不对比 · 永不兑换真实金钱 · 可兑换家庭特权(决定周末活动、免一次家务、一次"爸妈陪我玩")</p>
      <h3 className="sub">流水</h3>
      {light.txs.length === 0 && <p className="empty">完成任务卡、时刻被确认,都会点亮灯火。</p>}
      {light.txs.map((t, i) => (
        <div key={i} className="tx"><span>+{t.delta} 🕯️</span> {t.reason}<small>{new Date(t.ts).toLocaleTimeString("zh-CN")}</small></div>
      ))}
    </div>
  );
}
