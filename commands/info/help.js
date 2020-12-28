const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of bot-related commands.',
    category: 'info',
    run: async (client, message, args) => {
        if (args.length == 0) {
            const categoryList = [];
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#80ff33')
                .setTitle('Category List')


            await fs.readdirSync('/app/commands/').forEach(cat => {
                    categoryList.push(cat);
            });
            helpEmbed.setDescription(categoryList.join('\n'));
            await message.channel.send(helpEmbed);
        } else if (args[0] == 'fun') {
            const funEmbed = new Discord.MessageEmbed()
                .setColor('80ff33')
                .setTitle('Fun Command List')

            const commands = await fs.readdirSync('/app/commands/fun/').filter(file => file.endsWith('.js'));
            console.log(commands);

            for (const cmd of commands) {
                console.log(cmd);
                const command = require(`/app/commands/fun/${cmd}`);
                funEmbed.addField(command.name, command.description);
            }

            await message.channel.send(funEmbed);
        } else if (args[0] == 'info') {
            const infoEmbed = new Discord.MessageEmbed()
                .setColor('#80ff33')
                .setTitle('Info Command List')

            const commands = await fs.readdirSync('/app/commands/info/').filter(file => file.endsWith('.js'));

            for (const cmd of commands) {
                const command = require(`/app/commands/info/${cmd}`);
                infoEmbed.addField(command.name, command.description);
            }

            await message.channel.send(infoEmbed);
        } else {
            const invalidSyntax = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Invalid Syntax')
                .setDescription(`Usage: ${client.prefix}help [Category]`)

            await message.channel.send(invalidSyntax);
        }
            
    }
}