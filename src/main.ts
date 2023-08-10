import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { messageFrontEnd } from "./webhandler";

dotenv.config();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent
  ],
});

client.on("ready", () => {
  console.log("Bot Ready");
});

client.on("messageCreate", async (message) => {
  messageFrontEnd(message.content);
});

client.login(process.env.TOKEN as string);
