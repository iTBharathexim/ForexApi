const PipoModel = require("./pi_po.model");

function addPipoFile(newPackage, callback) {
    PipoModel.addPipoFile(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getSinglePipo(id, callback) {
    PipoModel.getSinglePipo(id, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getPipo(userId, callback) {
    PipoModel.getPipo(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getPipoNo(userId, callback) {
    PipoModel.getPipoNo(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getPipoNoCustom(userId, callback) {
    PipoModel.getPipoNoCustom(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


function updatePipo(id, bene, callback) {
    PipoModel.updatePipo(id, bene, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateSinglePipo(id, file, doc, callback) {
    PipoModel.updateSinglePipo(id, file, doc, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateManyPipo(id, file, doc, data, userId, callback) {
    PipoModel.updateManyPipo(id, file, doc, data, userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateManyPipo1(id, file, callback) {
    PipoModel.updateManyPipo1(id, file, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getManyPipo(pipo, id, callback) {
    PipoModel.getManyPipo(pipo, id, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getPipoByBene(beneName, callback) {
    PipoModel.getPipoByBene(beneName, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

const getPipos = async (req, res) => {
    let data = await PipoModel.getPipos(req, res)
    return data
}


const getPipoByid = async (req, res) => {
    let data = await PipoModel.getPipoByid(req, res)
    return data
}


const deletePIPOByid = async (req, res) => {
    let data = await PipoModel.deletePIPOByid(req, res)
    return data
}


const updatePipoByid = async (req, res) => {
    let data = await PipoModel.updatePipoByid(req, res)
    return data
}
const deleteflag = async (req, res) => {
    let data = await PipoModel.deleteflag(req, res)
    return data
}

const getPipoByCustomer = async (req, res) => {
    let data = await PipoModel.getPipoByCustomer(req, res)
    return data
}

const getPipoByType = async (req, res) => {
    let data = await PipoModel.getPipoByType(req, res)
    return data
}

function getPipoByBeneBuyer(req, callback) {
    PipoModel.getPipoByBeneBuyer(req, (err, res) => {
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
    addPipoFile: addPipoFile,
    getPipo: getPipo,
    getSinglePipo: getSinglePipo,
    updatePipo: updatePipo,
    updateSinglePipo: updateSinglePipo,
    updateManyPipo: updateManyPipo,
    getManyPipo: getManyPipo,
    getPipoByBene: getPipoByBene,
    updateManyPipo1: updateManyPipo1,
    getPipos: getPipos,
    updatePipoByid: updatePipoByid,
    deletePIPOByid: deletePIPOByid,
    getPipoByid: getPipoByid,
    deleteflag: deleteflag,
    getPipoByCustomer: getPipoByCustomer,
    getPipoByType: getPipoByType,
    getPipoByBeneBuyer: getPipoByBeneBuyer,
    getPipoNo: getPipoNo,
    getPipoNoCustom:getPipoNoCustom
};
