require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToServer } = require('./src/db/conn');

const app = express();
const appRoutes = require('./src/routes');

app.use(express.json());
app.use(cors());
app.use('/', appRoutes);

app.disable('x-powered-by');

const PORT = process.env.SERVER_PORT || 3001;

(async () => {
    try {
        await connectToServer();
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit();
    }
})()
