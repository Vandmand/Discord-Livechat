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
exports.WsServer = exports.people = void 0;
const apiconfig_json_1 = __importDefault(require("./apiconfig.json"));
const bot_1 = require("./bot");
const webcommands_1 = require("./webcommands");
const ws_1 = __importDefault(require("ws"));
exports.people = [];
const port = apiconfig_json_1.default.port;
exports.WsServer = new ws_1.default.Server({
    port: port,
});
exports.WsServer.on("listening", () => {
    console.log("server open on localhost:" + port);
});
exports.WsServer.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const newChannel = (yield (0, webcommands_1.initConnection)()).id;
    const newSocket = {
        socket: socket,
        id: newChannel,
    };
    socket.on("message", (message) => {
        const data = JSON.parse(message.toString());
        console.log(data);
        (0, webcommands_1.handleData)(newSocket, data);
    });
    bot_1.client.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
        const last = (yield (0, webcommands_1.getMessage)(newSocket.id))[0];
        if (last.author.bot) {
            return;
        }
        if (last.channel_id != newSocket.id) {
            return;
        }
        socket.send(JSON.stringify({ command: "message", body: { message: message.content } }));
    }));
    socket.on("close", () => {
        (0, webcommands_1.deleteChannel)(newSocket.id);
    });
}));
