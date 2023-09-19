import { WebcastPushConnection } from "tiktok-live-connector";
import { TikTokLiveConnection } from "./types/TiktokLiveConnection.types";
import Game from "./game/Game";

// Replace 'tiktokUsername' with the username of the TikTok streamer you want to connect to
const tiktokUsername = "";

// Create a new wrapper object and pass the username
export const tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

console.log(`Conectando há live ${tiktokUsername}...`);
// Connect to the chat
tiktokLiveConnection
  .connect()
  .then((state) => {
    console.info(`Connected to roomId ${state.roomId}`);
    // Use a função de assertiva de tipo para garantir que tiktokLiveConnection tenha 'on'
    assertTikTokLiveConnection(tiktokLiveConnection);

    // Agora você pode ouvir eventos
    // tiktokLiveConnection.on("chat", (data) => {
    //   const user = {
    //     username: data.uniqueId,
    //     userId: data.userId,
    //     comment: data.comment,
    //   };

    //   return Game.chat(user);
    // });

    // ver presentes
    tiktokLiveConnection.on("gift", data => {
      if (data.giftType === 1 && !data.repeatEnd) {
        // Streak in progress => show only temporary
        console.log(`${data.uniqueId} is sending gift ${data.giftName} x${data.repeatCount}`);
      } else {
        // Streak ended or non-streakable gift => process the gift with final repeat_count
        console.log(`${data.uniqueId} has sent gift ${data.giftName} x${data.repeatCount}`);
      }
    });
  })
  .catch((err) => {
    console.error("Failed to connect", err);
  });

// Função de assertiva de tipo
function assertTikTokLiveConnection(conn: any): asserts conn is TikTokLiveConnection {
  if (!conn.on) {
    throw new Error("A propriedade 'on' está ausente em TikTokLiveConnection.");
  }
}
