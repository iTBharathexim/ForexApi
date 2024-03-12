const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: {
    type: String,
  },
  pi_poNo: {
    type: String,
  },
  pipoDetail: Schema.Types.Mixed,

  transactionDate: {
    type: String,
  },
  beneDetail: Schema.Types.Mixed,

  completed: {
    type: Boolean,
  },
  url1: {
    type: String,
  },
  url2: {
    type: String,
  },
  boeNumber: {
    type: String,
  },
  sbno: {
    type: String,
  },
  boeDetails: Schema.Types.Mixed,
  sbDetails: Schema.Types.Mixed,
  file: {
    type: String
  },
  bank: {
    type: String
  },
  ca: {
    type: Boolean
  },
  caDone: {
    type: String
  },
  caUrl: {
    type: String,
  },
  caRequest: {
    type: String,
  },
  email: {
    type: String,
  },
  rbaPurpose: {
    type: String,
  }

},{timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
