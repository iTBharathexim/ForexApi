const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleBase_SingIn_SingUpSchema = new Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
    },
    last_name: {
        type: String,
    },
    password: {
        type: String,
        minlength: 4
    },
    emailId: {
        type: String,
        unique: true,
        required: [true, ["Email Id Is Required"]],
    },
    companyId: {
        type: String
    },
    companyName: {
        type: String
    },
    mobileNo: {
        type: String,
    },
    emailIdVerified:{
        type: Boolean,
        default: false
    },
    termscondition: {
        type: Boolean,
        default: false
    },
    role:{
        type: String
    },
    isLoggin: {
        type: Boolean,
        default: false
    }
}, { collection: 'RoleBase_SingIn_SingUp', timestamps: true });
const RoleBase_SingIn_SingUp = mongoose.model("RoleBase_SingIn_SingUp", RoleBase_SingIn_SingUpSchema);
module.exports = {
    RoleBase_SingIn_SingUpModel: RoleBase_SingIn_SingUp,
    RoleBase_SingIn_SingUpSchema: RoleBase_SingIn_SingUpSchema,
    mongoose:mongoose
};