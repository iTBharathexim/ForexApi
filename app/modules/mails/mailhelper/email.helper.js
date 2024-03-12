const _ = require('underscore');
const mailutils = require('../../../helpers/mail');
// Send In Blue
// const sendinblue = require('sendinblue-api');
// const parameters = {"apiKey": "tadXOQW82YZRDLTC", "timeout": 10000};
// const sendinObj = new sendinblue(parameters);
// Mandrill
const mandrill = require('node-mandrill')('-1mGWO4ghHULJVxDSmcxAg');
const sendMail = function(type, dataObj, next) {
    if(type === 'mandril') {
      // ******** Mandrill ************
      mandrill('/messages/send', {
        message: dataObj
      }, (error, response) => {
        //uh oh, there was an error
        if (error) {
          next(JSON.stringify(error), null);
        } else {
          next(null, {type: 'success', data: response});
        }
      });
    } else {
      let convertToNodeMailerFormat = (data) => {
        dataObj.from = "'" + data.from_name + "' " + data.from_email ;
        dataObj.to = "'" + data.to[0].name + "' " +  data.to[0].email ;
        delete dataObj.from_email;
        delete dataObj.from_name;
        return data;
      };
      // ******** NodeMailer ************
      dataObj = convertToNodeMailerFormat(dataObj);
      mailutils.sendMail(dataObj,(error, response) => {
        //uh oh, there was an error
        if (error) {
          next(JSON.stringify(error), null);
        } else {
          next(null, {type: 'success', data: response});
        }
      });
    }
};

module.exports = {sendMail: sendMail};