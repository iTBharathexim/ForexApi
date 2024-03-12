const Member = require("../../projects/models/member.model").MemberModel;
const Team = require("../../projects/models/team.model").TeamModel;
const Users = require('../../projects/models/users.model.js').UserModel;

const sgMail = require("@sendgrid/mail");
var mongoose = require('mongoose');
const EmailTemplate = require("../../projects/model_helpers/email_template");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function addMember(project, data, callback) {
  project['deleteflag']=0;
  EmailTemplate.sendMemberEmail(project, data, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      Member.create(project, (err, res) => {
        if (err) {
          callback(err, null);
        } else if (res) {
          Team.updateOne({
              _id: res.teamId,
            },
            { $push: { member: res._id } },
            function (err, user) {
              if (err) {
                callback(err, null);
              } else if (user) {
              } else {
                callback(null, null);
              }
            }
          );
          callback(null, res);
        } else {
          callback(null, null);
        }
      });
    } else {
      callback(null, null);
    }
  });

}
function sendResetQR(project, data, callback) {
  
  
  EmailTemplate.sendResetQR(project, data, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      
    } else {
      callback(null, null);
    }
  });

}
function getMember(user, callback) {
  
  Member.find({ teamId: user ,deleteflag:0}, function (err, user) {
    
    
    if (err) {
      
      callback(err, null);
    } else if (user) {
      
      callback(null, user);
    } else {
      callback(null, null);
    }
  });
}
function deleteMemeber(user,callback) {
  Member.deleteOne({email:user},function (err, user1) {
        
  Users.deleteOne({emailId:user},function (err, user2) {
          
          if (err) {
              
              callback(err, null);
          } else if (user2) {
            callback(null, user2);
              
          } else {
              callback(null, null);
          }
      });
    });
}
function UpdateMemeber(id,data,callback) {
  
  Member.updateMany({_id: id },
    { $set:  data }, function (err, user) {
        
        if (err) {
            
            callback(err, null);
        } else if (user) {
          callback(null, user);
            
        } else {
            callback(null, null);
        }
    });
}
function UpdateMemeberByEmail(id,data,callback) {
  
  Member.updateMany({email: id },{ $set:  data }, function (err, user) {
        
        if (err) {
            
            callback(err, null);
        } else if (user) {
          callback(null, user);
            
        } else {
            callback(null, null);
        }
    });
}

module.exports = {
  addMember: addMember,
  getMember: getMember,
  deleteMemeber:deleteMemeber,
  UpdateMemeber:UpdateMemeber,
  UpdateMemeberByEmail:UpdateMemeberByEmail,
  sendResetQR:sendResetQR
};
