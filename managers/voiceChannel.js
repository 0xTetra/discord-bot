const Discord = require('discord.js');

module.exports = {
    joinChannel: async (channel) => {
        return new Promise(async (resolve, reject) => {
            const dispatcher = await channel.join();
            resolve(dispatcher);
        });
    },

    leaveChannel: async (channel) => {
        return new Promise(async (resolve, reject) => {
            await channel.leave();
            resolve(true);
        });
    }
}