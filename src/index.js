// import bot token from .env file
const TOKEN = require('dotenv').config();

// import commands
require("./commands/ping");

// not sure
const fs = require('node:fs');

// I don't know
const path = require('node:path');


// import discord.js module
const { Client, Collection, Events, GatewayIntentBits} = require('discord.js');

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

// attach .commands to client instance to access in other files
client.commands = new Collection();

// log in with token from .env file
client.on('ready', () => {
    console.log(`Main page works! Logged in as ${client.user.tag}!`)
});

// client.login
client.login(process.env.TOKEN)
// create key for speaking to bot

// retrieve all event files in events folder
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(error);
	}
});










client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName == 'ping') {
		await interaction.reply('Pong!');
		await interaction.followUp('Pong again!');
	}
});