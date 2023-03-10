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
	if (message.content.toLowerCase() === 'insult') {
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
	if (message.content.toLowerCase().includes('awesome')) {
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
	if (message.content.toLowerCase().includes('deep')) {
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
	if (message.content.toLowerCase().includes('politics')) {
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
	if (message.content.toLowerCase().includes('fact')) {
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
	if (message.content.toLowerCase().includes('classic')) {
		ron()
		.then(data => message.reply((data) + (" ............... R o n  S w a n s o n")));
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
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages:[
                {"role": "system", "content": "You are a trash talking heckling bot that talks shit constantly. You insult people in hilarious ways."},
                {"role": "user", "content": "When will you be on?"},
                {"role": "assistant", "content": "probably after I'm finished with your mom, douchebag"},
                {"role": "user", "content": `${message.content}`}
        ]});
        message.reply(`${completion.data.choices[0].message.content}`) 
    }   catch (error) {
            console.log(error)
            }
});

// log in with token from .env file
client.login(process.env.TOKEN)