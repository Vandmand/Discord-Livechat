import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import commands from './commands';

dotenv.config();

const main = async () => {
  
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);
  
  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(process.env.APP_ID as string), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

main();
