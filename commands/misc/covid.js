const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'covid',
    description: 'Shows COVID-19 Stats globally, or for a specific country.',
    category: 'misc',
    run: async (client, message, args) => {

        await axios.get('https://api.covid19api.com/summary').then(stats => {
            const globalNewConfirmed = stats.data.Global.NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const globalTotalConfirmed = stats.data.Global.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const globalNewDeaths = stats.data.Global.NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const globalTotalDeaths = stats.data.Global.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const globalNewRecovered = stats.data.Global.NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const globalTotalRecovered = stats.data.Global.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            const statsEmbed = new Discord.MessageEmbed()
                .setColor('#80ff33')
                .setTitle('Global COVID-19 Stats')
                .addFields(
                    { name: 'New Confirmed', value: globalNewConfirmed, inline: true },
                    { name: 'Total Confirmed', value: globalTotalConfirmed, inline: true },
                    { name: 'New Deaths', value: globalNewDeaths, inline: true },
                    { name: 'Total Deaths', value: globalTotalDeaths, inline: true },
                    { name: 'New Recovered', value: globalNewRecovered, inline: true },
                    { name: 'Total Recovered', value: globalTotalRecovered, inline: true }
                );

            return message.channel.send(statsEmbed);
        });

    }
}