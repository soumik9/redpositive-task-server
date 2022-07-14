const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ProfileController = require('../controllers/ProfileController');

//get all profile
router.get('/index', ProfileController.index);

//get single profile
router.get('/:profileId', ProfileController.single);

//create new profile
router.post('/create', ProfileController.create);

//update a profile
router.patch('/:profileId', ProfileController.update);

//delete a profile
router.delete('/:profileId', ProfileController.destroy);


module.exports = router;