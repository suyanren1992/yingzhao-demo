import { Icon } from "./Icon";

const SIGNALS = [
  { who: "奶奶", text: "今天 7:12 起床（平常 7 点左右）", state: "一切如常", tone: "ok" },
  { who: "孩子", text: "17:42 到家（门口识别）", state: "已到家", tone: "ok" },
  { who: "妈妈", text: "今天 10:04 起床（平常 7 点）", state: "比平时晚——仅告知，无行动要求", tone: "note" },
  { who: "团长", text: "独自在家 9 小时，活动量正常", state: "如常", tone: "ok" },
];

export function SignalsView() {
  return (
    <div>
      <h2 className="page-title">安心信号</h2>
      <p className="evidence">中性事实，不打扰：没有行动按钮、没有回应记录、没有提醒。粒度与"什么算异常"由本人设置并确认。</p>
      {SIGNALS.map((s, i) => (
        <div key={i} className={"signal-row " + s.tone}>
          <span className="sig-icon"><Icon name="signal" size={18} /></span>
          <div>
            <b>{s.who}</b> · {s.text}<br />
            <small>{s.state}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
