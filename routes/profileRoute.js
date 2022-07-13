const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ProfileController = require('../controllers/ProfileController');

//get all users
router.get('/index', ProfileController.index);

//create new permission
router.post('/create', ProfileController.create);

//update a user
router.patch('/:profileId', ProfileController.update);

//delete a user
router.delete('/:profileId', ProfileController.destroy);


module.exports = router;