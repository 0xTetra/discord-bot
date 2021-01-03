const { green, white } = require('chalk');
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

module.exports = {
    connect: async () => {
        return new Promise(async (resolve, reject) => {
            await client.connect(err => {
                if (err) reject(err);

                db = client.db('Database');
                console.log(green('[SUCCESS] ') + white('Connected to MongoDB.'));
                resolve(true);
            });
        });
    },

    disconnect: () => {
        return new Promise(async (resolve, reject) => {
            if (client.isConnected) {
                await client.close();
                resolve(true);
            } else {
                reject('The database isn\'t connected.');
            }
        })
    },

    addGuild: (guild) => {
        return new Promise(async (resolve, reject) => {
            if (client.isConnected) {
                await db.collection('servers').insertOne({ guildID: guild.id });
                resolve(true);
            } else {
                await module.exports.connect();
                await this.addGuild(guild);
            }
        });
    },

    removeGuild: (guild) => {
        return new Promise(async (resolve, reject) => {
            if (client.isConnected) {
                await db.collection('servers').deleteOne({ guildID: guild.id });
                resolve(true);
            } else {
                await module.exports.connect();
                await this.removeGuild(guild);
            }
        });
    },

    setPrefix: (guild, prefix) => {
        return new Promise(async (resolve, reject) => {
            if (client.isConnected) {
                await db.collection('servers').updateOne({ guildID: guild.id }, { $set: { prefix: prefix } });
                resolve(true);
            } else {
                await module.exports.connect();
                await this.setPrefix(guild, prefix);
            }
        });
    },

    getPrefix: (guild) => {
        return new Promise(async (resolve, reject) => {
            if (client.isConnected) {
                const prefix = await db.collection('servers').findOne({ guildID: guild.id })
                resolve(prefix);
            } else {
                await module.exports.connect();
                await this.getPrefix(guild);
            }
        });
    }
}