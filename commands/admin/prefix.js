const Discord = require('discord.js');
const database = require('/app/database/database.js');

module.exports = {
    name: 'prefix',
    description: 'Displays or sets your guild prefix.',
    category: 'admin',
    run: async (client, message, args, prefix) => {

        if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
            const permissionEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Insufficent Permissions')
                .setDescription('You do not have enough permissions to change this guild\'s server prefix.')

            return await message.channel.send(permissionEmbed);
        }
        
        if (args.length == 2) {
            if (args[0] == 'set') {
                const prefix = args[1];

                await database.setPrefix(message.guild, prefix);

                const prefixSuccess = new Discord.MessageEmbed()
                    .setColor('#80ff33')
                    .setTitle('Guild Prefix Changed')
                    .setDescription(`You have successfully changed the guild's prefix to \`${prefix}\`.`);

                return await message.channel.send(prefixSuccess);
            } else {
                const invalidSyntax = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Invalid Syntax')
                    .setDescription(`Usage: ${client.prefix}prefix set <prefix>`)

                return await message.channel.send(invalidSyntax);
            }
        } else {
            const prefixEmbed = new Discord.MessageEmbed()
                .setColor('#80ff33')
                .setTitle('Guild Prefix')
                .setDescription(`This guild\'s prefix is \`${prefix}\``)

            return message.channel.send(prefixEmbed);
        }
    }
}