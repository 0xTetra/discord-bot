const Discord = require('discord.js');
const database = require('/app/managers/database.js');

module.exports = {
    name: 'reactionrole',
    description: 'Allows a member to react to a message for a role',
    aliases: ['rr', 'reactrole'],
    category: 'utility',
    run: async (client, message, args, prefix) => {


        if (args.length >= 1) {

            const invalidSynax = () => {
                new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Invalid Syntax')
                    .setDescription(`Usage: ${prefix}reactionrole add #channel (messageid) (reactionemoji) (rolename, id, or ping)`)
            };

            if (args[0] == 'add') {
                const role = message.mentions.roles.first();

                if (!role || args.length > 5) {
                    return await message.channel.send(invalidSynax());
                }
            
                const channel = args[1];
                const messageID = args[2];
                const emoji = args[3];

                return console.log(`${role}, ${channel}, ${messageID}, ${emoji}`);

            }
        }
    }
}