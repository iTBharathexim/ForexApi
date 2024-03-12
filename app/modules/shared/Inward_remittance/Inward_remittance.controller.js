const Inward_remittance_Model = require("./Inward_remittance.model");

function addPipoFile(newPackage, callback) {
    Inward_remittance_Model.addPipoFile(newPackage, (err, res) => {
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

function getSinglePipo(id, callback) {
    
    Inward_remittance_Model.getSinglePipo(id, (err, res) => {
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

function getPipo(userId, callback) {    
    Inward_remittance_Model.getPipo(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getSomeInfo(userId, callback) {    
    Inward_remittance_Model.getSomeInfo(userId, (err, res) => {
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
    Inward_remittance_Model.updatePipo(id, bene, (err, res) => {
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
    
    Inward_remittance_Model.updateSinglePipo(id, file, doc, (err, res) => {
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

function updateManyPipo(id, file, doc,data, userId, callback) {
    
    Inward_remittance_Model.updateManyPipo(id, file, doc,data, userId, (err, res) => {
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
    
    Inward_remittance_Model.updateManyPipo1(id, file, (err, res) => {
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

function getManyPipo(pipo, id, callback) {
    
    Inward_remittance_Model.getManyPipo(pipo, id, (err, res) => {
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

function getPipoByBene(beneName, callback) {
    
    Inward_remittance_Model.getPipoByBene(beneName, (err, res) => {
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

const getPipos = async (req, res) =>{
    let data = await Inward_remittance_Model.getPipos(req, res)
    return data
}


const getPipoByid = async (req, res) =>{
    let data = await Inward_remittance_Model.getPipoByid(req, res)
    return data
}


const deletePIPOByid = async (req, res) =>{
    let data = await Inward_remittance_Model.deletePIPOByid(req, res)
    return data
}


const updatePipoByid = async (req, res) =>{
    let data = await Inward_remittance_Model.updatePipoByid(req, res)
    return data
}
const deleteflag = async (req,res) => {
    let data = await Inward_remittance_Model.deleteflag(req,res)
    return data
}

const getPipoByCustomer = async (req, res) =>{
    let data = await Inward_remittance_Model.getPipoByCustomer(req, res)
    
    return data
}

const getPipoByType = async (req, res) =>{
    let data = await Inward_remittance_Model.getPipoByType(req, res)
    
    return data
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
    getPipos : getPipos,
    updatePipoByid : updatePipoByid,
    deletePIPOByid : deletePIPOByid,
    getPipoByid : getPipoByid,
    deleteflag:deleteflag,
    getPipoByCustomer:getPipoByCustomer,
    getPipoByType:getPipoByType,
    getSomeInfo:getSomeInfo
};
