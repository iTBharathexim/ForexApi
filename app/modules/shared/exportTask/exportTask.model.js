const exportFile = require("../../projects/models/exportTask.model");

function addTaskFile(project, callback) {
    
    exportFile.create(project.task, (err, res) => {
        if (err) {
            
            callback(err, null);
        } else if (res) {
            
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getTask(user, callback) {
    
    exportFile.find({ userId: user.userId }, function(err, user) {
        
        
        if (err) {
            
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateTask(id, task, callback) {
    
    
    exportFile.updateOne({
        _id: id
    }, { $set: task }, function(err, user) {
        
        if (err) {
            
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

function getType(user, callback) {
    
    exportFile.find({ userId: user.userId, fileType: user.fileType }, function(err, user) {
        
        
        if (err) {
            
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getOne(user, callback) {
    
    exportFile.find({ _id: user.id }, function(err, user) {
        
        
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
    addTaskFile: addTaskFile,
    getTask: getTask,
    updateTask: updateTask,
    getType: getType,
    getOne: getOne
};