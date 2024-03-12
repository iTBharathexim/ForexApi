const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserLoginSessionSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
   
},{timestamps: true });

module.exports = mongoose.model("UserLoginSession", UserLoginSessionSchema);
