import Config from "./apiconfig.json";
import { client } from "./bot";
import { main } from "./test.dev";
import { deleteChannel, getMessage, handleData, initConnection } from "./webcommands";
import ws from "ws";

export interface Person {
  socket: ws;
  id: string;
}

export let people: Person[] = [];

const port = Config.port;
export const WsServer = new ws.Server({
  port: port,
});

WsServer.on("listening", () => {
  console.log("server open on localhost:" + port);
});

WsServer.on("connection", async (socket) => {
  const newChannel = (await initConnection()).id;

  const newSocket: Person = {
    socket: socket,
    id: newChannel,
  };

  socket.on("message", (message) => {
    const data = JSON.parse(message.toString());
    console.log(data);
    handleData(newSocket, data);
  });

  client.on("messageCreate", async (message) => {
    const last = ((await getMessage(newSocket.id)) as any[])[0];

    if (last.author.bot) {return;}
    if (last.channel_id != newSocket.id) {return;}

    socket.send(JSON.stringify({command:"message", body: {message: message.content}}));
  });

  socket.on("close", () => {
    deleteChannel(newSocket.id)
  });
});
