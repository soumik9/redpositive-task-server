const mongoose = require('mongoose');
var nodemailer = require('nodemailer');

const Profile = require('../models/profileSchema');

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "93c69fbed3b899",
        pass: "70868a43414aca"
    }
});

function sentMail(datas){

    let output = datas.map((data, index) => {
        return `<p style="color: white; margin: 0">Sl: ${index} ==> Name: ${data.name}, Email: ${data.email}, Phone: ${data.phone}, Hobbies: ${data.hobbies} </p>`;
     });

    var mailOptions = {
        from: 'soumik.ahammed.11@gmail.com',
        to: 'info@redpositive.in',
        subject: 'Sending profile datas',
        text: `Here is your profile datas`,
        html: `
        <div>
            <h4>Here is your profile datas</h4>
            <div 
                style="background: black; padding: 5px"
            >${output}</div>
        </div>
        `        
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500).send({ error: error, message: 'Failed to sent mail', success: false });
        } else {
            res.status(200).send({ info, message: 'Email sent successfully', success: true });
        }
    });
}

const mail = async (req, res, next) => {
    try {
        const checked = req.body;
        const datas = await Profile.find({ _id: { $in: checked } });
        sentMail(datas);
        res.status(200).send({ message: 'Email sent successfully', success: true });
    } catch (error) {
        res.status(500).send({ error: error, message: 'Server error', success: false });
    }
}


module.exports = { mail }