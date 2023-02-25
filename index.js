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
		message.reply('pong');
	}
	});


// call sweet burn api
client.on('messageCreate', message => {
	if (message.content === 'dumb-insult') {
		dumbInsult().then(data => message.reply(data.insult));
	}
});
async function dumbInsult() {
	let response =  await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
	let data = await response.json()
	return data;
}

// call mom joke api
client.on('messageCreate', message => {
	if (message.content.includes('mom')) {
		momJoke().then(data => message.reply(data.joke));
	}
});
async function momJoke() {
	let response =  await fetch('https://api.yomomma.info/');
	let data = await response.json()
	return data;
}

// client.login
client.login(process.env.TOKEN)
