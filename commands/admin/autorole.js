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
                const role = args[1];
                const roleID = role.replace(/[\\<>@#&!]/g, "")

                await database.setAutorole(guild, roleID);

                const autoroleSuccess = new Discord.MessageEmbed()
                    .setColor('#80ff33')
                    .setTitle('Guild Auto Role Changed')
                    .setDescription(`You have successfully changed the auto role to ${role}.`);

                return await message.channel.send(autoroleSuccess);
            } else {
                const invalidSyntax = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Invalid Syntax')
                    .setDescription(`Usage: ${prefix}autorole set <role>`)

                return await message.channel.send(invalidSyntax);
            }
        } else {
            await database.getAutorole(message.guild).then(autorole => {
                const autoroleEmbed = new Discord.MessageEmbed()
                    .setColor('#80ff33')
                    .setTitle('Guild Auto Role')
                    .setDescription(`This guild's auto role is \`${autorole}\``)

                return message.channel.send(autoroleEmbed);
            });
        }
    }
}