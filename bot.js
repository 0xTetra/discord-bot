const Discord = require('discord.js');
const fs = require('fs');
const { green, white } = require('chalk');
const database = require('/app/database/database.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.prefix = '-';


// Command Handler
fs.readdirSync('/app/commands/').forEach(cat => {
    const commands = fs.readdirSync(`/app/commands/${cat}/`).filter(cmd => cmd.endsWith('.js'));

    for (const command of commands) {
        const com = require(`/app/commands/${cat}/${command}`);
        client.commands.set(com.name, com);
    }
});


console.clear();
// When bot is ready
client.once('ready', () => {
    console.log(green('[SUCCESS] ') + white('Discord Bot Launched.'));

    database.connect();
});


client.on('message', async (message) => {
    if (message.content.includes('discord.gg') 
    || message.content.includes('discord.com')) {
        await message.delete();
        return;
    }

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content.startsWith(client.prefix)) return;

    let content = message.content.split(' ');
    let command = content[0];
    let args = content.slice(1);

    let commandFile = client.commands.get(command.slice(client.prefix.length));
    if (commandFile) commandFile.run(client, message, args);
});


client.on('guildCreate', async (guild) => {
    await database.addGuild(guild);
});


client.login(process.env.TOKEN);
