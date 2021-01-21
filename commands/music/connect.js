const Discord = require('discord.js');
const database = require('/app/managers/database.js');

module.exports = {
    name: 'connect',
    description: 'Forces the bot to join a voice chat.',
    category: 'music',
    run: async (client, message, args, prefix) => {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
        }
    }
}