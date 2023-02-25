// import bot token from .env file
const TOKEN = require('dotenv').config();

// import discord.js module
const {Client, GatewayIntentBits} = require('discord.js');

// configure permissions(intents)
const client = new Client({intents: 
    [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.GuildScheduledEvents,
    ],
});

// log in with token from .env file
client.on('ready', () => {
    console.log(`Main page works! Logged in as ${client.user.tag}!`)
});

// reply to ping with pong
client.on('messageCreate', message => {
	if (message.content === 'ping') {
		message.reply('eat shit');
	}
	});

// client.login
client.login(process.env.TOKEN)
