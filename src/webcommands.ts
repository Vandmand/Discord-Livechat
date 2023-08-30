import { client } from "./bot";
import Config from "./apiconfig.json";
import { Person } from ".";
import { Channel } from "discord.js";

/**
 * Creates a new discord channel with random name
 * @returns Discord channel
 */
export const initConnection = async () => {
  const randomNumber = Math.floor(Math.random() * 10000);

  const newChannel = (await client.rest.post(
    `/guilds/${Config.guildID}/channels`,
    {
      body: {
        name: "New Connection" + randomNumber,
      },
    }
  )) as Channel;

  return newChannel;
};

/**
 * Gets last message in channel
 * @param id Channel id
 * @returns message object
 */

export const getMessage = async (id: string) => {
  return client.rest.get(`/channels/${id}/messages`, {body: {limit: 1}})
}

/**
 * Deletes channel
 * @param id Channel id
 */

export const deleteChannel = (id: string) => {
 return client.rest.delete(`/channels/${id}`)
}

const discordMessage = async (id: string, message: string) => {
  const channel = await client.rest.get(`/channels/${id}`);
  if (!channel) {
    throw new Error("No channel with that id");
  }

  client.rest.post(`/channels/${id}/messages`, {
    body: { content: message },
  });

  return;
};

const updateName = async (id: string, name: string ) => {
  return client.rest.patch(`/channels/${id}`, {body: {name: name}})
}

const getPresence = (guildID: string) => {
  client.rest.get(`/guilds/${guildID}/members`).then(
    (members) => {console.log(members)}
  )
  
}

getPresence(Config.guildID);

export const handleData = (socket: Person, data: any) => {
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
