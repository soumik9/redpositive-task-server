const mongoose = require('mongoose');

const Profile = require('../models/profileSchema');

const index = async (req, res, next) => {
    try {

        const profiles = await Profile.find({});
        res.send({ profiles, message: 'Successfully loaded all profiles', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error, message: 'Server side error', success: false });
    }
}

const single = async (req, res, next) => {
      try {
          const profileId = req.params.profileId;
          const profile = await Profile.findOne({ _id: profileId });
          res.send({ profile, message: 'Successfully loaded profile', success: true });
      } catch (error) {
          res.status(500).send({ error: error, message: 'Server side error', success: false });
      }
}

const create = async (req, res, next) => {
    try {
        const newProfile = new Profile({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            hobbies: req.body.hobbies,
        });

        await newProfile.save();
        res.send({ newProfile, message: `Profile created successfully`, success: true });
    } catch (error) {
        res.status(500).send({ error: error, message: 'Failed to create profile', success: false });
    }
}

const update = async (req, res, next) => {
    try {
        const profileId = req.params.profileId;

        let updataData = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            hobbies: req.body.hobbies,
        }

        const updatedProfile = await Profile.findOneAndUpdate({ _id: profileId }, {
            $set: updataData
        }, {
            new: true
        })
        res.send({ updatedProfile, message: `Profile updated successfully`, success: true });

    } catch (error) {
        res.status(500).send({ error: error, message: 'Failed to update profile', success: false });
    }
}

const destroy = async (req, res, next) => {
    try {

        const profileId = req.params.profileId;
        const info = await Profile.findOne({ _id: profileId });

        if (!info) {
            res.status(500).send({ message: "Check is profile available!", success: false })
        }

        await Profile.deleteOne({ _id: profileId })
        res.send({ message: `Profile deleted successfully`, success: true });
    } catch (error) {
        res.status(500).send({ error: error, message: 'Failed to delete profile', success: false });
    }
}

module.exports = { index, single, create, update, destroy }