const ebrcFile = require("../../projects/models/EBRC.model");

function addEbrcFile(project, callback) {
    
    ebrcFile.create(project.ebrc, (err, res) => {
        if (err) {
            
            callback(err, null);
        } else if (res) {
            
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getEbrc(user, callback) {
    ebrcFile.find({ userId: user.userId ,file: user.filetype }, function(err, user) {     
        if (err) {
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    }).populate('pipo');
}
function getSingleEbrc(user, callback) {
    
    ebrcFile.find({ EbrcNumber: user.userId }, function(err, user) {
        
        
        if (err) {
            
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}
function updateEbrc(id, bene, callback) {
    
    
    ebrcFile.updateOne({
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
    addEbrcFile: addEbrcFile,
    getSingleEbrc: getSingleEbrc,
    getEbrc: getEbrc,
    updateEbrc: updateEbrc,
};
