const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MailController = require('../controllers/MailController');


//create new profile
router.post('/mail', MailController.mail);


module.exports = router;