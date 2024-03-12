const irAdviceModel = require('./irAdvice.model');

function addIrAdviceFile(newPackage, callback) {
    irAdviceModel.addIrAdviceFile(newPackage, (err, res) => {
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

function getIrAdvice(userId, callback) {
    irAdviceModel.getIrAdvice(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getIrOrAdvice(userId, callback) {
    irAdviceModel.getIrOrAdvice(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateIrAdvice(id, newPackage, callback) {
    
    irAdviceModel.updateIrAdvice(id, newPackage, (err, res) => {
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

function updateIrAdviceByIrAdvice(id, newPackage, callback) {
    
    irAdviceModel.updateIrAdviceByIrAdvice(id, newPackage, (err, res) => {
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

function getIrAdviceByIrAdvice(billNo, callback) {
    
    irAdviceModel.getIrAdviceByIrAdvice(billNo, (err, res) => {
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

function getIrAdviceByBillNo(billNo, callback) {
    
    irAdviceModel.getIrAdviceByBillNo(billNo, (err, res) => {
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

function updateIrAdviceByIr(id, newPackage, userId, callback) {
    
    irAdviceModel.updateIrAdviceByIr(id, newPackage, userId, (err, res) => {
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

const getInwarByPipo = async (req, res) =>{
    let data = await irAdviceModel.getInwarByPipo(req.params.pipo)
    res.send(data)
}
const getByIdBillNo = async (req, res) =>{
    let data = await irAdviceModel.getByIdBillNo(req.body._id)
    res.send(data)
}
module.exports = {
    addIrAdviceFile: addIrAdviceFile,
    getIrAdvice: getIrAdvice,
    updateIrAdvice: updateIrAdvice,
    updateIrAdviceByIrAdvice: updateIrAdviceByIrAdvice,
    getIrAdviceByIrAdvice: getIrAdviceByIrAdvice,
    getIrAdviceByBillNo: getIrAdviceByBillNo,
    updateIrAdviceByIr: updateIrAdviceByIr,
    getInwarByPipo:getInwarByPipo,
    getByIdBillNo:getByIdBillNo,
    getIrOrAdvice:getIrOrAdvice
};
