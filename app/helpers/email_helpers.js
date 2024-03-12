const mandrill = require('node-mandrill')('-1mGWO4ghHULJVxDSmcxAg');

const sendMail = function (dataObj, next) {
    var input = { to: dataObj.to, cc: {}, from: {}, subject: dataObj.subject, html: dataObj.html };
    input.from = [dataObj.fromEmail, dataObj.fromName];
    
    var parameters = { "apiKey": "tadXOQW82YZRDLTC", "timeout": 5000 };
    var sendinObj = new sendinblue(parameters);
    sendinObj.send_email(input, function (err, response) {
        if (err) {
            next(err, null)
        } else {
            next(null, { type: 'success', data: response })
        }
    });


};


const sendMandrillMail = function (dataObj, next) {
    mandrill('/messages/send', {
        message: dataObj
    }, (error, response) => {
        if (error) {
            next(JSON.stringify(error), null);
        } else {
            next(null, { type: 'success', data: response });
        }
    });
};

module.exports = { sendMail: sendMail, sendMandrillMail: sendMandrillMail };