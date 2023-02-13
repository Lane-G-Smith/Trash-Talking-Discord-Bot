const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready.js works! Logged in as ${client.user.tag}`);
	},
};