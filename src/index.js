// import bot token from .env file
require('dotenv').config();

// import discord.js module
const { Client, GatewayIntentBits} = require('discord.js');

// configure permissions(intents)
const client = new Client({intents: 
    [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.GuildScheduledEvents,
    ],
});

// log in with token from .env file
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

// client.login
client.login(process.env.TOKEN)
// create key for speaking to bot

// set bot trigger
prefix = ('!');

// text responses to specific words or phrases typed in Discord
client.on("message", message => {
    if (message.content.startsWith(prefix + "1"))
        { client.channels.cache.get(1048088123478908990).send('1');
    }
    if (message.content.startsWith(prefix + "2"))
        { client.channels.cache.get(1048088123478908990).send('2');
    }
    if (message.content.startsWith(prefix + "3"))
        { client.channels.cache.get(1048088123478908990).send('3');
    }
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('Pong!');
  }
});
