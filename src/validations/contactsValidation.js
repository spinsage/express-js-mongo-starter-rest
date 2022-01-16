const Joi = require('joi');

const createContact = Joi.object({
    body: {
        firstName: Joi.string().alphanum().required().min(1).max(20),
        lastName: Joi.string().alphanum().required().min(1).max(20),
        email: Joi.string().email().required().min(3).max(50)
    }
});

const updateContact = Joi.object({
    params: {
        id: Joi.string().alphanum().required().min(1).max(60),
    },
    body: {
        firstName: Joi.string().alphanum().required().min(1).max(20),
        lastName: Joi.string().alphanum().required().min(1).max(20),
        email: Joi.string().email().required().min(3).max(50)
    }
});

const deleteContact = Joi.object({
    params: {
        id: Joi.string().alphanum().required().min(1).max(60),
    }
})

const getContact = Joi.object({
    params: {
        id: Joi.string().alphanum().required().min(1).max(60),
    }
})

module.exports = {
    createContact,
    updateContact,
    getContact,
    deleteContact
};