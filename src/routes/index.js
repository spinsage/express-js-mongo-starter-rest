const express = require('express');
const contacts = require('../controllers/contacts');
const catchAll = require('../controllers/catchAll');

const router = express.Router();

router.use('/contacts', contacts);
router.use('*', catchAll);

module.exports = router;
