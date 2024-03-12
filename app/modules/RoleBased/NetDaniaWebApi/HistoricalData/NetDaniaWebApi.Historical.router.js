let express = require('express');
let DataProcessor = require('./jsApi/DataProcessor');
let router = express.Router();
let jsApiConnection = require('./jsApi/ConnectionApi');
let jsApiCommonSubscriber = require('./jsApi/Subscribers/CommonSubscriber');
let global = require("./jsApi/v1.1.1.0/NetDaniaJSAPI.js");

let updateLog = [];
let exceptions = [];
let connection = undefined;
let dataProcessor = undefined;

/* GET data example */
/* Once hit, it will instantiate jsApi and send requests for monitor price */
router.post('/data', function (req, res) {
  startMonitoring(req).then((res1) => {
    res.json({ data: res1 })
  });
});
const moment = require('moment')
let startMonitoring = (req) => {
  return new Promise((resolve, reject) => {
    
    let config = {
      host: "https://balancer.netdania.com/StreamingServer/StreamingServer",
      failoverHosts: [
        "https://balancer-cro.netdania.com/StreamingServer/StreamingServer",
        "https://balancer.datafeeds.io/StreamingServer/StreamingServer",
        "https://balancer-cro.datafeeds.io/StreamingServer/StreamingServer"
      ],
      connectionType: global.NetDania.JsApi.ConnectionType.AUTO,
      pollingInterval: global.NetDania.JsApi.PoolingInterval.AUTO,
      usergroup: 'bharathexim',
      password: 'vhFgrt34-5EwG'
    }
    dataProcessor = new DataProcessor();
    connection = new jsApiConnection(config);

    /**
     * 
     * @param {*} data 
     * @param {*} requestId 
     * @param {*} instrData 
     */
    let onHistoricalDataSuccess = (data, requestId, instrData) => {
      try {
        let timeStamptoDate = [];
        data[0]?.forEach(element => {
          const formattedTime = moment(element * 1000.0).format('Do MMM')
          timeStamptoDate.push(formattedTime)
        });
        resolve(JSON.stringify({ date: timeStamptoDate, dateActual: data[0], Opens: data[1], Highs: data[2], Lows: data[3], Closes: data[4] }))
      }
      catch (e) {
        exceptions.push({ exception: writeException(e) });
        
      }
    };

    /**
     * 
     * @param {*} error 
     */
    let onHistoricalDataError = (error, code) => {
      updateLog.push('snapshotDataError ' + error + '\n');
      updateLog.push('snapshotDataErrorCode ' + code + '\n');
    };
    let subscriber = new jsApiCommonSubscriber(onHistoricalDataSuccess, onHistoricalDataError);
    var currentDate = req.body?.CurrentTime != undefined ? new Date(req.body?.CurrentTime) : new Date(); // Current date and time
    
    var time50MinutesAgo = new Date(req.body?.timeStamp);
    var timestampStart = Math.floor(time50MinutesAgo.getTime() / 1000); // Convert milliseconds to seconds for 2 hours ago
    var timestampEnd = Math.floor(currentDate.getTime() / 1000); // Convert milliseconds to seconds for current date
    
    connection.snapshotDataBetweenDate(subscriber, req.body?.CurrencyName + "INR", req.body?.timeScale, "idc", timestampStart, timestampEnd, 50);
  })
};

module.exports = router;
