const MemberModel = require("./member.model");

function addMember(newPackage, data, callback) {
  MemberModel.addMember(newPackage, data, (err, res) => {
    // 
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}

function getMember(userId, callback) {
  
  MemberModel.getMember(userId, (err, res) => {
    // 
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}

function deleteMemeber(userId, callback) {
  
  MemberModel.deleteMemeber(userId, (err, res) => {
    // 
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}
function UpdateMemeber(userId,data,callback) {
  MemberModel.UpdateMemeberByEmail(userId,data, (err, res) => {
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
  addMember: addMember,
  getMember: getMember,
  deleteMemeber:deleteMemeber,
  UpdateMemeber,UpdateMemeber
};
