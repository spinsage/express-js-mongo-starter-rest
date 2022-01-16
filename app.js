require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./src/utils/logger');
const { connectToServer } = require('./src/db/conn');

const app = express();
const appRoutes = require('./src/routes');

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use('/', appRoutes);

app.disable('x-powered-by');

const PORT = process.env.SERVER_PORT || 3001;

(async () => {
    try {
        await connectToServer();
        app.listen(PORT, '0.0.0.0', () => {
            logger.info(`Server is running on port: ${PORT}`);
        });
    } catch (err) {
        logger.error(err);
        process.exit();
    }
})()
