import express from "express";
import dotenv from "dotenv";
import bodyParser = require("body-parser");
import { DiscordMessage } from "./webcommands";
import EventEmitter from 'node:events'

dotenv.config();

const App = express();
const Port = process.env.PORT;

const jsonParser = bodyParser.json();

App.listen(Port, () => {
  console.log('Server Ready')
});

//TODO Make POST response restful
App.post("/msg", jsonParser, async (req, res) => {
  const body = await req.body;

  if(!body.from || !body.msg) {
    res.end("Invalid Arguments")
  }

  DiscordMessage(body.from, body.msg);

  res.end("Message Success");
});

const FrontEndEmitter = new EventEmitter();

export const messageFrontEnd = (message: string) => {
  FrontEndEmitter.emit('message', message)
}

App.get('/msg-stream', async (req, res) => {
  FrontEndEmitter.on('message', (message) => {
    res.write(message);
  })
})

App.get('/test', async (req, res) => {
  res.status(200).send('This is the api')
})