const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'covid',
    description: 'Shows COVID-19 Stats globally, or for a specific country.',
    category: 'misc',
    run: async (client, message, args) => {
        await axios.get('https://api.covid19api.com/summary').then(stats => {
            const globalNewConfirmed = stats.data.Global.NewConfirmed;
            const globalTotalConfirmed = stats.data.Global.TotalConfirmed;
            const globalNewDeaths = stats.data.Global.NewDeaths;
            const globalTotalDeaths = stats.data.Global.TotalDeaths;
            const globalNewRecovered = stats.data.Global.NewRecovered;
            const globalTotalRecovered = stats.data.Global.TotalRecovered;

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

            return message.channel.send(statsEmbed);
        });

    }
}