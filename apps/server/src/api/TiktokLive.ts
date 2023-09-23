import { WebcastPushConnection } from "tiktok-live-connector";
import fs from "fs/promises";

interface ChatMessage {
  type: "chat";
  username: string;
  message: string;
}

interface GiftMessage {
  type: "gift";
  username: string;
  giftName: string;
}

type Message = ChatMessage | GiftMessage;

class TiktokLive {
  private tiktokUsername: string;
  private connection: WebcastPushConnection;
  private messages: Message[] = [];

  constructor(uniqueId: string) {
    this.tiktokUsername = uniqueId;
    this.connection = new WebcastPushConnection(uniqueId);
  }

  async connect(): Promise<void> {
    try {
      const state = await this.connection.connect();
      console.info(`Connected to roomId ${state.roomId}`);

      this.connection.on("chat", (data) => {
        this.chat(data);
      });

      this.connection.on("gift", (data) => {
        this.gift(data);
      });
    } catch (err) {
      console.error("Failed to connect", err);
    }
  }

  private chat(data: { uniqueId: string; comment: string }): void {
    const message: ChatMessage = {
      type: "chat",
      username: data.uniqueId,
      message: data.comment,
    };
    this.messages.push(message);

    // Verificar se o número de mensagens atingiu 100
    if (this.messages.length >= 100) {
      // Limpar o array de mensagens
      this.messages = [];
      // Salvar um arquivo JSON vazio
      this.sendToJson();
    } else {
      this.sendToJson();
    }
  }

  private gift(data: { uniqueId: string; giftId: string }): void {
    const message: GiftMessage = {
      type: "gift",
      username: data.uniqueId,
      giftName: data.giftId,
    };
    this.messages.push(message);
    this.sendToJson();
  }

  private async sendToJson(): Promise<void> {
    console.log(this.messages.length);
    try {
      await fs.writeFile("live-messages.json", JSON.stringify(this.messages, null, 2));
    } catch (err) {
      console.error("Failed to save messages to JSON", err);
    }
  }
}

export default TiktokLive;
