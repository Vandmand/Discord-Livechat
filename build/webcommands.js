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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleData = exports.deleteChannel = exports.getMessage = exports.initConnection = void 0;
const bot_1 = require("./bot");
const apiconfig_json_1 = __importDefault(require("./apiconfig.json"));
/**
 * Creates a new discord channel with random name
 * @returns Discord channel
 */
const initConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const randomNumber = Math.floor(Math.random() * 10000);
    const newChannel = (yield bot_1.client.rest.post(`/guilds/${apiconfig_json_1.default.guildID}/channels`, {
        body: {
            name: "New Connection" + randomNumber,
        },
    }));
    return newChannel;
});
exports.initConnection = initConnection;
/**
 * Gets last message in channel
 * @param id Channel id
 * @returns message object
 */
const getMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return bot_1.client.rest.get(`/channels/${id}/messages`, { body: { limit: 1 } });
});
exports.getMessage = getMessage;
/**
 * Deletes channel
 * @param id Channel id
 */
const deleteChannel = (id) => {
    return bot_1.client.rest.delete(`/channels/${id}`);
};
exports.deleteChannel = deleteChannel;
const discordMessage = (id, message) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = yield bot_1.client.rest.get(`/channels/${id}`);
    if (!channel) {
        throw new Error("No channel with that id");
    }
    bot_1.client.rest.post(`/channels/${id}/messages`, {
        body: { content: message },
    });
    return;
});
const updateName = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    return bot_1.client.rest.patch(`/channels/${id}`, { body: { name: name } });
});
const getPresence = (guildID) => {
    bot_1.client.rest.get(`/guilds/${guildID}/members`).then((members) => { console.log(members); });
};
getPresence(apiconfig_json_1.default.guildID);
const handleData = (socket, data) => {
    switch (data.command) {
        case "message":
            return discordMessage(socket.id, data.body.message);
        case "update-name":
            return updateName(socket.id, data.body.name);
        case "close":
            break;
        default:
            throw new Error("No command match");
    }
};
exports.handleData = handleData;
