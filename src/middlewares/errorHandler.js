const ValidationError = require("../utils/ValidationError");
const logger = require('../utils/logger');

const errorHandler = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        logger.error(error);
        res.status(400).json({ error: error.error.map(x => x.message) });
    } else {
        next(error);
    }
}

module.exports = errorHandler;
