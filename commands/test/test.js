module.exports = {
    name: 'test',
    description: 'Test Command',
    category: 'test',
    run: async(client, message, args) => {
        await message.channel.send('test');
    }
}