const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceTrackingOnboardingScreenSchema = new Schema({
    UserDevice: {
        type: Object,
    },
    deviceId: {
        type: String,
    },
    OnboardingScreen: {
        type: Boolean,
        default: false
    },
}, { collection: 'DeviceTrackingOnboardingScreen', timestamps: true });
const DeviceTrackingOnboardingScreen = mongoose.model("DeviceTrackingOnboardingScreen", DeviceTrackingOnboardingScreenSchema);
module.exports = {
    DeviceTrackingOnboardingScreenModel: DeviceTrackingOnboardingScreen,
    DeviceTrackingOnboardingScreenSchema: DeviceTrackingOnboardingScreenSchema,
    mongoose: mongoose
};