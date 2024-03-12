const Users = require('../projects/models/users.model.js').UserModel;

function findUserById(id, callback) {
    let projection = {
        password: 0
    };
    Users.findById(id, projection, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

module.exports = {
    findUserById: findUserById

};
