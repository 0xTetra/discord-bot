const { green, white } = require('chalk');
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

module.exports = {
    connect: async () => {
        return new Promise((resolve, reject) => {
            await client.connect(err => {
                if (err) reject(err);

                db = client.db('Database');
                console.log(green('[SUCCESS] ') + white('Connected to MongoDB.'));
                resolve(true);
            });
        });
    },

    disconnect: () => {
        return new Promise((resolve, reject) => {
            if (client.isConnected) {
                await client.close();
                resolve(true);
            } else {
                reject('The database isn\'t connected.');
            }
        })
    },

    addGuild: (guild) => {
        return new Promise((resolve, reject) => {
            if (client.isConnected) {
                await db.collection('servers').insertOne({ guildID: guild.id });
                resolve(true);
            } else {
                module.exports.connect();
                this.addGuild(guild);
            }
        });
    }
}