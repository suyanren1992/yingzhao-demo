// 手绘 SVG 图标集：灯火主题，替换 emoji（stroke 风格，currentColor）
export function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "lantern": // 红灯笼：椭圆灯身 + 骨架线 + 上下盖 + 流苏
      return (<svg {...p}>
        <ellipse cx="12" cy="10.5" rx="7" ry="6.5"/>
        <path d="M12 4v13M8.5 4.8c-1.6 3-1.6 8.4 0 11.4M15.5 4.8c1.6 3 1.6 8.4 0 11.4"/>
        <path d="M9 3.2h6M9 17.8h6"/>
        <path d="M12 17.8v2.4M10.6 20.2l1.4 2 1.4-2"/>
      </svg>);
    case "camera": // 镜头
      return (<svg {...p}>
        <rect x="3" y="7" width="18" height="12" rx="2.5"/>
        <circle cx="12" cy="13" r="3.4"/>
        <path d="M8.5 7l1.2-2.2h4.6L15.5 7"/>
      </svg>);
    case "card": // 卡片
      return (<svg {...p}>
        <rect x="4" y="4" width="16" height="16" rx="2.5"/>
        <path d="M8 9h8M8 12.5h8M8 16h4.5"/>
      </svg>);
    case "mirror": // 镜子
      return (<svg {...p}>
        <ellipse cx="12" cy="9" rx="5.5" ry="7"/>
        <path d="M12 16v4M8.5 20h7"/>
        <path d="M9.5 6.5c.8-1 1.8-1.6 3-1.8"/>
      </svg>);
    case "chain": // 账本链环
      return (<svg {...p}>
        <path d="M9.5 14.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 1 0-5-5L10.5 8.5"/>
        <path d="M14.5 9.5a3.5 3.5 0 0 0-5 0L7 12a3.5 3.5 0 1 0 5 5l1.5-1.5"/>
      </svg>);
    case "food": // 食材（带盖锅）
      return (<svg {...p}>
        <path d="M4.5 11h15v4.5a4 4 0 0 1-4 4h-7a4 4 0 0 1-4-4z"/>
        <path d="M7 11a5 5 0 0 1 10 0"/>
        <path d="M12 6v1.5M10 5.5h4"/>
      </svg>);
    case "pin": // 位置
      return (<svg {...p}>
        <path d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21z"/>
        <circle cx="12" cy="10.5" r="2.2"/>
      </svg>);
    case "signal": // 安心信号（屋 + 心跳线）
      return (<svg {...p}>
        <path d="M4 11l8-6.5L20 11"/>
        <path d="M6 10v9h12v-9"/>
        <path d="M9 14.5h2l1-2 1.5 4 1-2H17"/>
      </svg>);
    case "clock":
      return (<svg {...p}>
        <circle cx="12" cy="12" r="8.5"/>
        <path d="M12 7v5l3.5 2"/>
      </svg>);
    default:
      return null;
  }
}
