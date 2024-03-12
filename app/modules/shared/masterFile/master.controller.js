const MasterModel = require('./master.model');

function addMasterFile(newPackage, callback) {
    try {
        MasterModel.addMasterFile(newPackage, (err, res) => {
            if (err) {
                callback(err, null);
            } else if (res) {
                callback(null, res);
            } else {
                callback(null, null);
            }
        });
    } catch (error) {
        
    }
}

function getMaster(userId, callback) {
    try {
        MasterModel.getMaster(userId, (err, res) => {
            if (err) {
                callback(err, null);
            } else if (res) {
                callback(null, res);
            } else {
                callback(null, null);
            }
        });
    } catch (error) {
        
    }
}

function getMasterbuyerName(userId, callback) {
    try {
        MasterModel.getMasterbuyerName(userId, (err, res) => {
            if (err) {
                callback(err, null);
            } else if (res) {
                callback(null, res);
            } else {
                callback(null, null);
            }
        });
    } catch (error) {
        
    }
}

function getMasterById(userId, callback) {
    try {
        MasterModel.getMasterById(userId, (err, res) => {
            if (err) {
                callback(err, null);
            } else if (res) {
                callback(null, res);
            } else {
                callback(null, null);
            }
        });
    } catch (error) {
        
    }
}

function getAllMaster(userId, callback) {
    try {
        MasterModel.getAllMaster(userId, (err, res) => {
            if (err) {
                callback(err, null);
            } else if (res) {
                callback(null, res);
            } else {
                callback(null, null);
            }
        });
    } catch (error) {
        
    }

}

function updateMaster(id, newPackage, callback) {
    try {
        MasterModel.updateMasterNew(id, newPackage, (err, res) => {
            if (err) {
                callback(err, null);
            } else if (res) {
                callback(null, res);
            } else {
                callback(null, null);
            }
        });
    } catch (error) {
        
    }
}

function updateMasterWeek(id, newPackage, callback) {
    try {
        MasterModel.updateMasterWeek(id, newPackage, (err, res) => {
            if (err) {
                callback(err, null);
            } else if (res) {
                callback(null, res);
            } else {
                callback(null, null);
            }
        });
    } catch (error) {
        
    }

}

function updateMasterBySb(newPackage, sbno, id, callback) {
    try {
        MasterModel.updateMasterBySb(newPackage, sbno, id, (err, res) => {
            if (err) {
                callback(err, null);
            } else if (res) {
                callback(null, res);
            } else {
                callback(null, null);
            }
        });
    } catch (error) {
        
    }

}


function getMasterBySb(sb, callback) {
    try {
        MasterModel.getMasterBySb(sb, (err, res) => {
            if (err) {
                callback(err, null);
            } else if (res) {
                callback(null, res);
            } else {
                callback(null, null);
            }
        });
    } catch (error) {
        
    }

}


const getSbByPipo = async (req, res) => {
    let data = await MasterModel.getSBDetialsByPIPO(req.params.pipo)
    res.send(data)
}

module.exports = {
    addMasterFile: addMasterFile,
    getMaster: getMaster,
    updateMaster: updateMaster,
    updateMasterBySb: updateMasterBySb,
    getMasterBySb: getMasterBySb,
    getSbByPipo: getSbByPipo,
    getAllMaster: getAllMaster,
    updateMasterWeek: updateMasterWeek,
    getMasterById: getMasterById,
    getMasterbuyerName:getMasterbuyerName
};
