const blcopyFile = require("../../projects/models/UserLoginSession.model.js");

function addblcopyFile(project, callback) {
    
    blcopyFile.create(project.blcopy, (err, res) => {
        if (err) {
            
            callback(err, null);
        } else if (res) {
            
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getblcopy(user, callback) {
    
    blcopyFile.find({ userId: user.userId }).populate('pipo').populate({
        path: 'pipo',
        populate: {
            path: 'AdviceRef'
        }
    }).populate({
        path: 'pipo',
        populate: {
            path: 'TransactionRef'
        }
    }).exec( function(err, user) {
        
        
        if (err) {
            
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}
function getSingleblcopy(user, callback) {
    
    blcopyFile.find({ blcopyrefNumber: user.userId }).populate('pipo').exec( function(err, user) {
        
        
        if (err) {
            
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}
function updateblcopy(id, bene, callback) {
    
    
    blcopyFile.updateOne({
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


const getDocSubmitedNoAwaited = async (req,res) => {

    try {


        // let data ={};
        // data.toTalcount = await blcopyFile.find({}).count()
        // data.bankReferenceCount = await blcopyFile.find({blcopyrefNumber : {"$exists" : true, "$ne" : ""}}).count()
        // data.notBankReferenceCount = await blcopyFile.find({$or:[{"blcopyrefNumber":{"$exists" : false}},{"blcopyrefNumber":{ "$eq" : ""}}]}).count()
        // return data


        let importData = await blcopyFile.aggregate([
            { $match: { "file": "import",userId: req.user[0].companyId } },
            {
                $group: {
                    _id: '$buyerName',
                    blcopyrefNumber : { $addToSet: '$blcopyrefNumber' },
                    toTalcount: { $sum: 1 },
                  

                }
            }
        ])

        

        
        let exportData = await blcopyFile.aggregate([
            { $match: { "file": "export",userId: req.user[0].companyId } },
            {
                $group: {
                    _id: '$buyerName',
                    blcopyrefNumber : { $addToSet: '$blcopyrefNumber' },
                    toTalcount: { $sum: 1 },
                  

                }
            }
        ])

        

        return {import:importData ,export: exportData}


    } catch (error) {
        return error
    }
    // let toTalcount = await blcopyFile.find({}).count()
}

// {
//     "docSubmitedAndNoAwaitedData": {
//         "toTalcount": 40,
//         "bankReferenceCount": 35,
//         "notBankReferenceCount": 5
//     }
// }



const getTotalBillLogdement = async () => {

    try {
        let count = await blcopyFile.find({ blcopyrefNumber: { "$exists": true, "$ne": "" } }).count()
        return count
    } catch (error) {
        return error
    }
    // let toTalcount = await blcopyFile.find({}).count()

}

module.exports = {
    addblcopyFile: addblcopyFile,
    getSingleblcopy: getSingleblcopy,
    getblcopy: getblcopy,
    updateblcopy: updateblcopy,
    getDocSubmitedNoAwaited: getDocSubmitedNoAwaited,
    getTotalBillLogdement: getTotalBillLogdement
};

