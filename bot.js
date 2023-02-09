/* channel ID 1048088123478908990 */

// hide key token in .env file . Won't upload to github
require('dotenv').config();
// this installs the packages and configures permissions(intents)
const { Client, GatewayIntentBits} = require('discord.js');
const client = new Client ({intents: 
    [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.GuildScheduledEvents
    ]
});
// confirm login in console, send intro message to Discord
// log in with token from .env file
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`),
    client.channels.cache.get("1048088123478908990").send('Hello here!');
});
// create key for speaking to bot
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
// client.login(process.env.TOKEN)
client.login(process.env.TOKEN)



// i can haz dad joke api
// https://icanhazdadjoke.com/api

// use giphy api to display a random meme
// https://developers.giphy.com/docs/api/ 
