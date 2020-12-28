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
            const pad = (s) => {
                return (s < 10 ? '0' : '') + s;
            }
            var hours = Math.floor(seconds / (60*60));
            var minutes = Math.floor(seconds % (60*60) / 60);
            var seconds = Math.floor(seconds % 60);
            
            return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
        }

        const statsEmbed = new Discord.MessageEmbed()
            .setColor('#80ff33')
            .setTitle('Statistics')
            .addField('Total Users:', totalUsers, true)
            .addField('Total Servers:', totalServers, true)
            .addField('Node Version:', process.version, true)
            .addField('Uptime:', getUptime(), false)

        await message.channel.send(statsEmbed);
    }
}