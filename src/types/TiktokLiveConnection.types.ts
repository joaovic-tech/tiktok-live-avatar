import { WebcastPushConnection } from "tiktok-live-connector";

export interface TikTokLiveConnection extends WebcastPushConnection {
  on(event: string, callback: (data: any) => void): void;
}
