const fs = require('fs');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'meme',
    description: 'Generates a random meme from a subreddit.',
    category: 'meme',
    run: async (client, message, args) => {
        await axios.get('https://meme-api.herokuapp.com/gimme').then(meme => {
            const memeEmbed = new Discord.MessageEmbed()
                .setColor('#80ff33')
                .setTitle(meme.data.subreddit)
                .setImage(meme.data.url)

            message.channel.send(memeEmbed);
        });
    }
}