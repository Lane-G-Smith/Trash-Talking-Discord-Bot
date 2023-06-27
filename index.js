// import bot token from .env file
const TOKEN = require('dotenv').config();
const SECRET_KEY = require('dotenv').config();

// import discord.js module
const {Client,GatewayIntentBits} = require('discord.js');

// not sure what this does
const { json } = require('stream/consumers');

// import openai module, key, new config
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

// configure permissions(intents)
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
	]
});

// log successful login
client.on("ready", () => {
  console.log(`Fuck You!! Logged in as ${client.user.tag}!`);
});

// basic api call switch
client.on("messageCreate", async function (message) {
 try{
	switch (message.content.toLowerCase().includes) {
		case 'insult':
			dumbInsult().then((data) =>
				message.reply(`Insulting people huh? well ${data.insult}`)
			);
			break;
		case 'mom':
			momJoke().then((data) =>
				message.reply(`Speaking of moms, ${data.joke}`)
			);
			break;
		case 'awesome':
			chuckNorris().then((data) =>
				message.reply(`You think you know what awesome is? ${data.value}`)
			);
			break;
		case 'deep':
			kanye().then((data) =>
				message.reply(
					`Deep you say? Well, ${data.quote} ............... K a n y e  W e s t`
				)
			);
			break;
		case 'politics':
			trump().then((data) =>
				message.reply(
					`So you wanna talk politics? Well, did you hear this? ${data.value} ............... D o n a l d  T r u m p`
				)
			);
			break;
		case 'fact':
			useless().then((data) =>
				message.reply(
					`Here's a fun fact. {data.text} ............... Y o u r ' e  W e l c o m e`
				)
			);
			break;
		case 'manly':
			ron().then((data) =>
				message.reply(
					`Speaking of Men and manly things, ${data} ............... R o n  S w a n s o n`
				)
			);
			break;
    		case 'dick':
			askdick().then((completion) =>
      message.reply(`${completion.data.choices[0].message.content}`)
			);
			break;
        }}
        catch (error) {
            console.log(error);
        }
});


// dumb insults
async function dumbInsult() {
  let response = await fetch(
    "https://evilinsult.com/generate_insult.php?lang=en&type=json"
  );
  let data = await response.json();
  return data;
}

// mom jokes
async function momJoke() {
  let response = await fetch("https://api.yomomma.info/");
  let data = await response.json();
  return data;
}

// Chuck Norris Jokes
async function chuckNorris() {
  let response = await fetch("https://api.chucknorris.io/jokes/random/");
  let data = await response.json();
  return data;
}

// Kanye quotes
async function kanye() {
  let response = await fetch("https://api.kanye.rest/");
  let data = await response.json();
  return data;
}

// Trump Tweets
async function trump() {
  let response = await fetch("https://tronalddump.io/random/quote");
  let data = await response.json();
  return data;
}

// useless facts
async function useless() {
  let response = await fetch(
    "https://uselessfacts.jsph.pl/random.json?language=en"
  );
  let data = await response.json();
  return data;
}

// Ron Swanson quotes
async function ron() {
  let response = await fetch(
    "http://ron-swanson-quotes.herokuapp.com/v2/quotes"
  );
  let data = await response.json();
  return data;
}

// gpt 3.5 turbo chatbot
async function askdick() {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
    {
      role: "system",
      content:
      "your name is Dick. You have a very rude personality and always respond with sarcasm, attitude, rudeness, shit talking, insults, and personal attacks. You constantly use curse words such as asshole, dickhead, douchebag, fuckface, bitch, chode, dumbass, etc. and so on",
    },
    {
      role: "user",
      content: "Please tell me what state the Grand Canyon is in",
    },
    { 
      role: "assistant", 
      content: "Arizona dumbass, everyone knows that" 
    },
    {
      role: "user",
      content: "how are you doing today?",
    },
    { 
      role: "assistant", 
      content: "Physically? Mentally? Spiritually? Financially? Socioeconomically? I am not sure what you mean but the answer to all of the above is shitty as usual" 
    },
    { 
      role: "user", 
      content: `${interaction.content}` 
    },
    ],
  });
  return completion;
};

// bot login
client.login(process.env.TOKEN);
