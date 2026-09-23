// 决赛适配层（stub）——按官方文档实现 DeviceAdapter 即可无缝替换 MockAdapter
// 步骤（《智能安防赛道：工具及demo宣讲》）：
//  1. npm i @webiot/features（或 script 标签引入 UMD: window.WebSDK）
//  2. init(8参数) → createTransport(SN) → startStream → LocalPlayer.play
//  3. 采集图片帧 → Nova Pro / Qwen3.8-Max 生成场景描述（Router 网关，OpenAI 兼容协议）
//  4. 事件触发：App SDK ESIotEventManager.fetchEventListBy → getThumbnailPath → getImageBase64By
// import { DeviceAdapter } from "./types";
// export class WebSdkAdapter implements DeviceAdapter { ... }
export {};
