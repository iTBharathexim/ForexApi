const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const ContactUsSchema = new Schema({
    userId: {
        type: String,
    },
    Name: {
        type: String,
    },
    EmailId: {
        type: String,
    },
    Subject:{
        type: String,
    },
    Message: {
        type: String,
    },
    Type: {
        type: String,
    },
    Status: {
        type: String,
        default: 'pending'
    },
    ScreenShot: {
        type: Array,
    },
    cleared: {
        type: String,
        default: 'not-cleared'
    },
}, { timestamps: true });

const ContactUs = mongoose.model("ContactUs", ContactUsSchema);

module.exports = {
    ContactUs: ContactUs,
    ContactUsSchema: ContactUsSchema
};

