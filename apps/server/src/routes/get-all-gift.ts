import { FastifyInstance } from "fastify";
import fs from "fs/promises";
import chokidar from "chokidar";

let json: string = "[]"; // Inicialmente, o JSON é uma matriz vazia

export async function getAllGift(app: FastifyInstance) {
  // Rota para obter as mensagens de gift
  app.get("/gift", async (request, reply) => {
    // Filtre apenas as mensagens do tipo "gift" antes de enviar a resposta
    const giftMessages = filterGiftMessages(json);
    reply.send(giftMessages);
  });

  // Use o chokidar para observar mudanças no arquivo JSON
  const filePath = "live-messages.json";
  const watcher = chokidar.watch(filePath);

  // Quando o arquivo JSON mudar, atualize a variável 'json'
  watcher.on("change", async () => {
    try {
      json = await fs.readFile(filePath, "utf-8");
    } catch (err) {
      console.error("Failed to read JSON file", err);
    }
  });
}

// Função para filtrar as mensagens do tipo "gift"
function filterGiftMessages(jsonString: string): string {
  try {
    const messages = JSON.parse(jsonString);
    const giftMessages = messages.filter((message: any) => message.type === "gift");
    return JSON.stringify(giftMessages);
  } catch (err) {
    console.error("Failed to filter gift messages", err);
    return "[]"; // Retorna um array vazio em caso de erro
  }
}
