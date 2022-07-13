const mongoose = require('mongoose');

const Profile = require('../models/profileSchema');

const index = async (req, res, next) => {
    try {

        const profiles = await Profile.find({});
        res.send({ profiles, message: 'Success', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error, message: 'Server side error', success: false });
    }
}

const single = async (req, res, next) => {
    /*   try {
          const userId = req.params.userId;
          const user = await UserModel.findOne({ _id: userId }).populate({ path: 'role' }).populate({ path: 'ordersId' }).select({ __v: 0 });
          res.send({ user, message: 'Successfully loaded user', success: true });
      } catch (error) {
          res.status(500).send({ error: error, message: 'Server side error', success: false });
      } */
}

const create = async (req, res, next) => {
    try {
        const newProfile = new Profile({
            name: req.body.name,
            username: req.body.username,
        });

        await newProfile.save();
        res.send({ newProfile, message: `User (${req.body.name}) created`, success: true });
    } catch (error) {
        res.status(500).send({ error: error, message: 'Failed to create user', success: false });
    }
}

const update = async (req, res, next) => {
    try {
        const profileId = req.params.profileId;

        let updataData = {
            name: req.body.name,
        }


        const updatedProfile = await Profile.findOneAndUpdate({ _id: profileId }, {
            $set: updataData
        }, {
            new: true
        })
        res.send({ updatedProfile, message: `User updated`, success: true });

    } catch (error) {
        res.status(500).send({ error: error, message: 'Failed to update user', success: false });
    }
}

const destroy = async (req, res, next) => {
    try {

        const profileId = req.params.profileId;
        const info = await Profile.findOne({ _id: profileId });

        if (!info) {
            res.status(500).send({ message: "Check is user available!", success: false })
        }

        await Profile.deleteOne({ _id: profileId })
        res.send({ message: `User deleted`, success: true });
    } catch (error) {
        res.status(500).send({ error: error, message: 'Failed to delete user', success: false });
    }
}

module.exports = { index, single, create, update, destroy }