const ValidationError = require('../utils/ValidationError')

const validate = (schema) => {
    const options = {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true
    };

    return (request, response, next) => {

        const { error } = schema.validate(request, options);

        if (error) {
            next(new ValidationError(error.details, `${error.details.map(x => x.message).join(', ')}`));
        } else {
            next();
        }
    }
}

module.exports = validate;
