import { Client, GatewayIntentBits } from "discord.js";
import Config from "./apiconfig.json";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
});

client.on("ready", () => {
  console.log("Bot Ready");
});

client.on('presenceUpdate', (presence) => {
  console.log(presence)
})

client.login(Config.token as string);
