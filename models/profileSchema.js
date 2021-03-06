const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    hobbies: String,
}, { timestamps: true });

const Profile = new mongoose.model("Profile", profileSchema);
module.exports = Profile

