const postTeam = require("../../projects/models/team.model").TeamModel;
const postUser = require("../../projects/models/users.model").UserModel;
const Member = require("../../projects/models/member.model").MemberModel;
const Users = require('../../projects/models/users.model.js').UserModel;
const mongoose = require("mongoose");

function addTeam(project, callback) {
  postTeam.create(project.team, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      postUser.updateOne({ _id: project.team.userId },
        {
          $set: {
            "companyId": res._id,
            "companyName": project.team.teamName
          }
        }, function (err, user) {
          if (err) {
            callback(err, null);
          } else if (user) {
          } else {
            callback(null, null);
          }
        });
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}


function getTeam(user, callback) {
  postTeam.find({ _id: user }, function (err, user) {
    if (err) {
      callback(err, null);
    } else if (user) {
      callback(null, user);
    } else {
      callback(null, null);
    }
  });
}

function getTeamMemberById(user, callback) {
  Member.find({ email: user }, function (err, user) {
    if (err) {
      callback(err, null);
    } else if (user) {
      Users.find({ companyId: user[0].teamId }, function (err, temp) {
        callback(null, temp);
      });
    } else {
      callback(null, null);
    }
  });
}

function updateTeam(id, team, callback) {
  
  try {
    postTeam.updateOne({ _id: mongoose.Types.ObjectId(id?._id) }, { $set: team }, function (err, user) {
      if (err) {
        callback(err, null);
        throw err;
      } else if (user) {
        callback(null, user);
      } else {
        callback(null, null);
      }
    });
  } catch (error) {
    
  }

}

module.exports = {
  addTeam: addTeam,
  getTeam: getTeam,
  updateTeam: updateTeam,
  getTeamMemberById: getTeamMemberById
};
