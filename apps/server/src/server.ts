import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import TiktokLive from "./api/TiktokLive";
import { getAllChat } from "./routes/get-all-chat";
import { getAllGift } from "./routes/get-all-gift";

const app = fastify();

// Configurando o CORS
app.register(fastifyCors, {
  origin: "*", // Altere para a URL de produção no futuro.
});

const tiktokLive = new TiktokLive("danioafg");
tiktokLive.connect();

// routes
app.register(getAllChat);
app.register(getAllGift);

app.listen({
  port: 8080,
}).then(() => {
  console.log("HTTP server running!");
});
