import type { Card } from "../core/types";
import { transition, confirmCard, drawTaskCard, drawMirrorCard, startVerify, completeTask, answerMirror } from "../core/engine";
import { Icon } from "./Icon";

function verifyFlow(card: Card, method: "镜头核实" | "拍照核实") {
  startVerify(card);
  // 模拟镜头核实耗时：真实实现 = Web SDK 截图帧 → AI 复核
  setTimeout(() => completeTask(card, method), 2200);
}

const GUESS = ["爸爸", "妈妈", "孩子", "直接揭开"];

export function CardView({ card }: { card: Card }) {
  if (card.kind === "moment") return <MomentCard card={card} />;
  if (card.kind === "task") return <TaskCard card={card} />;
  return <MirrorCard card={card} />;
}

function MomentCard({ card }: { card: Card }) {
  const ev = card.event;
  return (
    <article className={"card moment " + card.status}>
      <header><Icon name="lantern" size={15} /> 时刻卡 <time>{new Date(card.createdAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</time></header>
      {(card.status === "fresh" || card.status === "guessing") && (
        <>
          <h3>{card.title}</h3>
          <p className="evidence"><Icon name="camera" size={13} /> 镜头看到:{ev?.caption}({ev?.zone} · 四证据帧复核通过)</p>
          <div className="comic">
            {(ev?.frames ?? ["#eee", "#ddd", "#ccc", "#bbb"]).map((f, i) => (
              <div key={i} className="frame" style={{ background: "linear-gradient(150deg," + f + ",#fff3)" }}>{["🍳", "🥬", "🔥", "🍲"][i]}</div>
            ))}
          </div>
          <p className="hint">猜猜是谁?也可以直接揭开</p>
          <div className="row">
            {GUESS.map(g => (
              <button key={g} onClick={() => transition(card, "revealed")}>{g}</button>
            ))}
          </div>
        </>
      )}
      {card.status === "revealed" && (
        <>
          <div className="comic big">
            {(ev?.frames ?? ["#eee"]).map((f, i) => (
              <div key={i} className="frame" style={{ background: "linear-gradient(150deg," + f + ",#fff3)" }}>{["🍳", "🥬", "🔥", "🍲"][i]}</div>
            ))}
          </div>
          <h3 className="reveal">是<b>家人</b> —— {ev?.caption}</h3>
          <p className="hint">用你们家自己的风格回应一句吧(系统只呈现事实,永远不替人表达)</p>
          <div className="row">
            {["辛苦了 ❤️", "今晚一定很好吃", "我来摆碗筷!"].map(r => (
              <button key={r} className="soft" onClick={() => transition(card, "responded")}>{r}</button>
            ))}
          </div>
        </>
      )}
      {card.status === "responded" && (
        <>
          <div className="receipt"><Icon name="lantern" size={16} /> 已私达给当事人<br /><small>TA 收到一条仅本人可见的"被看见回执"</small></div>
          <div className="row">
            <button onClick={() => confirmCard(card, "当事人")}>当事人确认入册(+1 灯火)</button>
            <button className="ghost" onClick={() => transition(card, "expired")}>保持沉默</button>
          </div>
        </>
      )}
      {card.status === "confirmed" && <div className="receipt done">✓ 已确认入册 · 灯火 +1(奖励"被看见",不是"猜对")</div>}
      {card.status === "expired" && <div className="receipt quiet">这条线索保持匿名,安静过期。</div>}
    </article>
  );
}

function TaskCard({ card }: { card: Card }) {
  return (
    <article className={"card task " + card.status}>
      <header><Icon name="card" size={15} /> 任务卡</header>
      {card.status === "fresh" && (
        <>
          <h3>{card.title}</h3>
          <p className="evidence">{card.body}</p>
          <p className="verify-note"><Icon name="camera" size={12} /> {card.verify}——自觉不是机制,核实才是</p>
          <div className="row">
            <button onClick={() => verifyFlow(card, "镜头核实")}>我在镜头前完成</button>
            <button className="soft" onClick={() => verifyFlow(card, "拍照核实")}>视野外完成 · 拍照核实</button>
            <button className="ghost" onClick={() => transition(card, "skipped")}>跳过(永远可跳过)</button>
          </div>
        </>
      )}
      {card.status === "verifying" && (
        <div className="verifying">
          <div className="scan"><Icon name="camera" size={30} /></div>
          <p><b>智能镜头核实中…</b></p>
          <p className="hint">画面帧 → AI 复核 → 确认时长与动作</p>
        </div>
      )}
      {card.status === "confirmed" && <div className="receipt done">✓ 已核实(画面证据已附) · 灯火 +1 · AI 提议、镜头核实、人确认</div>}

      {card.status === "skipped" && <div className="receipt quiet">已跳过,没有惩罚、没有连续打卡压力。</div>}
    </article>
  );
}

function MirrorCard({ card }: { card: Card }) {
  return (
    <article className={"card mirror " + card.status}>
      <header><Icon name="mirror" size={15} /> 悟见卡 <small>只对你可见</small></header>
      {card.status === "fresh" && (
        <>
          <h3>{card.title}</h3>
          <p className="evidence">{card.body}</p>
          <div className="row">
            <button onClick={() => answerMirror(card, "是")}>是</button>
            <button className="ghost" onClick={() => answerMirror(card, "不是")}>不是</button>
          </div>
        </>
      )}
      {card.status === "confirmed" && <div className="receipt done">✓ 已确认入册 · AI 对你的认识,来自你自己确认过的事实</div>}
    </article>
  );
}

export function DrawButtons() {
  return (
    <div className="row draw">
      <button onClick={drawTaskCard}><Icon name="card" size={14} /> 抽一张任务卡</button>
      <button onClick={drawMirrorCard}><Icon name="mirror" size={14} /> 看看镜子</button>
    </div>
  );
}
