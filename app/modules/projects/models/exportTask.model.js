const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exportTask = new Schema({
    userId: {
        type: String,
    },
    task: {
        type: Schema.Types.Mixed,
    },
    date: {
        type: String,
    },
    fileType: {
        type: String,
    },
    completed: {
        type: String,
    }

},{timestamps: true });

module.exports = mongoose.model("exportTask", exportTask);