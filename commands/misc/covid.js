const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'covid',
    description: 'Shows COVID-19 Stats globally, or for a specific country.',
    category: 'misc',
    run: async (client, message, args) => {
        const formatNumber = async (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        await axios.get('https://api.covid19api.com/summary').then(stats => {
            const globalNewConfirmed = formatNumber(stats.data.Global.NewConfirmed);
            const globalTotalConfirmed = formatNumber(stats.data.Global.TotalConfirmed);
            const globalNewDeaths = formatNumber(stats.data.Global.NewDeaths);
            const globalTotalDeaths = formatNumber(stats.data.Global.TotalDeaths);
            const globalNewRecovered = formatNumber(stats.data.Global.NewRecovered);
            const globalTotalRecovered = formatNumber(stats.data.Global.TotalRecovered);

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