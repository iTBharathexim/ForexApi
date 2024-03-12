const documentModel = require('./document.model');

function addDocument(newPackage, callback) {
    documentModel.addDocument(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
function getMaster(newPackage, callback) {
    documentModel.getMaster(newPackage, (err, res) => {
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
    addDocument: addDocument,
    getMaster: getMaster
};
