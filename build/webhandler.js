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
exports.messageFrontEnd = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bodyParser = require("body-parser");
const webcommands_1 = require("./webcommands");
const node_events_1 = __importDefault(require("node:events"));
dotenv_1.default.config();
const App = (0, express_1.default)();
const Port = process.env.PORT;
const jsonParser = bodyParser.json();
App.listen(Port, () => {
    console.log('Server Ready');
});
//TODO Make POST response restful
App.post("/msg", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    if (!body.from || !body.msg) {
        res.end("Invalid Arguments");
    }
    (0, webcommands_1.DiscordMessage)(body.from, body.msg);
    res.end("Message Success");
}));
const FrontEndEmitter = new node_events_1.default();
const messageFrontEnd = (message) => {
    FrontEndEmitter.emit('message', message);
};
exports.messageFrontEnd = messageFrontEnd;
App.get('/msg-stream', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    FrontEndEmitter.on('message', (message) => {
        res.write(message);
    });
}));
