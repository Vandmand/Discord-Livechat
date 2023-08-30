"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const apiconfig_json_1 = __importDefault(require("./apiconfig.json"));
exports.client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildPresences,
    ],
});
exports.client.on("ready", () => {
    console.log("Bot Ready");
});
exports.client.on('presenceUpdate', (presence) => {
    console.log(presence);
});
exports.client.login(apiconfig_json_1.default.token);
