const postDocument = require("../../projects/models/document.model").DocumentModel;
const master = require("../../projects/models/masterFile.model").MasterModel;
function addDocument(project, callback) {
  postDocument.create(project, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}
function getMaster(project, callback) {
  master.findOne({ sbno: "7551320" }, function (err, user) {
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
  addDocument: addDocument,
  getMaster: getMaster
};
