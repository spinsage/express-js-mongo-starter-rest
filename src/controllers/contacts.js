const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../db/conn');
const logger = require('../utils/logger');
const validate = require('../middlewares/validate');
const {
    createContact,
    updateContact,
    deleteContact,
    getContact
} = require('../validations/contactsValidation');

router.get("/:id", validate(getContact), async (request, response) => {

    logger.info(`Processing request : ${request.method} ${request.url}`);

    const contact = await getDb().collection('contacts').findOne({
        uid: request.params.id
    }, { projection: { _id: 0 } });

    if (!contact) {
        return response.status(400).send();
    } else {
        return response.json(contact);
    }
});

router.post("/", validate(createContact), async (request, response) => {

    logger.info(`Processing request : ${request.method} ${request.url}`);

    request.body.uid = uuidv4().replace(/-/g, '');
    const insertResponse = await getDb().collection('contacts').insertOne(
        request.body
    )
    const createdContact = await getDb().collection('contacts').findOne({
        _id: insertResponse.insertedId
    }, { projection: { _id: 0 } });

    return response.json(createdContact);
});

router.put("/:id", validate(updateContact), async (request, response) => {

    logger.info(`Processing request : ${request.method} ${request.url}`);

    const updatedContact = await getDb().collection('contacts').updateOne({
        uid: request.params.id
    }, { $set: request.body });

    if (updatedContact.matchedCount === 1) {
        return response.status(200).send();
    } else {
        return response.status(400).send();
    }
});

router.delete("/:id", validate(deleteContact), async (request, response) => {

    logger.info(`Processing request : ${request.method} ${request.url}`);

    const deletedContact = await getDb().collection('contacts').deleteOne({
        uid: request.params.id
    });

    if (deletedContact.deletedCount === 1) {
        return response.status(200).send();
    } else {
        return response.status(400).send();
    }
});

module.exports = router