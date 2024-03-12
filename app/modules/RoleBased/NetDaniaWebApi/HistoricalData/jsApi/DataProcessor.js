let MonitorPriceResponse = require('./MonitorPriceResponse');

class DataProcessor {
 constructor() {
  this.m_responseObjects = [];
 }

 getPriceData(reqID) {
  return this.m_responseObjects[reqID];
 }

 putResponse(rsObject, key) {
  this.m_responseObjects[key] = rsObject;
 }

 /**
  * Handles a price update
  * @param {*} input 
  * @param {*} reqID 
  */
 processPriceUpdate(input, reqID) {
  //Get related MonitorPriceResponse object
  let rsObject = this.getPriceData(reqID);

  if (rsObject == null) {
   // Initialize object
   rsObject = new MonitorPriceResponse(reqID);
   this.putResponse(rsObject, reqID);
  }

  let FIDs = [];
  // Loop through each field
  for (var count = 0; count < input.length; count++) {
   // A short/byte that specifies the FID (unified):
   const FID = input[count].f;
   // A string holding the field's value:
   const STR = input[count].v;
   // Update changed values
   rsObject.put(FID, STR);
   FIDs[count] = FID;
  }
  rsObject.m_modifiedFIDs = FIDs;
  return rsObject
 }
}
module.exports = DataProcessor;