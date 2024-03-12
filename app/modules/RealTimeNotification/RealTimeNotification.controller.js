const RealTimeNotificationModel = require('./RealTimeNotification.model.js');
var mongoose = require('mongoose');
const get = (req) => {
    return new Promise((resolve, reject) => {
    
        RealTimeNotificationModel.find({userId:req.user[0].companyId,deleteflag:'2'}).populate('pipo').then(
            (data) =>{resolve(data)},
            (err) => reject(err)
        )
    })
};
const getById = (req) => {
    return new Promise((resolve, reject) => {
    
        RealTimeNotificationModel.find({userId:req.user[0].companyId,_id:mongoose.Types.ObjectId(req.body.id),deleteflag:'2'}).populate('pipo').then(
            (data) =>{resolve(data)},
            (err) => reject(err)
        )
    })
};
const add = (data) => {
    
    return new Promise((resolve, reject) => {
        var book1 = new RealTimeNotificationModel(data);
        book1.save(function (err, book) {
        if (err) {
            reject(err) 
            console.error(err);
            return;
        }else{
           resolve(book);
        }
        
    });
    })
};
module.exports = {
    get,
    add,
    getById
};
