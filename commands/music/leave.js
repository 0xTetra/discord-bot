const Discord = require('discord.js');
const database = require('/app/managers/database.js');

module.exports = {
    name: 'connect',
    description: 'Forces the bot to join a voice channel.',
    category: 'music',
    run: async (client, message, args, prefix) => {
        if (client.user.voiceChannel) return await client.user.voiceChannel.leave();

        const invalidChannel = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Failed to Leave')
                    .setDescription(`The bot current isn't in a voice channel.`)

        return await message.channel.send(invalidChannel);
    }
}