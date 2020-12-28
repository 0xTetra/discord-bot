const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of bot-related commands.',
    category: 'info',
    run: async (client, message, args) => {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#80ff33')
            .setTitle('Command List')


        await fs.readdirSync('/app/commands/').forEach(cat => {
            const commands = fs.readdirSync(`/app/commands/${cat}/`).filter(cmd => cmd.endsWith('.js'));
        
            for (const command of commands) {
                const com = require(`/app/commands/${cat}/${command}`);
                helpEmbed.addField(`${client.prefix}${com.name}`, com.description);
            }
        });

        await message.channel.send(helpEmbed);
            
    }
}