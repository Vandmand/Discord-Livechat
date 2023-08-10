"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordMessage = void 0;
const main_1 = require("./main");
const DiscordMessage = (from, body) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO Guilds, channels, and pings in variables
    const req = (yield main_1.client.rest.get('/guilds/1125181937535959172/channels'));
    const channelExists = req.find((channel) => channel.name == from.toLowerCase());
    if (!channelExists) {
        const newChannel = yield main_1.client.rest.post('/guilds/1125181937535959172/channels', {
            body: {
                name: from,
            }
        });
        main_1.client.rest.post(`/channels/${newChannel.id}/messages`, {
            body: { content: `# NEW MESSAGE: From ${from} \n <@615477234072813569>` }
        });
        return;
    }
    main_1.client.rest.post(`/channels/${channelExists.id}/messages`, {
        body: { content: `${body} \n <@615477234072813569>` }
    });
});
exports.DiscordMessage = DiscordMessage;
