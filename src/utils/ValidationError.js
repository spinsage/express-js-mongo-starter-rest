class ValidationError extends Error {
    constructor(error, message) {
        super(message);
        this.error = error;
    }
}

module.exports = ValidationError;
