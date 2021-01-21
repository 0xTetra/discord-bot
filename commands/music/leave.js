const Discord = require('discord.js');
const voiceChannel = require('/app/managers/voiceChannel.js');

module.exports = {
    name: 'leave',
    description: 'Forces the bot to leave a voice channel.',
    category: 'music',
    run: async (client, message, args, prefix) => {
        console.log(client.user.voiceChannel)
        if (client.user.voiceChannel) {
            await voiceChannel.leaveChannel(client.user.voiceChannel);

            const leaveSuccess = new Discord.MessageEmbed()
                    .setColor('#80ff33')
                    .setTitle('Left Voice Channel')
                    .setDescription(`I have successfully left the voice channel!\nView more music-related commands with \`${prefix}help music\``);

            return await message.channel.send(leaveSuccess);
        }

        const invalidChannel = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Failed to Leave')
                    .setDescription(`The bot currently isn't in a voice channel.`)

        return await message.channel.send(invalidChannel);
    }
}