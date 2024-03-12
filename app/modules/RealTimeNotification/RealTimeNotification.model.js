const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RealTimeNotificationSchema = new Schema({
    userId: {
        type: String
    },
    fileType: {
        type: String
    },
    UserDetails: {
        type: String
    },
    deleteflag: {
        type: String,
        default: '0'
    },
}, { timestamps: true, collection: 'RealTimeNotification' });

module.exports = mongoose.model("RealTimeNotification", RealTimeNotificationSchema); 