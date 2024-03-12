const letterLCFile = require("../../projects/models/letterLC.model");

function addLetterLCFile(project, callback) {
    letterLCFile.create(project.letterLC, (err, res) => {
        if (err) {
            
            callback(err, null);
        } else if (res) {
            
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


async function getLetterLC(user, callback) {
    
    var temp=['0','-1'];
    var DATA=[];
    for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        await letterLCFile.find({ userId: user.userId,file:user.file,deleteflag:element}).populate('pipo').sort({'_id': -1}).then((getuser)=> {
            
            if (getuser.length!= 0) {
                for (let j = 0; j < getuser.length; j++) {
                    DATA.push(getuser[j]);   
                }
            }
            if((index+1) == temp.length){
                callback(null,DATA);
            }
        });
    }
}

function getSingleLetterLC(user, callback) {
    
    letterLCFile.find({ letterOfCreditNumber: user.userId }, function(err, user) {
        
        
        if (err) {
            
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateLetterLC(id, bene, callback) {
    
    
    letterLCFile.updateOne({
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
    addLetterLCFile: addLetterLCFile,
    getLetterLC: getLetterLC,
    getSingleLetterLC: getSingleLetterLC,
    updateLetterLC: updateLetterLC,
};
