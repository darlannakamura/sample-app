'use strict';
var config = require('../config');
// var sendgrid = require('sendgrid')(config.SENDGRID_KEY);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_KEY);

exports.send = async (to, subject, body) => {
    const msg = {
        to: to,
        from: 'noreply@sampleapp.com',
        subject: subject,
        text: body,
        html: '<body>'+body+'</body>',
    }

    await sgMail.send(msg);
}