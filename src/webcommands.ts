import { client } from "./main"

export const DiscordMessage = async (from: string, body: string ) => {

  //TODO Guilds, channels, and pings in variables

  const req = (await client.rest.get('/guilds/1125181937535959172/channels')) as any[]
  const channelExists = req.find((channel) => channel.name == from.toLowerCase());

  if(!channelExists) {
    const newChannel = await client.rest.post('/guilds/1125181937535959172/channels', {
      body: {
        name: from,
      }
    }) as any
    client.rest.post(`/channels/${newChannel.id}/messages`, {
      body: {content: `# NEW MESSAGE: From ${from} \n <@615477234072813569>`}
    });

    return
  } 
  client.rest.post(`/channels/${channelExists.id}/messages`, {
    body: {content: `${body} \n <@615477234072813569>`}
  });
}