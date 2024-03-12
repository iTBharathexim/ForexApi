const MailHelper = require('../../../helpers/email_helpers');
const validators = require("../../../helpers/validators");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const EmailFormat = require("../../mails/mailhelper/email-store/email-formats");

const sendVerificationEmailTemplate = (dataObj, next) => {
    if (dataObj.id && dataObj.driverId && dataObj.payment && dataObj.riderId) {
        const verificationUrl = 'http://localhost:8901/v1/user/verifyEmail?';
        let content = `<p>hello ${dataObj.driverId.first_name}: </p><br/>`;
        content = content + `<p>Welcome to Mission Possibe Click to <a href= '` + verificationUrl + `'>verify email</a></p><br/>`;
        MailHelper.sendMandrillMail(mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, { success: true, data });
            }
        });
    }
};

const sendForgotEmail = (dataObj, next) => {
    if (dataObj) {
        validators.generateJWTToken(dataObj.emailId, (err, res) => {
            console.dir("After token verification");
            console.dir(res);
            if (err) {
                next(err, null);
            } else if (res) {
                try {
                    console.dir("res");
                    console.dir(res);
                    const forgotemailLink = process.env.WEBSITE_URL + '/updatePassword/' + res.split(" ")[1];

                    let content = `<p>Hello!</p><br/>`;
                    content = content + `<p>Welcome to bharathexim Click <a href= '` + forgotemailLink + `'>to change your password</a></p><br/>`;
                    const html = EmailFormat.generalFormat({ html: content, heading: "Forgot Password", host: process.env.WEBSITE_URL });
                    const msg = {
                        to: dataObj.emailId, // Change to your recipient
                        from: 'noreply@bharathexim.com', // Change to your verified sender
                        subject: 'Forgot password for Bharathexim',
                        text: content,
                        html: html,
                    };

                    

                    sgMail
                        .send(msg)
                        .then((msgres) => {
                            
                            next(null, { success: true });

                        }).catch((error) => {
                            console.error(error);
                            next(error, null);
                        })
                } catch (error) {
                    
                }
            } else {
                console.dir("null");
                next(null, null);
            }
        });

    }
};



const sendVerifyEmail = (dataObj, next) => {
    if (dataObj) {
        validators.generateJWTToken(dataObj.emailId, (err, res) => {
            console.dir("After token verification");
            console.dir(res);
            console.dir(dataObj.emailId);
            if (err) {

                next(err, null);
            } else if (res) {
                console.dir("res");
                console.dir(res);

                const forgotemailLink = process.env.WEBSITE_URL + '/verifyEmail/' + res.split(" ")[1];

                let content = `<p>Hello!</p><br/>`;
                content = content + `<p>Welcome to Bharathexim Click <a href= '` + forgotemailLink + `'>to verify your account.</a></p><br/>`;
                const html = EmailFormat.generalFormat({ html: content, heading: "Account Verification", host: process.env.WEBSITE_URL });
                const msg = {
                    to: dataObj.emailId, // Change to your recipient
                    from: "noreply@bharathexim.com", // Change to your verified sender
                    subject: "Verify Your email",
                    text: "Welcome to Bharathexim",
                    html: html
                };
                sgMail
                    .send(msg)
                    .then(() => {
                        next(null, { success: true });
                    }).catch((error) => {
                        console.error(JSON.stringify(error));
                        next(error, null);

                    })
            } else {
                console.dir("null");

                next(null, null);
            }
        });

    }
};

const sendRoleVerifyEmail = (dataObj, next) => {
    if (dataObj) {
        validators.generateJWTToken(dataObj.emailId, (err, res) => {
            console.dir("After token verification");
            console.dir(res);
            console.dir(dataObj.emailId);
            if (err) {

                next(err, null);
            } else if (res) {
                console.dir("res");
                console.dir(res);

                const forgotemailLink = process.env.WEBSITE_URL + '/RoleVerifyEmail/' + res.split(" ")[1];

                let content = `<p>Hello!</p><br/>`;
                content = content + `<p>Welcome to Bharathexim Click <a href= '` + forgotemailLink + `'>to verify your account.</a></p><br/>`;
                const html = EmailFormat.generalFormat({ html: content, heading: "Account Verification", host: process.env.WEBSITE_URL });
                const msg = {
                    to: dataObj.emailId, // Change to your recipient
                    from: "noreply@bharathexim.com", // Change to your verified sender
                    subject: "Verify Your email",
                    text: "Welcome to Bharathexim",
                    html: html
                };
                sgMail
                    .send(msg)
                    .then(() => {
                        next(null, { success: true });
                    }).catch((error) => {
                        console.error(JSON.stringify(error));
                        next(error, null);

                    })
            } else {
                console.dir("null");

                next(null, null);
            }
        });

    }
};


