const Discord = require('discord.js');
const voiceChannel = require('/app/managers/voiceChannel.js');

module.exports = {
    name: 'connect',
    description: 'Forces the bot to join a voice channel.',
    category: 'music',
    run: async (client, message, args, prefix) => {
        if (message.member.voice.channel) {
            await voiceChannel.joinChannel(message.member.voice.channel);

            const connectionSuccess = new Discord.MessageEmbed()
                    .setColor('#80ff33')
                    .setTitle('Joined Voice Channel')
                    .setDescription(`I have successfully joined the voice channel!\nView more music-related commands with ${prefix}help music`);

            return await message.channel.send(connectionSuccess);
        }

        const invalidChannel = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Failed to Join')
                    .setDescription(`You need to join a voice channel before running this command.`)

        return await message.channel.send(invalidChannel);
    }
}