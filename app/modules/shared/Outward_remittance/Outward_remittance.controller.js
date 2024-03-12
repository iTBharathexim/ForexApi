const Outward_remittance_Model = require("./Outward_remittance.model");

function addData(newPackage, callback) {
    Outward_remittance_Model.addData(newPackage, (err, res) => {
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


function getData(userId, callback) {
    
    Outward_remittance_Model.getData(userId, (err, res) => {
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

function updateData(id, bene, callback) {
    
    PipoModel.updateData(id, bene, (err, res) => {
        
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
    addData: addData,
    getData: getData,
    updateData: updateData
};
