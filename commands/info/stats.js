const fs = require('fs');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'stats',
    description: 'Shows bot statistics.',
    category: 'info',
    run: async (client, message, args) => {
        const totalUsers = client.guilds.members.cache.filter(member => !member.user.bot).size;
        const totalServers = client.guilds.cache.size;

        const statsEmbed = new Discord.Embed()
            .setColor('#80ff33')
            .setTitle('Statistics')
            .addField('Total Users: ', totalUsers)
            .addField('Total Servers: ', totalServers)

        await message.channel.send(statsEmbed);
    }
}