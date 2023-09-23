import { FastifyInstance } from "fastify";
import fs from "fs/promises";
import chokidar from "chokidar";

let json: string = "[]"; // Inicialmente, o JSON é uma matriz vazia

export async function getAllChat(app: FastifyInstance) {
  // Rota para obter as mensagens de chat
  app.get("/chat", async (request, reply) => {
    // Filtre apenas as mensagens do tipo "chat" antes de enviar a resposta
    const chatMessages = filterChatMessages(json);
    return reply.send(chatMessages);
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

// Função para filtrar as mensagens do tipo "chat"
function filterChatMessages(jsonString: string): string {
  try {
    const messages = JSON.parse(jsonString);
    const chatMessages = messages.filter((message: any) => message.type === "chat");
    return JSON.stringify(chatMessages);
  } catch (err) {
    console.error("Failed to filter chat messages", err);
    return "[]"; // Retorna um array vazio em caso de erro
  }
}
