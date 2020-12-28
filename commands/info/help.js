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
        } else if (args.length > 0 && args[0] == 'fun') {
            
        }
            
    }
}