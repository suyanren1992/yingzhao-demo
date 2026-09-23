# 映照 · Demo（前端骨架 + 引擎）

> AI 发现事实，家人确认意义。—— 模拟事件源驱动的可运行骨架，决赛接入官方 SDK 只需替换适配层。

## 运行

```bash
pnpm install   # 或 npm install
pnpm dev       # localhost:5173
```

## 架构（轻接入、重闭环）

```
src/
  core/            # 与设备无关的业务引擎（纯 TS，可单测）
    types.ts       # 领域类型：DeviceEvent / Card / LedgerEntry
    engine.ts      # 事件→卡片引擎：复核分级、打扰预算（每天≤3张）、灯火规则
    ledger.ts      # 家庭记忆账本：SHA-256 追加式哈希链（Web Crypto）
  adapters/        # 设备接入层 —— 决赛替换的唯一位置
    types.ts       # DeviceAdapter 接口：fetchEvents / captureFrame
    mock.ts        # 模拟事件源（当前驱动开发与录视频）
    websdk.ts      # 决赛适配层 stub（按《智能安防赛道：工具及demo宣讲》§4.2/§4.3 实现）
  ui/              # React 组件（手机壳 PWA 形态）
```

## 决赛接入路径（已按官方文档标注）

1. `npm i @webiot/features`（或 script 标签引入 UMD `window.WebSDK`）
2. `init(8参数) → createTransport(SN) → startStream → LocalPlayer.play`
3. 采集图片帧 → Nova Pro / Qwen3.8-Max 场景理解（Router 网关，OpenAI 兼容协议）
4. 事件触发：App SDK `ESIotEventManager.fetchEventListBy → getThumbnailPath → getImageBase64By`
5. 实现 `DeviceAdapter`，在 `App.tsx` 替换 `new MockAdapter()` 即可

## 已实现的机制

- 确认即理解：时刻卡 竞猜→揭开→回应→回执→本人确认入册（SHA-256 哈希链）
- 灯火：任务卡完成/时刻被确认 +1；不排名不对比不兑钱
- 悟见卡：行为事实"是/不是"确认后入册
- 打扰预算：每天最多 3 张时刻卡
- 沉默权：线索可保持匿名、安静过期