const sendMemberEmail = (dataObj, data, next) => {
    if (dataObj) {
        validators.generateJWTTokenMemberAll(dataObj, (err, res) => {
            console.dir("After token verification");
            console.dir(res);
            console.dir(dataObj.email);
            if (err) {

                next(err, null);
            } else if (res) {
                console.dir("res");
                console.dir(res);
                const forgotemailLink = process.env.WEBSITE_URL + '/membersignin/' + res.split(" ")[1];

                let content = `<p>Hello! ${dataObj.name}</p><br/>`;
                content = content + `<p>Welcome to Bharathexim your added to <b>${data.companyName}</b> Click <a href= '` + forgotemailLink + `'>here to create your account.</a> Use this email as your userID</p><br/>`;
                const html = EmailFormat.generalFormat({ html: content, heading: "Invitation to Join DocMachine", host: process.env.WEBSITE_URL });
                const msg = {
                    to: dataObj.email, // Change to your recipient
                    from: "noreply@bharathexim.com", // Change to your verified sender
                    subject: "Inviting to DocMachine",
                    text: "Welcome to Bharathexim",
                    html: html
                };

                sgMail
                    .send(msg)
                    .then(() => {

                        next(null, { success: true });

                    }).catch((error) => {
                        console.error(error);
                        next(error, null);

                    })
            } else {
                console.dir("null");

                next(null, null);
            }
        });

    }
};
const sendResetQR = (dataObj, next) => {
    if (dataObj) {
        validators.generateJWTTokenPdf({ email: dataObj?.emailId, otp: dataObj.otpDetails?.dataURL }, (err, res) => {
            console.dir("After token verification");
            console.dir(res);
            console.dir(dataObj.emailId);
            if (err) {

                next(err, null);
            } else if (res) {
                console.dir("res");
                console.dir(res);
                let content = `<p>Hello! ${dataObj.fullName}</p><br/>`;
                content = content + `<p>Welcome to Bharathexim your QR reset to give below please check<b> </p>'<img src="cid:myimagecid"/>'<br/>`;
                const html = EmailFormat.generalFormat({ html: content, heading: "DocMachine QR Reset", host: process.env.WEBSITE_URL });
                var imageb64 = dataObj.otpDetails?.dataURL.replace('data:image/png;base64,', '');

                const msg = {
                    to: dataObj.emailId, // Change to your recipient
                    from: 'noreply@bharathexim.com', // Change to your verified sender
                    subject: 'QR Reset',
                    text: content,
                    html: html,
                    attachments: [
                        {
                            filename: "QR.png",
                            content: imageb64,
                            content_id: "myimagecid",
                        }
                    ]
                };

                sgMail
                    .send(msg)
                    .then(() => {

                        next(null, { success: true });

                    }).catch((error) => {
                        console.error(error);
                        next(error, null);

                    })
            } else {
                console.dir("null");

                next(null, null);
            }
        });

    }
};

const sendDocuments = (dataObj, next) => {
    if (dataObj) {
        let content = `<p>Hello!</p><br/>`;
        content = content + `<p>Here is the documents You generated </p>`;
        const html = EmailFormat.generalFormat({ html: content, heading: "Documents", host: process.env.WEBSITE_URL });
        const msg = {
            to: dataObj.emailId, // Change to your recipient
            from: 'noreply@bharathexim.com', // Change to your verified sender
            subject: 'Documents',
            text: content,
            html: html,
            attachments: [{ // encoded string as an attachment
                filename: 'BankAttachment.pdf',
                content: dataObj.byteArray,
                encoding: 'base64'
            }]
        };

        sgMail
            .send(msg)
            .then(() => {

                next(null, { success: true });

            }).catch((error) => {
                console.error(error);
                next(error, null)

            })
    } else {
        next(null, null)
    }
};

module.exports = {
    sendVerificationEmailTemplate: sendVerificationEmailTemplate,
    sendForgotEmail: sendForgotEmail,
    sendVerifyEmail: sendVerifyEmail,
    sendMemberEmail: sendMemberEmail,
    sendRoleVerifyEmail: sendRoleVerifyEmail,
    sendDocuments: sendDocuments,
    sendResetQR: sendResetQR
};
