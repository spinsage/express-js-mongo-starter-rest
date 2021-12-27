const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../db/conn');

const router = express.Router();

router.get("/contacts/:id", async (request, response) => {
    const contact = await getDb().collection('contacts').findOne({
        uid: request.params.id
    }, { projection: { _id: 0 } });

    if (!contact) {
        return response.status(400).send();
    } else {
        return response.json(contact);
    }
});

router.post("/contacts", async (request, response) => {
    request.body.uid = uuidv4().replace(/-/g, '');
    const insertResponse = await getDb().collection('contacts').insertOne(
        request.body
    )
    const createdContact = await getDb().collection('contacts').findOne({
        _id: insertResponse.insertedId
    }, { projection: { _id: 0 } });

    return response.json(createdContact);
});

router.put("/contacts/:id", async (request, response) => {
    const updatedContact = await getDb().collection('contacts').updateOne({
        uid: request.params.id
    }, { $set: request.body });

    if (updatedContact.modifiedCount === 1) {
        return response.status(200).send();
    } else {
        return response.status(400).send();
    }
});

router.delete("/contacts/:id", async (request, response) => {
    const deletedContact = await getDb().collection('contacts').deleteOne({
        uid: request.params.id
    });

    if (deletedContact.deletedCount === 1) {
        return response.status(200).send();
    } else {
        return response.status(400).send();
    }
});


module.exports = router;
