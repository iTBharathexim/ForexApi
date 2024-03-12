// Post Sign up Activation Mail
const EmailFormat = require('./email-formats');
const MailHelper = require('../email.helper');
const _ = require('underscore');
// ********** Validate Data **************
const validateData = (dataObject, properties) => {
    if (dataObject && _.isObject(dataObject) && properties && properties.length) {
        return properties.every((key) => key in dataObject && dataObject[key]);
    } else {
        return false;
    }
};
// ********** Post sign up activation **************
const activationMail = (dataObj, next) => {
    // --------- Sample dataObj -------
     const mailObj = {user: {first_name: 'ABC', last_name: 'USER'}, host: 'http://localhost:5000', userToken: 'TOKEN-ABC-123', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'Welcome !'};
    // ---------- Function ------------
    if (dataObj.user && dataObj.host && dataObj.userToken && dataObj.to && dataObj.to.length && dataObj.heading
        && validateData(dataObj.user, ['first_name', 'last_name'])) {
        const content = `<p>Hello ${dataObj.user.first_name} ${dataObj.user.last_name},</p><br/>
            <p>Welcome to wrked and thank you for signing up.</p><br/>
            <p>We are excited to have you get started but, first, you need to activate your account by clicking below.</p><br/>
            ${EmailFormat.emailButton({link: dataObj.host+'/projects/auth/verify/'+dataObj.userToken, text: 'Activate Account'})}
            <p>If you have any problems with the activation button please ${EmailFormat.emailLink({link: dataObj.host+'/projects/auth/verify/'+dataObj.userToken, text: 'click here'})} or contact us at admin@wrked.com</p><br/>`;
        const firstFooter = `<p>If you did not sign up to wrked or if you no longer wish to receive any correspondence from us, please unsubscribe by clicking by clicking ${EmailFormat.emailLink({link: dataObj.host+'/projects/auth/verify/register-codered/'+dataObj.userToken, text: 'Unsubscribe'})}</p><br/>`;
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'business@uipep.com',
            from_name: dataObj.from_name ? dataObj.from_name : 'Wrked - Your work place',
            to: dataObj.to,
            subject: 'Wrked - New Account Activation',
            html: html};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** wrked admin email notify on more than one registration from same company **************
const wrkedAdminSameCompanyNotify = (dataObj, next) => {
    // --------- Sample dataObj -------
    // const mailObj = {newUser: {first_name: 'ABC', last_name: 'USER', company_name: 'ABC Inc.', email: 'someemail@test.com'}, superAdmin: {first_name: 'DEF', last_name: 'ADMIN', company_name: 'ABC Inc.', email: 'someemail@test.com'}, host: 'http://localhost:5000', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'New User Registration'};
    // ---------- Function -----------
    const userKey = ['first_name', 'last_name', 'company_name', 'email'];
    if (dataObj.newUser && dataObj.superAdmin && dataObj.host && dataObj.to && dataObj.heading
        && validateData(dataObj.newUser, userKey) && validateData(dataObj.superAdmin, userKey)) {
        const newUser = dataObj.newUser;
        const superAdmin = dataObj.superAdmin;
        let content = `<p>Dear admin,</p><br/>`;
        content = content + `<p>Someone has already registered with us with the following details :</p><br/>`;
        content = content + `<div style="padding-left: 25px">`;
        content = content + `<p>Full Name:  ${superAdmin.first_name}  ${superAdmin.last_name}</p>`;
        if (superAdmin.title) {
            content = content + `<p>Title:  ${superAdmin.title}</p>`;
        }
        content = content + `<p>Company Name:  ${superAdmin.company_name}</p>`;
        content = content + `<p>Email Address:  ${superAdmin.email}</p>`;
        if (superAdmin.telephone) {
            content = content + `<p>Telephone:  ${superAdmin.telephone}</p>`;
        }
        content = content + `</div>`;
        content = content + `<br/>`;
        content = content + `<p>and someone else, from the same company is now trying to register with us with the below details :</p><br/>`;
        content = content + `<div style="padding-left: 25px">`;
        content = content + `<p>Full Name:  ${newUser.first_name}  ${newUser.last_name}</p>`;
        if (newUser.title) {
            content = content + `<p>Title:  ${newUser.title}</p>`;
        }
        content = content + `<p>Company Name:  ${newUser.company_name}</p>`;
        content = content + `<p>Email Address:  ${newUser.email}</p>`;
        if (newUser.telephone) {
            content = content + `<p>Telephone:  ${newUser.telephone}</p>`;
        }
        content = content + `</div>`;
        content = content + `<br/>`;
        const firstFooter = ' ';
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
            to: dataObj.to,
            subject: 'Wrked - New user registration from same company',
            html: html};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** super admin email notify on new registration from same company **************
const toAdminNewUser = (dataObj, next) => {
    // --------- Sample dataObj -------
    // const mailObj = {newUser: {first_name: 'ABC', last_name: 'USER', company_name: 'ABC Inc.', email: 'someemail@test.com'}, superAdmin: {first_name: 'DEF', email: 'someemail@test.com'}, host: 'http://localhost:5000', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'New User Registration'};
    // ---------- Function -----------
    const userKey = ['first_name', 'last_name', 'company_name', 'email'];
    const adminKey = ['first_name', 'email'];
    if (dataObj.newUser && dataObj.superAdmin && dataObj.host && dataObj.to && dataObj.heading
        && validateData(dataObj.newUser, userKey) && validateData(dataObj.superAdmin, adminKey)) {
        const newUser = dataObj.newUser;
        const superAdmin = dataObj.superAdmin;
        let content = `<p>Dear ${superAdmin.first_name},</p><br/>`;
        content = content + `<p>${newUser.first_name}, from your company, has tried to register with us and has provided the below details:</p><br/>`;
        content = content + `<div style="padding-left: 25px">`;
        content = content + `<p>Full Name:  ${newUser.first_name}  ${newUser.last_name}</p>`;
        if (newUser.title) {
            content = content + `<p>Title:  ${newUser.title}</p>`;
        }
        content = content + `<p>Company Name:  ${newUser.company_name}</p>`;
        content = content + `<p>Email Address:  ${newUser.email}</p>`;
        if (newUser.telephone) {
            content = content + `<p>Telephone:  ${newUser.telephone}</p>`;
        }
        content = content + `</div>`;
        content = content + `<br/>`;
        const firstFooter = ' ';
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
            to: dataObj.to,
            subject: 'wrked - New user registration from your company',
            html: html};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** super wrked admin email notify on new registration **************
const toD8AdminNewUser = (dataObj, next) => {
    // --------- Sample dataObj -------
    const mailObj = {newUser: {first_name: 'ABC', last_name: 'USER', company_name: 'ABC Inc.', email: 'someemail@test.com'}, host: 'http://localhost:5000', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}, {'email': 'payments@wrked.com', 'name': 'wrked', 'type': 'cc'}], heading: 'New User Registration'};
    // ---------- Function -----------
    const userKey = ['first_name', 'last_name', 'email'];
    if (dataObj.newUser && dataObj.host && dataObj.to && dataObj.heading
        && validateData(dataObj.newUser, userKey)) {
        const newUser = dataObj.newUser;
        let content = `<p>Hello,</p><br/>`;
        content = content + `<p>New user registered. My user details below: </p><br/>`;
        content = content + `<div style="padding-left: 25px">`;
        content = content + `<p>Full Name:  ${newUser.first_name}  ${newUser.last_name}</p>`;
        if (newUser.title) {
            content = content + `<p>Title:  ${newUser.title}</p>`;
        }
        // content = content + `<p>Company Name:  ${newUser.company_name}</p>`;
        content = content + `<p>Email Address:  ${newUser.email}</p>`;
        if (newUser.telephone) {
            content = content + `<p>Telephone:  ${newUser.telephone}</p>`;
        }
        content = content + `</div>`;
        content = content + `<br/>`;
        const firstFooter = ' ';
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'business@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'Wrked',
            to: dataObj.to,
            subject: 'Code Info: wrked - admin update',
            html: html};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** wrked admin contact us mail **************
const wrkedAdminContact = (dataObj, next) => {
    // --------- Sample dataObj -------
    // const mailObj = {user: {name: 'ABC USER', company: 'ABC Inc.', telephone: '123456789', email: 'someemail@test.com'}, host: 'http://localhost:5000', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'Get In Touch'};
    // ---------- Function -----------
    const userKey = ['name', 'company', 'email', 'telephone', 'message'];
    if (dataObj.user && dataObj.host && dataObj.to && dataObj.heading
        && validateData(dataObj.user, userKey)) {
        const user = dataObj.user;
        let content = `<p>Hi,</p><br/>`;
        content = content + `<p>${user.name}, has contacted you via wrked.com.</p><br/>`;
        content = content + `<div style="padding-left: 25px">`;
        content = content + `<p>Name:  ${user.name}</p>`;
        content = content + `<p>Email ID:  ${user.email}</p>`;
        content = content + `<p>Company:  ${user.company}</p>`;
        content = content + `<p>Telephone:  ${user.telephone}</p>`;
        content = content + `<p>Message:  ${user.message}</p>`;
        content = content + `</div>`;
        content = content + `<p>Please get in touch with ${user.name}.</p><br/>`;
        content = content + `<br/>`;
        const firstFooter = ' ';
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
            to: dataObj.to,
            subject: 'wrked - Website user getting in touch',
            html: html};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** wrked admin notify on new user starter package **************
const wrkedAdminUserPackage = (dataObj, next) => {
    // --------- Sample dataObj -------
    // const mailObj = {newUser: {first_name: 'ABC', last_name: 'USER', company_name: 'ABC Inc.', email: 'someemail@test.com'}, package: 'Premium', host: 'http://localhost:5000', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'Starter Package User Sign Up'};
    // ---------- Function -----------
    const userKey = ['first_name', 'last_name', 'company_name', 'email'];
    if (dataObj.newUser && dataObj.host && dataObj.to && dataObj.heading && dataObj.package
        && validateData(dataObj.newUser, userKey)) {
        const newUser = dataObj.newUser;
        let content = `<p>Hello,</p><br/>`;
        content = content + `<p>A new user has registered for the wrked ${dataObj.package}.</p><br/>`;
        content = content + `<p>The user's details are below:</p><br/>`;
        content = content + `<div style="padding-left: 25px">`;
        content = content + `<p>Full Name:  ${newUser.first_name}  ${newUser.last_name}</p>`;
        if (newUser.title) {
            content = content + `<p>Title:  ${newUser.title}</p>`;
        }
        content = content + `<p>Company Name:  ${newUser.company_name}</p>`;
        content = content + `<p>Email Address:  ${newUser.email}</p>`;
        if (newUser.telephone) {
            content = content + `<p>Telephone:  ${newUser.telephone}</p>`;
        }
        content = content + `</div>`;
        content = content + `<br/>`;
        content = content + `<p>Please find attached, the user's invoice</p><br/>`;
        const firstFooter = ' ';
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
            to: dataObj.to,
            subject: 'Code info : wrked - admin update - ' + dataObj.package + ' Sign Up',
            html: html,
            attachments: [
                {
                    "type": "text/pdf",
                    "name": "invoice.pdf",
                    "content": dataObj.file
                }
            ]
        };
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** wrked admin forgot code password **************
const forgotCodePassword = (dataObj, next) => {
    // --------- Sample dataObj -------
    // const mailObj = {newUser: {first_name: 'ABC', last_name: 'USER', company_name: 'ABC Inc.', email: 'someemail@test.com'}, host: 'http://localhost:5000', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'Invalid Request'};
    // ---------- Function -----------
    const userKey = ['first_name', 'last_name', 'company_name', 'email'];
    if (dataObj.newUser && dataObj.host && dataObj.to && dataObj.heading
        && validateData(dataObj.newUser, userKey)) {
        const newUser = dataObj.newUser;
        let content = `<p>Hello,</p><br/>`;
        content = content + `<p>I have just received an email to reset my password. I have not made this request.</p><br/>`;
        content = content + `<p>Can you please check why I received this email?.</p><br/>`;
        content = content + `<p>My user details are below:</p><br/>`;
        content = content + `<div style="padding-left: 25px">`;
        content = content + `<p>Full Name:  ${newUser.first_name}  ${newUser.last_name}</p>`;
        if (newUser.title) {
            content = content + `<p>Title:  ${newUser.title}</p>`;
        }
        content = content + `<p>Company Name:  ${newUser.company_name}</p>`;
        content = content + `<p>Email Address:  ${newUser.email}</p>`;
        if (newUser.telephone) {
            content = content + `<p>Telephone:  ${newUser.telephone}</p>`;
        }
        content = content + `</div>`;
        content = content + `<br/>`;
        const firstFooter = ' ';
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
            to: dataObj.to,
            subject: 'Code red : wrked - Invalid request to forgot password',
            html: html};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** wrked admin invalid registration request **************
const codeInvalidRegistration = (dataObj, next) => {
    // --------- Sample dataObj -------
    // const mailObj = {newUser: {first_name: 'ABC', last_name: 'USER', company_name: 'ABC Inc.', email: 'someemail@test.com'}, host: 'http://localhost:5000', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'Invalid Registration'};
    // ---------- Function -----------
    const userKey = ['first_name', 'last_name', 'company_name', 'email'];
    if (dataObj.newUser && dataObj.host && dataObj.to && dataObj.heading
        && validateData(dataObj.newUser, userKey)) {
        const newUser = dataObj.newUser;
        let content = `<p>Hello,</p><br/>`;
        content = content + `<p>I have just received a registration email from wrked but I have not registered with wrked. </p><br/>`;
        content = content + `<p>Can you please check why I received this email?. </p><br/>`;
        content = content + `<p>My user details are below:</p><br/>`;
        content = content + `<div style="padding-left: 25px">`;
        content = content + `<p>Full Name:  ${newUser.first_name}  ${newUser.last_name}</p>`;
        if (newUser.title) {
            content = content + `<p>Title:  ${newUser.title}</p>`;
        }
        content = content + `<p>Company Name:  ${newUser.company_name}</p>`;
        content = content + `<p>Email Address:  ${newUser.email}</p>`;
        if (newUser.telephone) {
            content = content + `<p>Telephone:  ${newUser.telephone}</p>`;
        }
        content = content + `</div>`;
        content = content + `<br/>`;
        const firstFooter = ' ';
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
            to: dataObj.to,
            subject: 'Code red : wrked - invalid registration request',
            html: html};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** wrked admin invalid registration reply **************
const codeInvalidRegistrationReply = (dataObj, next) => {
    // --------- Sample dataObj -------
    // const mailObj = {user: {first_name: 'ABC', last_name: 'USER'}, host: 'http://localhost:5000', userToken: 'TOKEN-ABC-123', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'Unsubscribe'};
    // ---------- Function ------------
    if (dataObj.user && dataObj.host && dataObj.userToken && dataObj.to && dataObj.to.length && dataObj.heading
        && validateData(dataObj.user, ['first_name', 'last_name'])) {
        const content = `<p>Hello ${dataObj.user.first_name} ${dataObj.user.last_name},</p><br/>
            <p>We have just received your request saying that you either did not sign up with us or that you no longer want to receive any communications from us.</p><br/>
            <p>Relax, sit back and we will make sure that your email address is unsubscribed.</p><br/>
            <p>If you change your mind, please do come back and register at our ${EmailFormat.emailLink({link: dataObj.host, text: 'website'})}</p><br/>`;
        const firstFooter = ' ';
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
            to: dataObj.to,
            subject: 'wrked - Unsubscribe Request',
            html: html};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** Verify sign up on add user from admin **************
const activationOnAdminAddMail = (dataObj, next) => {
    // --------- Sample dataObj -------
    // const mailObj = {user: {first_name: 'ABC', last_name: 'USER'}, host: 'http://localhost:5000', userToken: 'TOKEN-ABC-123', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'Welcome !'};
    // ---------- Function ------------
    if (dataObj.user && dataObj.host && dataObj.userToken && dataObj.to && dataObj.to.length && dataObj.heading
        && validateData(dataObj.user, ['first_name', 'last_name'])) {
        const content = `<p>Dear ${dataObj.user.first_name} ${dataObj.user.last_name},</p><br/>
            <p>You have been added to your company's wrked.com account.</p><br/>
            <p>In order to activate your account, please click on the button below to verify your email address.</p><br/>
            ${EmailFormat.emailButton({link: dataObj.host+'/auth/'+dataObj.userToken, text: 'Activate Account'})}
            <p>If the button above doesn't work, please ${EmailFormat.emailLink({link: dataObj.host+'/projects/auth/verify/'+dataObj.userToken, text: 'click here'})}.</p><br>`;
        const firstFooter = `<p>If you did not sign up to wrked or if you no longer wish to receive any correspondence from us, please unsubscribe by clicking ${EmailFormat.emailLink({link: dataObj.host+'/projects/auth/verify/register-codered/'+dataObj.userToken, text: 'here'})}</p><br/>`;
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
            to: dataObj.to,
            subject: 'wrked - verify your signup',
            html: html};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** Purchase Email **************
const purchaseEmail = (dataObj, next) => {
    // --------- Sample dataObj -------
    // const mailObj = {user: {first_name: 'ABC', last_name: 'USER', company_name: 'Abc Inc.', email: 'someemail@test.com'}, package: 'Professional', userToken: 'USER-TOKEN-ABC-123', host: 'http://localhost:5000', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'Professional'};
    // ---------- Function ------------
    if (dataObj.user && dataObj.host && dataObj.userToken && dataObj.file && dataObj.to && dataObj.to.length && dataObj.heading
        && validateData(dataObj.user, ['first_name', 'last_name', 'company_name', 'email']) && validateData(dataObj.user, ['first_name', 'last_name'])) {
        const content = `<p>Hello ${dataObj.user.first_name} ${dataObj.user.last_name},</p><br/>
            <p>Thank you for choosing the wrked ${dataObj.package} package - you are now on your way to GDPR readiness. Please find attached your invoice for this purchase.</p><br>
            <p>Your ${dataObj.package} package consists of a detailed GDPR Risk Assessment, a summary report of your current material GDPR deficiencies as well as an assortment of GDPR policy and framework documents and best practice guides. These documents will get you GDPR ready no matter what your current deficiencies are.</p><br>
            <p>In addition, the ${dataObj.package} package also contains our GDPR management tools, which will help you maintain and manage your ongoing GDPR obligations. ${EmailFormat.emailLink({link: dataObj.host+'/portal/dashboard', text: 'click here'})} to have a look at your Dashboard and to get started.</p><br/>
            <p>If you have any problems viewing this email or require any assistance, please do not hesitate to contact us. at eswervarma@uipep.com</p><br/>`;
        const firstFooter = `<p>If you did not sign up to wrked or if you no longer wish to receive any correspondence from us, please unsubscribe by clicking ${EmailFormat.emailLink({link: dataObj.host+'/projects/auth/verify/register-codered/'+dataObj.userToken, text: 'here'})}</p><br/>`;
        const html = EmailFormat.purchaseFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading, plan: dataObj.package});
        // Send Mail
        let sub = ' - let your GDPR readiness begin!';
        if (dataObj.package === 'Starter' || dataObj.package === 'Small Business') {
            sub = ' - let your GDPR readiness begin!';
        } else if (dataObj.package === 'Premium' || dataObj.package === 'Regular' || dataObj.package === 'Not For Profit') {
            sub = ` - let's get you GDPR ready!`;
        } else if (dataObj.package === 'Professional') {
            sub = ` and your all round GDPR readiness`;
        }
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
            to: dataObj.to,
            subject: `wrked - Your order of "${dataObj.package} Plan"`,
            html: html,
            attachments: [
                {
                    "type": "text/pdf",
                    "name": "invoice.pdf",
                    "content": dataObj.file
                }
            ]};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** change password **************
const changePassword = (dataObj, next) => {
    // --------- Sample dataObj -------
    // const mailObj = {user: {first_name: 'ABC', last_name: 'USER'}, host: 'http://localhost:5000', userToken: 'TOKEN-ABC-123', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'Reset Password'};
    // ---------- Function ------------
    if (dataObj.user && dataObj.host && dataObj.userToken && dataObj.to && dataObj.to.length && dataObj.heading
        && validateData(dataObj.user, ['first_name', 'last_name'])) {
        const content = `<p>Dear ${dataObj.user.first_name} ${dataObj.user.last_name},</p><br/>
            <p>Please click the button below to set a new password:</p><br/>
            ${EmailFormat.emailButton({link: dataObj.host+'/auth/forgot/'+dataObj.userToken, text: 'Reset Password'})}
            <p>(If you did not sign up to wrked or if you haven't requested change your, please click ${EmailFormat.emailLink({link: dataObj.host+'/auth/forget-codered/'+dataObj.userToken, text: 'here'})} to notify us of this.)</p><br>
            <p>If you have any problems with the reset button please ${EmailFormat.emailLink({link: dataObj.host+'/auth/forgot/'+dataObj.userToken, text: 'click here'})}.</p><br>
            <p>or contact us at eswervarma@uipep.com</p><br/>`;
        const firstFooter = `<p>If you did not sign up to wrked or if you no longer wish to receive any correspondence from us, please unsubscribe by clicking ${EmailFormat.emailLink({link: dataObj.host+'/auth/register-codered/'+dataObj.userToken, text: 'here'})}</p><br/>`;
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
            to: dataObj.to,
            subject: 'wrked - Password Reset',
            html: html};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** New Coupon **************
const newCoupon = (dataObj, next) => {
    // --------- Sample dataObj -------
    // const mailObj = {host: 'http://localhost:5000', coupon: 'SOME-COUPON', to: [{'email': 'mayur@uipep.com', 'name': 'Mayur Rank', 'type': 'to'}], heading: 'New Coupon'};
    // ---------- Function ------------
    if (dataObj.host && dataObj.coupon && dataObj.to && dataObj.to.length && dataObj.heading) {
        const content = `<p>Dear User,</p><br/>
            <p>Congratulations - we have issued you with a coupon.</p><br/>
            <p>Your coupon code is : <span style="font-weight: bold;">${dataObj.coupon}</span></p><br>
            ${EmailFormat.emailButton({link: dataObj.host, text: 'Go To wrked'})}`;
        const firstFooter = ' ';
        const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
        // Send Mail
        const mailData = {
            from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
            to: dataObj.to,
            subject: 'wrked - New Coupon',
            html: html};
        MailHelper.sendMail("",mailData, (err, data) => {
            if (err) {
                next(err, null);
            } else {
                next(null, {success: true, data});
            }
        });
    } else {
        next('invalid data', null);
    }
};

// ********** Post refferal link updated to refferal **************
const RefferalActivationMail = (dataObj, next) => {
  const content = `<p>Hello,</p><br/>
            <p>Welcome to wrked and thank you for choosing to refer us for GDPR readiness journey.</p><br/>
            <p>We are excited to have you get started, start by sharing the below.</p><br/>
            `+ dataObj.link +` <br />
            <p>If you have any problems with, contact us at eswervarma@uipep.com</p><br/>`;
  const firstFooter = ``;
  const html = EmailFormat.generalFormat({html: content, firstFooter, host: dataObj.host, heading: dataObj.heading});
  // Send Mail
  const mailData = {
    from_email: dataObj.from_email ? dataObj.from_email : 'eswervarma@uipep.com', from_name: dataObj.from_name ? dataObj.from_name : 'wrked',
    to: dataObj.to,
    subject: 'wrked - New Refferal Activation',
    html: html};
  MailHelper.sendMail("",mailData, (err, data) => {
    if (err) {
      next(err, null);
    } else {
      next(null, {success: true, data});
    }
  });
};
// Coupon mail
const userCouponAddMail = function (dataObj, host) {
  if (dataObj.toCc && dataObj.toCc.length && dataObj.couponData.code && dataObj.couponData.tagLine) {
    const mailData = {fromEmail: 'eswervarma@uipep.com', toEmail: 'eswervarma@uipep.com', toCc: dataObj.toCc, fromName: 'wrked', subject: dataObj.couponData.tagLine};
    mailData.html = `<div style="width: 600px; margin: 0 auto; margin-bottom: 100px;border: 1px solid #191637;">
                          <div style="height: 160px;width: 600px;background: url('https://s3.eu-west-2.amazonaws.com/wrked/admin/images/Email+temp+logo.png') no-repeat center center;background-color: white;background-size: contain;"></div>
                          <div style="height: 650px;width: 600px;background: url('https://s3.eu-west-2.amazonaws.com/wrked/admin/images/Blue+background.png');background-size: contain;line-height: 1.5rem;font-weight: 100;">
                            <div style="font-size: 1rem;color: #dadada;padding: 5px 20px;">
                              <p style="color: #dadada;">Dear User,</p>
                              <p style="color: #dadada;">Wrked welcomes you to be GDPR ready..</p>
                              <p style="color: #dadada;">Congratulations, We have new coupon for you..</p>
                              <div style="width: 100%;margin: 20px auto;text-align: center;font-size: 1rem;"><div><a href="${host}/#pricing" style="background: #27a9fd;color: white;padding: 5px 20px;border-radius: 15px;font-weight: bold; text-decoration: none;"><strong>${dataObj.couponData.code}</strong><br /></a></div></div>
                              <p style="color: #dadada;">Kind Regards</p>
                              <p><span style="font-weight: bold;color: #dadada">wrked</span><br><a href="https://www.wrked.com" style="color: #dadada !important;">www.wrked.com</a></p>
                            </div>
                            <br>
                            <div style="text-align: center;font-size: 11px;font-weight: 100;line-height: 1.5;color: #dadada;">
    <div style="padding: 0 70px;color: #dadada;"></div><br>
  <div style="padding: 0; word-wrap: break-word;color: #dadada;">
  </div>
  <div style="margin: 0.8rem 0;color: #dadada;">Copyright &copy; 2018 <a href="https://www.wrked.com" target="_blank" style="color: #dadada;">wrked</a> All rights reserved</div>
  <a href="${host}/subscription-terms-and-conditions" target="_blank" style="color: #dadada;">Terms and Conditions</a> <span style="color: #dadada;">|</span> <a href="${host}/privacy" target="_blank" style="color: #dadada;">Privacy Policy</a>
  </div>
  </div>
  </div>`
    // MailHelper.sendMail(mailData, function (err, data) {
    //     if (err) {
    //         
    //     }
    // });
  }
};

module.exports = {
    activationMail: activationMail,
    wrkedAdminSameCompanyNotify: wrkedAdminSameCompanyNotify,
    toAdminNewUser: toAdminNewUser,
    wrkedAdminContact: wrkedAdminContact,
    wrkedAdminUserPackage: wrkedAdminUserPackage,
    forgotCodePassword: forgotCodePassword,
    codeInvalidRegistration: codeInvalidRegistration,
    codeInvalidRegistrationReply: codeInvalidRegistrationReply,
    activationOnAdminAddMail: activationOnAdminAddMail,
    purchaseEmail: purchaseEmail,
    changePassword: changePassword,
    newCoupon: newCoupon,
    toWrkedAdminNewUser: toD8AdminNewUser,
    userCouponAddMail: userCouponAddMail,
    RefferalActivationMail: RefferalActivationMail
};
