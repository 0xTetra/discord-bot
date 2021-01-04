const Discord = require('discord.js');
const fs = require('fs');
const { green, white } = require('chalk');
const database = require('/app/database/database.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();


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
client.once('ready', async () => {
    console.log(green('[SUCCESS] ') + white('Discord Bot Launched.'));

    await database.connect();
});


client.on('message', async (message) => {
    if (message.content.includes('discord.gg') 
    || message.content.includes('discord.com')) {
        await message.delete();
        return;
    }

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    database.getPrefix(message.guild).then(prefix => {
        if (!prefix) prefix = '-';
        if (!message.content.startsWith(prefix)) return;

        let content = message.content.split(' ');
        let command = content[0];
        let args = content.slice(1);

        let commandFile = client.commands.get(command.slice(prefix.length));
        if (commandFile) commandFile.run(client, message, args, prefix);
    });

});


// Add new guild to database
client.on('guildCreate', async (guild) => {
    await database.addGuild(guild);
});


// Remove guild from database
client.on('guildDelete', async (guild) => {
    await database.removeGuild(guild);
});


// Give role upon member join
client.on('guildMemberAdd', async (member) => {
    console.log('member joined');
    await database.getAutorole(message.guild).then(autorole => {
        if (!autorole) return;
        const role = member.guild.roles.cache.find(role => role.id === autorole);
        member.roles.add(role);
    });
});

client.login(process.env.TOKEN);
