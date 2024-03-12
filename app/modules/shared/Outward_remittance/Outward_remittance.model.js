const Outward_Remittance = require("../../projects/models/Outward_remittance.model");
const insuranceFile = require("../../projects/models/insurance.model");
const MasterModel = require("../../projects/models/masterFile.model").MasterModel;
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');

function addData(project, callback) {
    
    Outward_Remittance.create(project.Inward_remittance, (err, res) => {
        if (err) {
            
            callback(err, null);
        } else if (res) {
            //
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


function getData(user, callback) {
    
    const callBackFunc = async (err, receiver) => {
        
        if (err) {
            
            callback(err, null);
        } else if (receiver) {
            
            callback(null,receiver);
        } else {
            callback(null, null);
        }
    }
    Outward_Remittance.find({userId: user.userId,deleteflag:'0'}).exec(callBackFunc)
}



function updateData(id, bene, callback) {
    //
    //
    Outward_Remittance.updateOne({
            _id: id,
        }, {$set: bene},
        function (err, user) {
            //
            if (err) {
                
                callback(err, null);
            } else if (user) {
                //
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}


module.exports = {
    addData: addData,
    getData: getData,
    updateData: updateData,

};
