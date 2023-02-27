// import bot token from .env file
const TOKEN = require('dotenv').config();

// import discord.js module
const {Client, GatewayIntentBits} = require('discord.js');
const { json } = require('stream/consumers');

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
    console.log(`Fuck You!! Logged in as ${client.user.tag}!`)
});

// call sweet burn api
client.on('messageCreate', message => {
	if (message.content.toLowerCase() === 'dumb-insult') {
		dumbInsult()
		.then(data => message.reply(data.insult));
	}
});
async function dumbInsult() {
	let response =  await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
	let data = await response.json()
	return data;
}

// call mom joke api
client.on('messageCreate', message => {
	if (message.content.toLowerCase().includes('mom')) {
		momJoke()
		.then(data => message.reply(data.joke));
	}
});
async function momJoke() {
	let response =  await fetch('https://api.yomomma.info/');
	let data = await response.json()
	return data;
}

// call Chuck Norris Joke api
client.on('messageCreate', message => {
	if (message.content.toLowerCase().includes('-chuck')) {
		chuckNorris()
		.then(data => message.reply(data.value));
	}
});
async function chuckNorris() {
	let response =  await fetch('https://api.chucknorris.io/jokes/random/');
	let data = await response.json()
	return data;
}

// call Kanye quote api
client.on('messageCreate', message => {
	if (message.content.toLowerCase().includes('kanye')) {
		kanye()
		.then(data => message.reply(data.quote + " ............... K a n y e  W e s t"));
	}
});
async function kanye() {
	let response =  await fetch('https://api.kanye.rest/');
	let data = await response.json()
	return data;
}

// call Trump quote api
client.on('messageCreate', message => {
	if (message.content.toLowerCase().includes('donald')) {
		trump()
		.then(data => message.reply((data.value) + " ............... D o n a l d  T r u m p"));
	}
});
async function trump() {
	let response =  await fetch('https://tronalddump.io/random/quote');
	let data = await response.json()
	return data;
}

// call useless fact api
client.on('messageCreate', message => {
	if (message.content.toLowerCase().includes('useless')) {
		useless()
		.then(data => message.reply((data.text) + (" ............... Y o u r ' e  W e l c o m e")));
	}
});
async function useless() {
	let response =  await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
	let data = await response.json()
	return data;
}

// call Ron Swanson quote api
client.on('messageCreate', message => {
	if (message.content.toLowerCase().includes('ron')) {
		ron()
		.then(data => message.reply((data) + (" ............... R o n  S w a n s o n")));
	}
});
async function ron() {
	let response =  await fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes');
	let data = await response.json()
	return data;
}

// Fuck off as a service api
// client.on('messageCreate', message => {
// 	if  (message.content.toLowerCase().includes('chase')) {
// 		toPerson = ("chase");
// 		fromPerson = ("your_mom")
// 		fuckYou()
// 		.then(data => message.reply(data));
// }});
// async function fuckYou() {
// 	let response =  await fetch(`https://foass.1001010.com/you/${toPerson}/${fromPerson}`,
// 		{headers: { 
// 			Accept: "application", "json"
// 	},
// });
// 	let data = await response
// 	return data;
// }

https://foass.1001010.com/you/Brian/Lane
// // call Giphy api
// client.on('messageCreate', message => {
// 	if (message.content.includes('balls')) {
// 		termMeme().then(data => message.reply(data[0].images.original.url));
// 	}
// });
// async function termMeme() {
// 	let response =  await fetch('https://api.giphy.com/v1/gifs/translate?api_key=4U0KfRgkrwJNDx0OHiP3xWhK6jGuklUy&s=balls');
// 	let data = await response.json()
// 	return data;
// }

// client.login
client.login(process.env.TOKEN)