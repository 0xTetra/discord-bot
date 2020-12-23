module.exports = {
    name: 'help',
    description: 'Displays a list of bot-related commands.',
    category: 'info',
    run: async (client, message, args) => {
        fs.readdirSync('/app/commands/').forEach(cat => {
            const commands = fs.readdirSync(`/app/commands/${cat}/`).filter(cmd => cmd.endsWith('.js'));
        
            for (const command of commands) {
                const com = require(`/app/commands/${cat}/${command}`);
                message.channel.reply(com.name);
            }
        });
    }
}