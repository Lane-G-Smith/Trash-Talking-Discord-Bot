const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => {
    console.log('Logged in as $'
    {client.user.tag}!)
})

client.on("message", msg => {
    if (msg.content === int) {
        msg.reply("you know how to type numbers, good for you asshole. So can I, 69 69 69 69 get fucked") 
    }
})

client.login(process.env.TOKEN)
