const ProjectModelhelper = require('../model_helpers/postproject_model.helper');

const approveProject = (query, data, callback) => {
    ProjectModelhelper.update({ query: query._id, update: data, options: { new: true } }, (err, res) => {
        if (err) {
            
            callback(err, null);
        } else if (res) {
            // 
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
};

module.exports = {
    approveProject
};
