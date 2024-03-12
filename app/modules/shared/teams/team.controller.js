const TeamModel = require('./team.model');

function addTeam(newPackage, callback) {
    
    TeamModel.addTeam(newPackage, (err, res) => {

        
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getTeam(newPackage, callback) {
    
    TeamModel.getTeam(newPackage, (err, res) => {
        
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
function getTeambyId(newPackage, callback) {
    
    TeamModel.getTeam(newPackage, (err, res) => {
        
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
function getTeamMember(newPackage, callback) {
    
    TeamModel.getTeamMemberById(newPackage, (err, res) => {
        
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


function updateTeam(id,team, callback) {
    TeamModel.updateTeam(id,team, (err, res) => {
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
    addTeam: addTeam,
    getTeam: getTeam,
    updateTeam: updateTeam,
    getTeamMember:getTeamMember,
    getTeambyId:getTeambyId
};
