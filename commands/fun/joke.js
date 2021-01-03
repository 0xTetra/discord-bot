const fs = require('fs');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'joke',
    description: 'Generates a random joke from some retarded api',
    category: 'fun',
    run: async (client, message, args) => {
        await axios.get('https://v2.jokeapi.dev/joke/Dark?type=twopart').then(joke => {
            const jokeEmbed = new Discord.MessageEmbed()
                .setColor('#80ff33')
                .setTitle(joke.data.setup)
                .setDescription(joke.data.delivery)

            return await message.channel.send(jokeEmbed);
        });
    }
}