// 设备适配层：决赛接入官方 Web SDK 只需实现这个接口
// 官方管道（《智能安防赛道：工具及demo宣讲》§4.2/§4.3）：
//   Web SDK: init → createTransport(SN) → startStream → LocalPlayer.play → 截图帧 → AI
//   App SDK: ESIotEventManager.fetchEventListBy → getThumbnailPath → getImageBase64By → AI
export interface DeviceAdapter {
  name: string;
  /** 拉取事件列表（决赛：App SDK 事件管道；现在：模拟事件源） */
  fetchEvents(since: number): Promise<import("../core/types").DeviceEvent[]>;
  /** 采集一帧画面（决赛：Web SDK 取流截图；现在：占位渐变色） */
  captureFrame(eventId: string): Promise<string>;
}
