const express = require("express");
const router = express.Router();
const resp = require('../../../helpers/responseHelpers');
const AdminCtrl = require('./admin.controller');
module.exports = router;

router.put('/approveProject', (req, res) => {
    if (req.user[0].role === 'Admin') {
        if (req.query.projectId && req.body.approved) {
            AdminCtrl.approveProject(req.query.projectId, req.body.approved, (err, doc) => {
                if (err) {
                    resp.errorResponse(res, err, 501, 'Internal Server Error, Please Try Again Later');
                } else if (doc) {
                    resp.successPostResponse(res, doc, "Project Has Been Approved");
                } else {
                    resp.noRecordsFound(res, 'Unable To Update, Please Try Again Later')
                }
            });
        } else {
            resp.missingBody(res, "Missing Body");
        }
    } else {
        resp.unauthorized(res, "Unauthorized");
    }
});