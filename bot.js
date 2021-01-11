const Discord = require('discord.js');
const fs = require('fs');
const { green, white } = require('chalk');
const database = require('/app/managers/database.js');

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
client.on('ready', async () => {
    const totalUsers = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    const totalServers = client.guilds.cache.size;

    const activities = [
        `${totalUsers} Users`,
        `${totalServers} Servers`
    ];

    console.log(green('[SUCCESS] ') + white('Discord Bot Launched.'));

    await database.connect();

    await client.user.setActivity(activities[Math.floor(Math.random() * activities.length)], { type: 'WATCHING' },
        setInterval(() => {
            client.user.setActivity(activities[Math.floor(Math.random() * activities.length)], { type: 'WATCHING' });
        }, 10000)
    );
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
        console.log(client.commands.find(cmd => cmd.aliases.includes(command.slice(prefix.length))));

        let com = client.commands.get(command.slice(prefix.length) 
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command.slice(prefix.length))));
        console.log(com);

        if (com) com.run(client, message, args, prefix);
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
    await database.getAutorole(member.guild).then(autorole => {
        if (!autorole) return;
        const role = member.guild.roles.cache.find(role => role.id === autorole);
        member.roles.add(role);
    });
});

client.login(process.env.TOKEN);
