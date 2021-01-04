const Discord = require('discord.js');
const database = require('/app/database/database.js');

module.exports = {
    name: 'autorole',
    description: 'Set\'s a role which will automatically be added to a new member.',
    category: 'admin',
    run: async (client, message, args, prefix) => {

        if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
            const permissionEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Insufficent Permissions')
                .setDescription('You do not have sufficient permissions to change this guild\'s auto role.')

            return await message.channel.send(permissionEmbed);
        }
        
        if (args.length == 2) {
            if (args[0] == 'set') {
                const role = args[1].replace(/[\\<>@#&!]/g, "");;

                console.log(role);
            } else {
                const invalidSyntax = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Invalid Syntax')
                    .setDescription(`Usage: ${prefix}autorole set <role>`)

                return await message.channel.send(invalidSyntax);
            }
        } else {
            const prefixEmbed = new Discord.MessageEmbed()
                .setColor('#80ff33')
                .setTitle('Guild Prefix')
                .setDescription(`This guild's prefix is \`${prefix}\``)

            return message.channel.send(prefixEmbed);
        }
    }
}