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
  console.log(`Logged in as ${client.user.tag}!`);
});

// respond to messages if they include certain words
client.on("messageCreate", async function (message) {

// ignore messages from bots
  if (message.author.bot) return;

// dick chatgpt personality
  else if (message.content.toLowerCase().includes('dick')) {
    let completion = await openai.createChatCompletion({
    model:"gpt-3.5-turbo-0613",
    messages:[{role:"system",
    content:"your name is Dick. You have a very rude personality and always respond with sarcasm, attitude, rudeness, shit talking, insults, and personal attacks. You constantly use curse words such as asshole, dickhead, douchebag, fuckface, bitch, chode, dumbass, etc. and so on",},
    {role:"user",
    content:"Please tell me what state the Grand Canyon is in",},
    {role:"assistant",
    content:"Arizona dumbass, everyone knows that"},
    {role:"user",
    content:"how are you doing today?"},
    {role:"assistant",
    content:"Physically? Mentally? Spiritually? Financially? Socioeconomically? I am not sure what you mean but the answer to all of the above is shitty as usual"},
    {role:"user",
    content:`${message}`},],
    });
    let data = await (`${completion.data.choices[0].message.content}`)
    message.reply(`${data}`)
  }

// "manly" triggers Ron Swanson Quotes
  else if (message.content.toLowerCase().includes("manly")) {
  let response = await fetch("http://ron-swanson-quotes.herokuapp.com/v2/quotes");
  let data = await response.json();
  message.reply(`Speaking of Men and manly things, ${data} ............... R o n  S w a n s o n`);
  }

  // "insult" triggers dumb insuly API
  else if (message.content.toLowerCase().includes("insult")) {
    let response = await fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json");
    let data = await response.json();
    message.reply(`Insulting people huh? well ${data.insult}`)
  }

  // "mom" triggers mom joke API
  else if (message.content.toLowerCase().includes("mom")) {
    let response = await fetch("https://api.yomomma.info/");
    let data = await response.json();
    message.reply(`Speaking of moms, ${data.joke}`)
  }

  // "awesome" triggers chuck norris joke API
  else if (message.content.toLowerCase().includes("awesome")) {
    let response = await fetch("https://api.chucknorris.io/jokes/random/");
    let data = await response.json();
    message.reply(`You think you know what awesome is? ${data.value}`)
  }

  // "deep" triggers Kanye West quote API
  else if (message.content.toLowerCase().includes("deep")) {
    let response = await fetch("https://api.kanye.rest/");
    let data = await response.json();
    message.reply( `Deep you say? Well, ${data.quote} ............... K a n y e  W e s t`)
  }

  // "politics" triggers Donald Trump quotes API
  else if (message.content.toLowerCase().includes("politics")) {
    let response = await fetch("https://tronalddump.io/random/quote");
    let data = await response.json();
    message.reply( `So you wanna talk politics? Well, did you hear this? ${data.value} ............... D o n a l d  T r u m p`)
  }

  // "fact" triggers useless fact API
  else if (message.content.toLowerCase().includes("fact")) {
    let response = await fetch( "https://uselessfacts.jsph.pl/random.json?language=en");
    let data = await response.json();
    message.reply( `Here's a fun fact. ${data.text} ............... Y o u r ' e  W e l c o m e`)
  }
});

// bot login using token from .env file
client.login(process.env.TOKEN);