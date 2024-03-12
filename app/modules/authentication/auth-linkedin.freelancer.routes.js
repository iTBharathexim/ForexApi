const express = require('express');
const router = express.Router();
const AuthCtrl = require('./authentication.controller');
const Users = require('../user/user.model');
const resp = require('./../../helpers/responseHelpers');
module.exports = router;
router.post('/signup', function (req, res) {
    if (req.user) {
        if (req.query.role) {
            if (req.user.length > 0) {
                resp.alreadyRegistered(res, 'User Already registered using Facebook, please login with Facebook');
            } else if (req.user.emailId) {
               Users.findUserAndUpdate({ emailId: req.user.emailId }, req.query, (err, doc) => {
                    if (err) {
                        resp.errorResponse(res, 'Internal Server Error');
                    } else if (doc) {
                        resp.successPostResponse(res, doc, 'Successfully Signed Up New User');        
                    } else {
                        resp.noRecordsFound(res, 'No Email ID Found');
                    }
                });
            }
        } else {
            resp.missingBody(res, 'Missing Body');
        }
    } else {
        resp.errorResponse(res, 'Internal Server Error/ User Not registered');
    }
});

router.post('/freelancerlogin', function (req, res) {
    if (req.user) {
        AuthCtrl.socialLogin(req.user, function (err, docs) {
            if (err) {
                resp.errorResponse(res);
            } else if (docs) {
                resp.successPostResponse(res, docs, 'Authenticated');
            } else {
                resp.noRecordsFound(res, 'Invalid Email Id/Password');
            }
        });
    } else {
        resp.missingBody(res, 'Missing Email Id/Password');
    }
});