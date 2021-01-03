const Discord = require('discord.js');
const database = require('/app/database/database.js');

module.exports = {
    name: 'prefix',
    description: 'Displays or sets your guild prefix.',
    category: 'admin',
    run: async (client, message, args) => {

        if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
            const permissionEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Insufficent Permissions')
                .setDescription('You do not have enough permissions to change this guild\'s server prefix.')

            return await message.channel.send(permissionEmbed);
        }
        database.getPrefix(message.guild).then(prefix => message.channel.send(prefix));
    }
}