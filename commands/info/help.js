const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of bot-related commands.',
    category: 'info',
    run: async (client, message, args, prefix) => {
        const categories = await fs.readdirSync(`/app/commands/`);

        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }

        if (args.length == 0) {

            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#80ff33')
                .setTitle('Category List')

            helpEmbed.setDescription(categories.join('\n'));
            return await message.channel.send(helpEmbed);
        } else {
            if (categories.indexOf(args[0]) > -1) {
                const capitalized = capitalize(args[0]);
                const catEmbed = new Discord.MessageEmbed()
                .setColor('#80ff33')
                .setTitle(`${capitalized} Command List`)

                const commands = await fs.readdirSync(`/app/commands/${args[0]}/`).filter(file => file.endsWith('.js'));

                for (const cmd of commands) {
                    const command = require(`/app/commands/${args[0]}/${cmd}`);
                    catEmbed.addField(`${prefix}${command.name}`, command.description);
                }

                return await message.channel.send(catEmbed);
            } else {
                const invalidSyntax = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Invalid Syntax')
                .setDescription(`Usage: ${prefix}help [Category]`)

                return await message.channel.send(invalidSyntax);
            }
        }
            
    }
}