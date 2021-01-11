const Discord = require('discord.js');
const database = require('/app/managers/database.js');

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
        
        if (args.length >= 1) {
            if (args[0] == 'set') {
                if (args.length == 2) {
                    const role = args[1];
                    const roleID = role.replace(/[\\<>@#&!]/g, "")

                    const roleExists = message.guild.roles.cache.find(x => x.id == roleID)

                    if (roleExists === undefined || !roleExists) {
                        const roleNotFound = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('Role Not Found')
                            .setDescription(`The requested role does not exist.`)

                        return await message.channel.send(roleNotFound);
                    }
    
                    await database.setAutorole(message.guild, roleID);
    
                    const autoroleSuccess = new Discord.MessageEmbed()
                        .setColor('#80ff33')
                        .setTitle('Guild Auto Role Changed')
                        .setDescription(`You have successfully changed the auto role to <@&${roleID}>.`);
    
                    return await message.channel.send(autoroleSuccess);
                } else {
                    const invalidSyntax = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Invalid Syntax')
                        .setDescription(`Usage: ${prefix}autorole set <role>`)

                    return await message.channel.send(invalidSyntax);
                }
            } else if (args[0] == 'off') {
                await database.removeAutorole(message.guild);

                const autoroleSuccess = new Discord.MessageEmbed()
                    .setColor('#80ff33')
                    .setTitle('Guild Auto Role Removed')
                    .setDescription(`You have removed auto role from this guild.`);

                return await message.channel.send(autoroleSuccess);
            } else {
                const invalidSyntax = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Invalid Syntax')
                    .setDescription(`Usage: ${prefix}autorole [set/off] [role]`)

                return await message.channel.send(invalidSyntax);
            }
        } else {
            await database.getAutorole(message.guild).then(autorole => {
                if (!autorole) autorole = '`None`'; else autorole = `<@&${autorole}>`;
                const autoroleEmbed = new Discord.MessageEmbed()
                    .setColor('#80ff33')
                    .setTitle('Guild Auto Role')
                    .setDescription(`This guild's auto role is ${autorole}.`)

                return message.channel.send(autoroleEmbed);
            });
        }
    }
}