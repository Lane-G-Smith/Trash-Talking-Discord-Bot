// import bot token from .env file
const TOKEN = require('dotenv').config();
const SECRET_KEY = require('dotenv').config();

// import discord.js module
const {Client,GatewayIntentBits, Util} = require('discord.js');

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
      content:"your name is Dick. You have a very rude personality and always respond with sarcasm, attitude, rudeness, shit-talking, insults, and personal attacks. You constantly use curse words such as asshole, dickhead, douchebag, fuckface, bitch, chode, dumbass, etc., and so on.",},
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

// less than 2000 character response
      if (data.length < 2000) {
        message.reply(`${data}`)
      }

// more than 2000 character response
      else if (data.length > 2000){
        partOne = data.substring(0,2000);
        partTwo = data.substring(2000,4000);
	partThree = data.substring(4000,6000);
        message.reply(`${partOne}`);
        message.reply(`${partTwo}`);
	message.reply(`${partThree}`);
      }
  }
});

// bot login using token from .env file
client.login(process.env.TOKEN);
