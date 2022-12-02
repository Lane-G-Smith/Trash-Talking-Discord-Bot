require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log("logged in and ready to blow y'all");
})

// client.on('message', msg => {
//     if (msg.content === int) {
//         msg.reply("you know how to type numbers, good for you asshole. So can I, 69 69 69 69 get fucked");
//     }
// })

client.login(process.env.TOKEN);

//make the bot respond to a specific word
if(message.content.toLowerCase().includes(` ${your_variable} `)) {
    // your code
  }