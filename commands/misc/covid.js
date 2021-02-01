const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'covid',
    description: 'Shows COVID-19 Stats globally, or for a specific country.',
    category: 'misc',
    run: async (client, message, args) => {
        await axios.get('https://api.covid19api.com/summary').then(stats => {
            const globalNewConfirmed = stats.global.NewConfirmed;
            const globalTotalConfirmed = stats.global.TotalConfirmed;
            const globalNewDeaths = stats.global.NewDeaths;
            const globalTotalDeaths = stats.global.TotalDeaths;
            const globalNewRecovered = stats.global.NewRecovered;
            const globalTotalRecovered = stats.global.TotalRecovered;

            const statsEmbed = new Discord.MessageEmbed()
                .setColor('#80ff33')
                .setTitle('Global COVID-19 Stats')
                .addFields(
                    { name: 'New Confirmed', value: globalNewConfirmed },
                    { name: 'Total Confirmed', value: globalTotalConfirmed },
                    { name: 'New Deaths', value: globalNewDeaths },
                    { name: 'Total Deaths', value: globalTotalDeaths },
                    { name: 'New Recovered', value: globalNewRecovered },
                    { name: 'Total Recovered', value: globalTotalRecovered }
                );

            await message.channel.send(statsEmbed);
        });

    }
}