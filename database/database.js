const { green, white } = require('chalk');
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports = {
    connect: () => {
        return new Promise((resolve, reject) => {
            client.connect(err => {
                if (err) reject(err);

                client.db('Database');
                console.log(green('[SUCCESS] ') + white('Connected to MongoDB.'));
                resolve(true);
            });
        });
    }
}