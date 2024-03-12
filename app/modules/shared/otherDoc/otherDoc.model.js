const otherDocFile = require("../../projects/models/otherDoc.model");

function addOtherDocFile(project, callback) {
    
    otherDocFile.create(project.otherDoc, (err, res) => {
        if (err) {
            
            callback(err, null);
        } else if (res) {
            
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getOtherDoc(user, callback) {
    
    otherDocFile.find({ userId: user.userId }, function(err, user) {
        
        
        if (err) {
            
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleOtherDoc(user, callback) {
    
    otherDocFile.find({ otherDocNumber: user.userId }, function(err, user) {
        
        
        if (err) {
            
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateOtherDoc(id, bene, callback) {
    
    
    otherDocFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            
            if (err) {
                
                callback(err, null);
            } else if (user) {
                
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addOtherDocFile: addOtherDocFile,
    getOtherDoc: getOtherDoc,
    getSingleOtherDoc: getSingleOtherDoc,
    updateOtherDoc: updateOtherDoc,
};
