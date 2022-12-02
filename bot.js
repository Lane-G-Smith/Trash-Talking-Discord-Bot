// hide key token in .env file . Won't upload to github
require('dotenv').config()
// this installs the packages and configures permissions(intents)
const { Client, GatewayIntentBits} = require('discord.js');
const client = new Client ({intents: [GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.GuildScheduledEvents
]});
// confirm login in console, send intro message to Discord
// log in with token from .env file
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`),
    message.channel.send("What up y'all")
});
// create key for speaking to bot
prefix = ('!');
// text responses to specific words or phrases typed in Discord
client.on("message", message => {
    if(message.content.startsWith(prefix + "Bully-Bot"))
    { message.channel.send("wut?");
    };
    if (message.content.startsWith(prefix + "testing"))
    {message.channel.send("1,2,3")
    };
});

client.login(process.env.TOKEN)