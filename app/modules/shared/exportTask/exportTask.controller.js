const taskModel = require("./exportTask.model");

function addTaskFile(newPackage, callback) {
    taskModel.addTaskFile(newPackage, (err, res) => {
        
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getTask(userId, callback) {
    
    taskModel.getTask(userId, (err, res) => {
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

function updateTask(id, task, callback) {
    
    taskModel.updateTask(id, task, (err, res) => {
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

function getType(userId, callback) {
    
    taskModel.getType(userId, (err, res) => {
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

function getOne(userId, callback) {
    
    taskModel.getOne(userId, (err, res) => {
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



module.exports = {
    addTaskFile: addTaskFile,
    getTask: getTask,
    updateTask: updateTask,
    getType: getType,
    getOne: getOne
};