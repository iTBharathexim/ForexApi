const AdminModel = require('./admin.model');

const approveProject = (projectId, approved, callback) => {
    AdminModel.approveProject({ _id:projectId }, { approved }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
};

module.exports = {
    approveProject
};
