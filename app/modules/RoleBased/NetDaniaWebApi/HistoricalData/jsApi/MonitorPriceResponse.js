/**
 * Contains helper-methods for parsing responses from the StreamingServer.
 */
class MonitorPriceResponse {
 constructor(reqID) {

  this.m_reqID = reqID;
  this.m_modifiedFIDs = [];
  this.m_availableFIDs = [];
  this.m_mapFIDs = [];
 }

 /**
  * Internal use. Do never call this method.
  * @param {*} FID 
  * @param {*} val 
  */
 put(FID, val) {
  var object = this.m_mapFIDs[FID];
  this.m_mapFIDs[FID] = val;

  //add the new id to the available id
  if (object == null) {
   this.m_availableFIDs.push(FID)
  }
 }

 /**
  * Returns the data of the field with this FID, or "N/A" if this field is not available.
  * 
  * @param {*} FID 
  */
 get(FID) {
  var val = this.m_mapFIDs[FID];
  if (val == null || val == undefined) {
   return "N/A";
  }
  return val;
 }

}

module.exports = MonitorPriceResponse;