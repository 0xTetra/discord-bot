const fs = require('fs');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'stats',
    description: 'Shows bot statistics.',
    category: 'info',
    run: async (client, message, args) => {
        const totalUsers = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
        const totalServers = client.guilds.cache.size;

        const getUptime = () => {
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            return `${days} Days, ${hours} Hours, ${minutes} Minutes and ${seconds} Seconds`;
        }

        const statsEmbed = new Discord.MessageEmbed()
            .setColor('#80ff33')
            .setTitle('Statistics')
            .addField('Total Users:', totalUsers, true)
            .addField('Total Servers:', totalServers, true)
            .addField('Node Version:', process.version, true)
            .addField('Uptime:', getUptime(), false)

        return await message.channel.send(statsEmbed);
    }
}