const { MongoClient } = require('mongodb');

let db;

const getConnectionString = () => {
    return `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;
}

const client = new MongoClient(getConnectionString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const getDb = () => {
    return db;
}

const connectToServer = async () => {
    const dbConn = await client.connect();
    db = dbConn.db('contactsDb');
    console.log('Connected to DB');
}

module.exports = {
    connectToServer,
    getDb
};