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

            for (const cmd of commands) {
                funEmbed.addField(cmd.name, cmd.description);
            }

            await message.channel.send(funEmbed);
        } else if (args[0] == 'info') {
            const infoEmbed = new Discord.MessageEmbed()
                .setColor('80ff33')
                .setTitle('Info Command List')

            const commands = await fs.readdirSync('/app/commands/info/').filter(file => file.endsWith('.js'));

            for (const cmd of commands) {
                funEmbed.addField(cmd.name, cmd.description);
            }

            await message.channel.send(infoEmbed);
        }
            
    }
}