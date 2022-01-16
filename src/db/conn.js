const { MongoClient } = require('mongodb');
const logger = require('../utils/logger');

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
    logger.info('Connecting to database...');
    const dbConn = await client.connect();
    db = dbConn.db('contactsDb');
    logger.info('Database Connection successful');
}

module.exports = {
    connectToServer,
    getDb
};