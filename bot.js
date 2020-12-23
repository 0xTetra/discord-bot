require('dotenv').config();
const Discord = require('discord.js');
const { green, white } = require('chalk');
const client = new Discord.Client();

console.clear();
// When bot is ready
client.once('ready', () => {
    console.log(green('[SUCCESS] ') + white('Discord Bot Launched.'));
});


client.login(process.env.TOKEN);