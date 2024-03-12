const Cloud = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, './root-booking-369711-aaad9db4cbfe.json');

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'root-booking-369711',
});
module.exports = storage;