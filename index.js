// import bot token from .env file
const TOKEN = require('dotenv').config();
const SECRET_KEY = require('dotenv').config();

// import discord.js module
const {Client, GatewayIntentBits} = require('discord.js');
const { json } = require('stream/consumers');

// import openai module, key, new config
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY, });
const openai = new OpenAIApi(configuration);

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
	// ignore input from the bot itself
        if (message.author.bot) return;
	if (message.content.toLowerCase().includes('insult')) {
		dumbInsult()
		.then(data => message.reply(`Insulting people huh? well ${data.insult}`));
	}
});
async function dumbInsult() {
	let response =  await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
	let data = await response.json()
	return data;
}

// call mom joke api
client.on('messageCreate', message => {
	// ignore input from the bot itself
        if (message.author.bot) return;
	if (message.content.toLowerCase().includes('mom')) {
		momJoke()
		.then(data => message.reply(`Speaking of moms, ${data.joke}`));
	}
});
async function momJoke() {
	let response =  await fetch('https://api.yomomma.info/');
	let data = await response.json()
	return data;
}

// call Chuck Norris Joke api
client.on('messageCreate', message => {
	// ignore input from the bot itself
        if (message.author.bot) return;
	if (message.content.toLowerCase().includes('awesome')) {
		chuckNorris()
		.then(data => message.reply(`You think you know what awesome is? ${data.value}`));
	}
});
async function chuckNorris() {
	let response =  await fetch('https://api.chucknorris.io/jokes/random/');
	let data = await response.json()
	return data;
}

// call Kanye quote api
client.on('messageCreate', message => {
	// ignore input from the bot itself
        if (message.author.bot) return;
	if (message.content.toLowerCase().includes('deep')) {
		kanye()
		.then(data => message.reply(`Deep you say? Well, ${data.quote} ............... K a n y e  W e s t`));
	}
});
async function kanye() {
	let response =  await fetch('https://api.kanye.rest/');
	let data = await response.json()
	return data;
}

// call Trump quote api
client.on('messageCreate', message => {
	// ignore input from the bot itself
        if (message.author.bot) return;
	if (message.content.toLowerCase().includes("politics")) {
		trump()
		.then(data => message.reply(`So you wanna talk politics? Well, did you hear this? ${data.value} ............... D o n a l d  T r u m p`));
	}
});
async function trump() {
	let response =  await fetch('https://tronalddump.io/random/quote');
	let data = await response.json()
	return data;
}

// call useless fact api
client.on('messageCreate', message => {
	// ignore input from the bot itself
        if (message.author.bot) return;
	if (message.content.toLowerCase().includes('fact')) {
		useless()
		.then(data => message.reply(`Here's a fun fact. {data.text} ............... Y o u r ' e  W e l c o m e`));
	}
});
async function useless() {
	let response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
	let data = await response.json()
	return data;
}

// call Ron Swanson quote api
client.on('messageCreate', message => {
	// ignore input from the bot itself
        if (message.author.bot) return;
		if (message.content.toLowerCase().includes("man")) {
		ron()
		.then(data => message.reply(`Speaking of Men and manly things, ${data} ............... R o n  S w a n s o n`));
	}
});
async function ron() {
	let response =  await fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes');
	let data = await response.json()
	return data;
}

// function returns AI response every time text is sent to server
client.on('messageCreate', async function (message) {
    try {
        // ignore input from the bot itself
        if (message.author.bot) return;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `You are Dick. Dick Always responds, but does it in a grumpy way with sass, attitude, sarcasm, rudeness, and tons of curse words such as asshole shithead fuckface douchebag dick bitch chode fucker. ${message}`,
            temperature: 0.7,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0.2,
            presence_penalty: 0,
        });
        	message.reply(`${response.data.choices[0].text}`);
		}   
	catch (error) {
        message.reply(`${error}`)
    }
});

// log in with token from .env file
client.login(process.env.TOKEN)
