const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
async function main() {
    mongoose.connection.close();
    mongoose.disconnect();
    await mongoose.connect(process?.env?.DB_URL.toString(), {
        useNewUrlParser: true,
        connectTimeoutMS: 100000,
        serverSelectionTimeoutMS: 1000000,
        useUnifiedTopology: true,
        keepAlive: false,
    }).then((res) => console.log("connected db")).catch((err)=>{
        main().then((res) => console.log("trying re-connected db"));
    });
}
module.exports = { mongoose: mongoose, main: main, CacheMemory: myCache }