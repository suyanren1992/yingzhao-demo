import { Icon } from "./Icon";

const ITEMS = [
  { name: "蓝色水杯", zone: "厨房台面", time: "今天 18:23", note: "附画面片段" },
  { name: "保温杯", zone: "书房书架第二层", time: "3 天前", note: "沉睡 96 天" },
  { name: "电视遥控器", zone: "客厅沙发缝隙", time: "2 小时前", note: "" },
];

export function ItemsView() {
  return (
    <div>
      <h2 className="page-title">物品记忆</h2>
      <div className="search-mock">
        <Icon name="pin" size={16} />
        <span>试试：蓝色水杯在哪？</span>
      </div>
      <div className="answer">
        <b>蓝色水杯</b>最后一次看到：<b>厨房台面 · 今天 18:23</b>
        <p className="evidence">时间 · 证据 · 信息缺口 · 下一步——"18:40 后进入盲区，无法确认"比假装全知更建立信任</p>
      </div>
      <h3 className="sub">食材（台面自动扫描 · 18:12）</h3>
      <div className="answer food">
        <Icon name="food" size={16} />
        <span>土豆 ×3 · 牛腩 ×1 · 鸡蛋半盒——想做土豆牛腩？<b>家里还有结余土豆</b>，不用买</span>
      </div>
      <h3 className="sub">常找的几样</h3>
      {ITEMS.map((it, i) => (
        <div key={i} className="tl-item">
          <span className="tl-dot"><Icon name="pin" size={14} /></span>
          <div><b>{it.name}</b> · {it.zone}<br /><small>{it.time}{it.note ? " · " + it.note : ""}</small></div>
        </div>
      ))}
    </div>
  );
}
