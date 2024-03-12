let express = require('express');
let DataProcessor = require('./modules/jsApi/DataProcessor');
let router = express.Router();
let jsApiConnection = require('./modules/jsApi/ConnectionApi');
let jsApiCommonSubscriber = require('./modules/jsApi/Subscribers/CommonSubscriber');
let global = require("./modules/jsApi/v1.1.1.0/NetDaniaJSAPI.js");

let updateLog = {};
let exceptions = [];
let connection = undefined;
let dataProcessor = undefined;

/* GET data example */
/* Once hit, it will instantiate jsApi and send requests for monitor price */
router.get('/data', function (req, res) {
  res.json({ data: exceptions });
});

const FXMarginDetailsModel = require('../FXMarginDetails/FXMarginDetailsSchema.js').FXMarginDetailsModel;
const FXTriggerModel = require('../FXTrigger/FXTriggerSchema').FXTriggerModel;
var admin = require("firebase-admin");
const FXMarginDetailsCtrl = require("../FXTrigger/FXTrigger.controller");

let startMonitoring = async (io, client, myCache, userdata) => {
  try {
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
    let ResultDataFxMargin = [];
    let ResultDataFxMarginTrigger = []
    await FXMarginDetailsModel.find({ userId: userdata?.userId?.toString() }, function (err, result) {
      ResultDataFxMargin = result;
    });

    await FXTriggerModel.find({ userId: userdata?.userId?.toString() }, function (err, result) {
      ResultDataFxMarginTrigger = result
    });
    /**
     * 
     * @param {*} data 
     * @param {*} requestId 
     * @param {*} instrData 
     */
    let onPriceDataSuccess = async (data, requestId, instrData) => {
      data['FXMARGIN_DATA'] = ResultDataFxMargin;
      data['FXMARGIN_TRIGGER_DATA'] = ResultDataFxMarginTrigger;
      AsyncData(data, requestId).then(async (res) => {
        myCache?.set("JsApiCommonSubscriber", res, 10000);
        await client.emit('test', res)

        let ObjectLength = Object.keys(res);
        if (userdata?.deviceId != null) {
          for (let index = 0; index < ObjectLength?.length; index++) {
            let element = res[ObjectLength[index]];
            let splitkey = ObjectLength[index]?.split('_');
            let FR_TRIGGER_DATA = { FXMarginTrigger: element?.FXMARGIN_TRIGGER_DATA != undefined ? element?.FXMARGIN_TRIGGER_DATA : [] };
            if (FR_TRIGGER_DATA?.FXMarginTrigger?.length != 0 && FR_TRIGGER_DATA?.FXMarginTrigger?.length != 0) {
              if (((FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate - (.02)) <= element?.QUOTE_BID) && FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate != 0) {
                const message = {
                  token: userdata?.deviceId,
                  notification: {
                    title: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate})`,
                    body: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate})`
                  },
                };
                admin.messaging().send(message).then((res) => {
                  FR_TRIGGER_DATA.FXMarginTrigger[0].Inward[splitkey[0]]['TriggerRate'] = 0
                  FXMarginDetailsCtrl.updateUserById(userdata?.userId, { Inward: FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward }).then((userres) => { })
                }).catch((error) => {
                });
              }
              if (((FR_TRIGGER_DATA?.FXMarginTrigger[1]?.Outward[splitkey[0]]?.TriggerRate - (.02)) <= element?.QUOTE_ASK) && FR_TRIGGER_DATA?.FXMarginTrigger[1]?.Outward[splitkey[0]]?.TriggerRate != 0) {
                const message = {
                  token: userdata?.deviceId,
                  notification: {
                    title: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[1]?.Outward[splitkey[0]]?.TriggerRate})`,
                    body: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[1]?.Outward[splitkey[0]]?.TriggerRate})`
                  },
                };
                admin.messaging().send(message).then((res) => {
                  FR_TRIGGER_DATA.FXMarginTrigger[0].Outward[splitkey[0]]['TriggerRate'] = 0
                  FXMarginDetailsCtrl.updateUserById(userdata?.userId, { Outward: FR_TRIGGER_DATA?.FXMarginTrigger[1]?.Outward }).then((userres) => { })
                }).catch((error) => {
                });
              }
            }
          }
        }

      })
    };

    /**
     * 
     * @param {*} error 
     */
    let onPriceDataError = (error, code) => {

    };

    let subscriber = new jsApiCommonSubscriber(onPriceDataSuccess, onPriceDataError);
    let requestId1 = connection.monitorPriceData(subscriber, "USDINR", "idc");
    let requestId2 = connection.monitorPriceData(subscriber, "EURINR", "idc");
    let requestId3 = connection.monitorPriceData(subscriber, "GBPINR", "idc");
    let requestId4 = connection.monitorPriceData(subscriber, "HKDINR", "idc");
    let requestId5 = connection.monitorPriceData(subscriber, "CHFINR", "idc");
    let requestId6 = connection.monitorPriceData(subscriber, "EURUSD", "idc");
    let requestId7 = connection.monitorPriceData(subscriber, "SGDINR", "idc");
    let requestId8 = connection.monitorPriceData(subscriber, "JPYINR", "idc");
    let requestId9 = connection.monitorPriceData(subscriber, "AUDINR", "idc");
    let requestId10 = connection.monitorPriceData(subscriber, "CNYINR", "idc");
  } catch (error) {

  }
};


let startAllDaysMonitoring = async () => {
  try {
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
    let ResultDataFxMargin = [];
    /**
     * 
     * @param {*} data 
     * @param {*} requestId 
     * @param {*} instrData 
     */
    let onPriceDataSuccess = async (data, requestId, instrData) => {
      await FXTriggerModel.find({}, function (err, result) {
        ResultDataFxMarginTrigger = result
        data['FXMARGIN_TRIGGER_DATA'] = ResultDataFxMarginTrigger;
        AsyncData(data, requestId).then(async (res) => {
          ResultDataFxMarginTrigger?.forEach(FXMARGIN_TRIGGER_DATA => {
            FXMARGIN_TRIGGER_DATA?.deviceId?.forEach(deviceId => {
              if (deviceId != null) {
                let ObjectLength = Object.keys(res);
                for (let index = 0; index < ObjectLength?.length; index++) {
                  let element = res[ObjectLength[index]];
                  let splitkey = ObjectLength[index]?.split('_');
                  let FR_TRIGGER_DATA = { FXMarginTrigger: FXMARGIN_TRIGGER_DATA != undefined ? [FXMARGIN_TRIGGER_DATA] : [] };
                 // console.log("End Time",new Date())
                  if (FR_TRIGGER_DATA?.FXMarginTrigger?.length != 0 && FR_TRIGGER_DATA?.FXMarginTrigger?.length != 0) {
                    if (((FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate) <= element?.QUOTE_BID) && FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate != 0 && FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.StatusTrigger == true) {
                      const message = {
                        token: deviceId,
                        notification: {
                          title: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate})`,
                          body: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward[splitkey[0]]?.TriggerRate})`
                        },
                      };
                      admin.messaging().send(message).then((res) => {
                        console.log("Trigger Start:"+ new Date()+ ", " +message.token)
                        FR_TRIGGER_DATA.FXMarginTrigger[0].Inward[splitkey[0]]['TriggerRate'] = 0
                        FXMarginDetailsCtrl.updateUserById(FXMARGIN_TRIGGER_DATA?.userId, { Inward: FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Inward, StatusTrigger: false }).then((userres) => { })
                        console.log("Trigger End:"+ new Date()+ ", " +message.token)
                      }).catch((error) => {
                      });
                    }
                    if (((FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Outward[splitkey[0]]?.TriggerRate) >= element?.QUOTE_ASK) && FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Outward[splitkey[0]]?.TriggerRate != 0 && FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Outward[splitkey[0]]?.StatusTrigger == true) {
                      const message = {
                        token: deviceId,
                        notification: {
                          title: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Outward[splitkey[0]]?.TriggerRate})`,
                          body: `Live rate is nearing to trigger value Currency(${splitkey[0]}) Trigger value(${FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Outward[splitkey[0]]?.TriggerRate})`
                        },
                      };
                      admin.messaging().send(message).then((res) => {
                        FR_TRIGGER_DATA.FXMarginTrigger[0].Outward[splitkey[0]]['TriggerRate'] = 0;
                        FR_TRIGGER_DATA.FXMarginTrigger[0].Outward[splitkey[0]]['StatusTrigger'] = false
                        FXMarginDetailsCtrl.updateUserById(FXMARGIN_TRIGGER_DATA?.userId, { Outward: FR_TRIGGER_DATA?.FXMarginTrigger[0]?.Outward, StatusTrigger: false }).then((userres) => { })
                      }).catch((error) => {
                      });
                    }
                  }
                }
              }
            });

          });


        })
      });

    };

    /**
     * 
     * @param {*} error 
     */
    let onPriceDataError = (error, code) => {

    };

    let subscriber = new jsApiCommonSubscriber(onPriceDataSuccess, onPriceDataError);
    let requestId1 = connection.monitorPriceData(subscriber, "USDINR", "idc");
    let requestId2 = connection.monitorPriceData(subscriber, "EURINR", "idc");
    let requestId3 = connection.monitorPriceData(subscriber, "GBPINR", "idc");
    let requestId4 = connection.monitorPriceData(subscriber, "HKDINR", "idc");
    let requestId5 = connection.monitorPriceData(subscriber, "CHFINR", "idc");
    let requestId6 = connection.monitorPriceData(subscriber, "EURUSD", "idc");
    let requestId7 = connection.monitorPriceData(subscriber, "SGDINR", "idc");
    let requestId8 = connection.monitorPriceData(subscriber, "JPYINR", "idc");
    let requestId9 = connection.monitorPriceData(subscriber, "AUDINR", "idc");
    let requestId10 = connection.monitorPriceData(subscriber, "CNYINR", "idc");
  } catch (error) {

  }
};


function AsyncData(data, requestId) {
  return new Promise(async (resolve, reject) => {
    try {
    //console.log("Start Time", new Date())
      let resObject = dataProcessor.processPriceUpdate(data, requestId)
      
      exceptions = updateLog;
      let FORWARD_WHITE_LISTING = ['EUR_INR', 'GBP_INR', 'HKD_INR', "CHF_INR"];
      
      //console.log(resObject,"resObject")
      if (resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME) != 'N/A') {
        let strTimeStamp = resObject.get(global.NetDania.JsApi.Fields.QUOTE_TIME_STAMP);
        strTimeStamp = new Date(strTimeStamp * 1000).toISOString();
        let splitext = resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")?.join('_');

        let divisonvalue = parseFloat(2.0000);
        let QUOTE_ASK_ON = SumTwoNumber(resObject.get(47), resObject.get(48));
        let QUOTE_ASK_SN = SumTwoNumber(resObject.get(49), resObject.get(50));
        let QUOTE_ASK_TN = SumTwoNumber(resObject.get(51), resObject.get(52));
        let QUOTE_ASK_1W = SumTwoNumber(resObject.get(53), resObject.get(54));
        let QUOTE_ASK_2W = SumTwoNumber(resObject.get(55), resObject.get(56));
        let QUOTE_ASK_3W = SumTwoNumber(resObject.get(57), resObject.get(58));
        let QUOTE_ASK_1M = SumTwoNumber(resObject.get(59), resObject.get(60));
        let QUOTE_ASK_2M = SumTwoNumber(resObject.get(61), resObject.get(62));
        let QUOTE_ASK_3M = SumTwoNumber(resObject.get(63), resObject.get(64));
        let QUOTE_ASK_4M = SumTwoNumber(resObject.get(65), resObject.get(66));
        let QUOTE_ASK_5M = SumTwoNumber(resObject.get(67), resObject.get(68));
        let QUOTE_ASK_6M = SumTwoNumber(resObject.get(69), resObject.get(70));
        let QUOTE_ASK_7M = SumTwoNumber(resObject.get(71), resObject.get(72));
        let QUOTE_ASK_8M = SumTwoNumber(resObject.get(73), resObject.get(74));
        let QUOTE_ASK_9M = SumTwoNumber(resObject.get(75), resObject.get(76));
        let QUOTE_ASK_10M = SumTwoNumber(resObject.get(77), resObject.get(78));
        let QUOTE_ASK_11M = SumTwoNumber(resObject.get(79), resObject.get(80));
        let QUOTE_ASK_1Y = SumTwoNumber(resObject.get(81), resObject.get(82));
        let QUOTE_ASK_2Y = SumTwoNumber(resObject.get(83), resObject.get(84));
        let QUOTE_ASK_3Y = SumTwoNumber(resObject.get(85), resObject.get(86));
        let QUOTE_ASK_4Y = SumTwoNumber(resObject.get(87), resObject.get(88));
        let QUOTE_ASK_5Y = SumTwoNumber(resObject.get(89), resObject.get(90));

        let DIVISON_QUOTE_ASK_ON = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_ON))) : SumTwoNumber2(QUOTE_ASK_ON);
        let DIVISON_QUOTE_ASK_SN = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_SN))) : SumTwoNumber2(QUOTE_ASK_SN);
        let DIVISON_QUOTE_ASK_TN = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_TN))) : SumTwoNumber2(QUOTE_ASK_TN);
        let DIVISON_QUOTE_ASK_1W = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_1W))) : SumTwoNumber2(QUOTE_ASK_1W);
        let DIVISON_QUOTE_ASK_2W = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_2W))) : SumTwoNumber2(QUOTE_ASK_2W);
        let DIVISON_QUOTE_ASK_3W = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_3W))) : SumTwoNumber2(QUOTE_ASK_3W);
        let DIVISON_QUOTE_ASK_1M = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_1M))) : SumTwoNumber2(QUOTE_ASK_1M);
        let DIVISON_QUOTE_ASK_2M = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_2M))) : SumTwoNumber2(QUOTE_ASK_2M);
        let DIVISON_QUOTE_ASK_3M = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_3M))) : SumTwoNumber2(QUOTE_ASK_3M);
        let DIVISON_QUOTE_ASK_4M = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_4M))) : SumTwoNumber2(QUOTE_ASK_4M);
        let DIVISON_QUOTE_ASK_5M = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_5M))) : SumTwoNumber2(QUOTE_ASK_5M);
        let DIVISON_QUOTE_ASK_6M = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_6M))) : SumTwoNumber2(QUOTE_ASK_6M);
        let DIVISON_QUOTE_ASK_7M = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_7M))) : SumTwoNumber2(QUOTE_ASK_7M);
        let DIVISON_QUOTE_ASK_8M = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_8M))) : SumTwoNumber2(QUOTE_ASK_8M);
        let DIVISON_QUOTE_ASK_9M = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_9M))) : SumTwoNumber2(QUOTE_ASK_9M);
        let DIVISON_QUOTE_ASK_10M = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_10M))) : SumTwoNumber2(QUOTE_ASK_10M);
        let DIVISON_QUOTE_ASK_11M = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_11M))) : SumTwoNumber2(QUOTE_ASK_11M);
        let DIVISON_QUOTE_ASK_1Y = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_1Y))) : SumTwoNumber2(QUOTE_ASK_1Y);
        let DIVISON_QUOTE_ASK_2Y = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_2Y))) : SumTwoNumber2(QUOTE_ASK_2Y);
        let DIVISON_QUOTE_ASK_3Y = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_3Y))) : SumTwoNumber2(QUOTE_ASK_3Y);
        let DIVISON_QUOTE_ASK_4Y = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_4Y))) : SumTwoNumber2(QUOTE_ASK_4Y);
        let DIVISON_QUOTE_ASK_5Y = FORWARD_WHITE_LISTING?.includes(splitext) == true ? SumTwoNumber2(parseFloat(Division100Number(QUOTE_ASK_5Y))) : SumTwoNumber2(QUOTE_ASK_5Y);

        updateLog[splitext] = {
          QUOTE_ASK: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_ASK) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_ASK) * 100).toFixed(4),
          QUOTE_BID: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_BID) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_BID) * 100).toFixed(4),
          QUOTE_OPEN: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_OPEN) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_OPEN) * 100).toFixed(4),
          QUOTE_CLOSE: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_MID_PRICE) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_MID_PRICE) * 100).toFixed(4),
          QUOTE_HIGH: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_HIGH) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_HIGH) * 100).toFixed(4),
          QUOTE_LOW: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_LOW) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_LOW) * 100).toFixed(4),
          QUOTE_MID_PRICE: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_MID_PRICE) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_MID_PRICE) * 100).toFixed(4),
          FXMARGIN_DATA: data?.FXMARGIN_DATA,
          FXMARGIN_TRIGGER_DATA: data?.FXMARGIN_TRIGGER_DATA,
          // FORWARD_ASK: {
          //   QUOTE_ASK_ON: FORWARD_WHITE_LISTING?.includes(splitext) == true ?(parseFloat(resObject.get(48)) / 100)?.toFixed(4) : (parseFloat(resObject.get(48)))?.toFixed(4),
          //   QUOTE_ASK_SN: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(50)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(50)))?.toFixed(4),
          //   QUOTE_ASK_TN: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(52)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(52)))?.toFixed(4),
          //   QUOTE_ASK_1W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(54)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(54)))?.toFixed(4),
          //   QUOTE_ASK_2W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(56)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(56)))?.toFixed(4),
          //   QUOTE_ASK_3W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(58)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(58)))?.toFixed(4),
          //   QUOTE_ASK_1M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(60)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(60)))?.toFixed(4),
          //   QUOTE_ASK_2M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(62)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(62)))?.toFixed(4),
          //   QUOTE_ASK_3M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(64)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(64)))?.toFixed(4),
          //   QUOTE_ASK_4M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(66)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(66)))?.toFixed(4),
          //   QUOTE_ASK_5M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(68)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(68)))?.toFixed(4),
          //   QUOTE_ASK_6M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(70)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(70)))?.toFixed(4),
          //   QUOTE_ASK_7M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(72)) / 100)?.toFixed(4)) : parseFloat(resObject.get(72))?.toFixed(4),
          //   QUOTE_ASK_8M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(74)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(74)))?.toFixed(4),
          //   QUOTE_ASK_9M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(76)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(76)))?.toFixed(4),
          //   QUOTE_ASK_10M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(78)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(78)))?.toFixed(4),
          //   QUOTE_ASK_11M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(80)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(80)))?.toFixed(4),
          //   QUOTE_ASK_1Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(82)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(82)))?.toFixed(4),
          //   QUOTE_ASK_2Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(84)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(84)))?.toFixed(4),
          //   QUOTE_ASK_3Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(86)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(86)))?.toFixed(4),
          //   QUOTE_ASK_4Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(88)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(88)))?.toFixed(4),
          //   QUOTE_ASK_5Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(90)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(90)))?.toFixed(4),
          // },
          // FORWARD_BID: {
          //   QUOTE_BID_ON: FORWARD_WHITE_LISTING?.includes(splitext) == true ? (parseFloat(resObject.get(47)) / 100)?.toFixed(4) : (parseFloat(resObject.get(47)))?.toFixed(4),
          //   QUOTE_BID_SN: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(49)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(49)))?.toFixed(4),
          //   QUOTE_BID_TN: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(51)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(51)))?.toFixed(4),
          //   QUOTE_BID_1W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(53)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(53)))?.toFixed(4),
          //   QUOTE_BID_2W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(55)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(55)))?.toFixed(4),
          //   QUOTE_BID_3W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(57)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(57)))?.toFixed(4),
          //   QUOTE_BID_1M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(59)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(59)))?.toFixed(4),
          //   QUOTE_BID_2M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(61)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(61)))?.toFixed(4),
          //   QUOTE_BID_3M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(63)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(63)))?.toFixed(4),
          //   QUOTE_BID_4M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(65)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(65)))?.toFixed(4),
          //   QUOTE_BID_5M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(67)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(67)))?.toFixed(4),
          //   QUOTE_BID_6M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(69)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(69)))?.toFixed(4),
          //   QUOTE_BID_7M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(71)) / 100)?.toFixed(4)) : parseFloat(resObject.get(71))?.toFixed(4),
          //   QUOTE_BID_8M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(73)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(73)))?.toFixed(4),
          //   QUOTE_BID_9M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(75)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(75)))?.toFixed(4),
          //   QUOTE_BID_10M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(77)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(77)))?.toFixed(4),
          //   QUOTE_BID_11M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(79)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(79)))?.toFixed(4),
          //   QUOTE_BID_1Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(81)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(81)))?.toFixed(4),
          //   QUOTE_BID_2Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(83)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(83)))?.toFixed(4),
          //   QUOTE_BID_3Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(85)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(85)))?.toFixed(4),
          //   QUOTE_BID_4Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(87)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(87)))?.toFixed(4),
          //   QUOTE_BID_5Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(89)) / 100)?.toFixed(4)) : (parseFloat(resObject.get(89)))?.toFixed(4),
          // },
          FORWARD_ASK: {
            QUOTE_ASK_ON: DIVISON_QUOTE_ASK_ON,
            QUOTE_ASK_SN: DIVISON_QUOTE_ASK_SN,
            QUOTE_ASK_TN: DIVISON_QUOTE_ASK_TN,
            QUOTE_ASK_1W: DIVISON_QUOTE_ASK_1W,
            QUOTE_ASK_2W: DIVISON_QUOTE_ASK_2W,
            QUOTE_ASK_3W: DIVISON_QUOTE_ASK_3W,
            QUOTE_ASK_1M: DIVISON_QUOTE_ASK_1M,
            QUOTE_ASK_2M: DIVISON_QUOTE_ASK_2M,
            QUOTE_ASK_3M: DIVISON_QUOTE_ASK_3M,
            QUOTE_ASK_4M: DIVISON_QUOTE_ASK_4M,
            QUOTE_ASK_5M: DIVISON_QUOTE_ASK_5M,
            QUOTE_ASK_6M: DIVISON_QUOTE_ASK_6M,
            QUOTE_ASK_7M: DIVISON_QUOTE_ASK_7M,
            QUOTE_ASK_8M: DIVISON_QUOTE_ASK_8M,
            QUOTE_ASK_9M: DIVISON_QUOTE_ASK_9M,
            QUOTE_ASK_10M: DIVISON_QUOTE_ASK_10M,
            QUOTE_ASK_11M: DIVISON_QUOTE_ASK_11M,
            QUOTE_ASK_1Y: DIVISON_QUOTE_ASK_1Y,
            QUOTE_ASK_2Y: DIVISON_QUOTE_ASK_2Y,
            QUOTE_ASK_3Y: DIVISON_QUOTE_ASK_3Y,
            QUOTE_ASK_4Y: DIVISON_QUOTE_ASK_4Y,
            QUOTE_ASK_5Y: DIVISON_QUOTE_ASK_5Y,
          },
          FORWARD_BID: {
            QUOTE_BID_ON: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_ON) : QUOTE_ASK_ON,
            QUOTE_BID_SN: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_SN) : QUOTE_ASK_SN,
            QUOTE_BID_TN: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_TN) : QUOTE_ASK_TN,
            QUOTE_BID_1W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_1W) : QUOTE_ASK_1W,
            QUOTE_BID_2W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_2W) : QUOTE_ASK_2W,
            QUOTE_BID_3W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_3W) : QUOTE_ASK_3W,
            QUOTE_BID_1M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_1M) : QUOTE_ASK_1M,
            QUOTE_BID_2M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_2M) : QUOTE_ASK_2M,
            QUOTE_BID_3M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_3M) : QUOTE_ASK_3M,
            QUOTE_BID_4M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_4M) : QUOTE_ASK_4M,
            QUOTE_BID_5M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_5M) : QUOTE_ASK_5M,
            QUOTE_BID_6M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_6M) : QUOTE_ASK_6M,
            QUOTE_BID_7M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_7M) : QUOTE_ASK_7M,
            QUOTE_BID_8M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_8M) : QUOTE_ASK_8M,
            QUOTE_BID_9M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_9M) : QUOTE_ASK_9M,
            QUOTE_BID_10M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_10M) : QUOTE_ASK_10M,
            QUOTE_BID_11M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_11M) : QUOTE_ASK_11M,
            QUOTE_BID_1Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_1Y) : QUOTE_ASK_1Y,
            QUOTE_BID_2Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_2Y) : QUOTE_ASK_2Y,
            QUOTE_BID_3Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_3Y) : QUOTE_ASK_3Y,
            QUOTE_BID_4Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_4Y) : QUOTE_ASK_4Y,
            QUOTE_BID_5Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? Division100Number(QUOTE_ASK_5Y) : QUOTE_ASK_5Y,
          },
          "Timestamp": strTimeStamp
        };
        

        // updateLog[splitext] = {
        //   QUOTE_ASK: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_ASK) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_ASK) * 100).toFixed(4),
        //   QUOTE_BID: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_BID) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_BID) * 100).toFixed(4),
        //   QUOTE_OPEN: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_OPEN) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_OPEN) * 100).toFixed(4),
        //   QUOTE_CLOSE: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_MID_PRICE) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_MID_PRICE) * 100).toFixed(4),
        //   QUOTE_HIGH: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_HIGH) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_HIGH) * 100).toFixed(4),
        //   QUOTE_LOW: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_LOW) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_LOW) * 100).toFixed(4),
        //   QUOTE_MID_PRICE: resObject.get(global.NetDania.JsApi.Fields.QUOTE_NAME)?.split(" ")[0] != "JPY" ? resObject.get(global.NetDania.JsApi.Fields.QUOTE_MID_PRICE) : parseFloat(resObject.get(global.NetDania.JsApi.Fields.QUOTE_MID_PRICE) * 100).toFixed(4),
        //   FXMARGIN_DATA: data?.FXMARGIN_DATA,
        //   FXMARGIN_TRIGGER_DATA: data?.FXMARGIN_TRIGGER_DATA,
        //   FORWARD_ASK: {
        //     QUOTE_ASK_ON: FORWARD_WHITE_LISTING?.includes(splitext) == true ? (parseFloat(resObject.get(48)))?.toFixed(4) : (parseFloat(resObject.get(48)))?.toFixed(4),
        //     QUOTE_ASK_SN: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(50)))?.toFixed(4)) : (parseFloat(resObject.get(50)))?.toFixed(4),
        //     QUOTE_ASK_TN: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(52)))?.toFixed(4)) : (parseFloat(resObject.get(52)))?.toFixed(4),
        //     QUOTE_ASK_1W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(54)))?.toFixed(4)) : (parseFloat(resObject.get(54)))?.toFixed(4),
        //     QUOTE_ASK_2W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(56)))?.toFixed(4)) : (parseFloat(resObject.get(56)))?.toFixed(4),
        //     QUOTE_ASK_3W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(58)))?.toFixed(4)) : (parseFloat(resObject.get(58)))?.toFixed(4),
        //     QUOTE_ASK_1M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(60)))?.toFixed(4)) : (parseFloat(resObject.get(60)))?.toFixed(4),
        //     QUOTE_ASK_2M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(62)))?.toFixed(4)) : (parseFloat(resObject.get(62)))?.toFixed(4),
        //     QUOTE_ASK_3M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(64)))?.toFixed(4)) : (parseFloat(resObject.get(64)))?.toFixed(4),
        //     QUOTE_ASK_4M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(66)))?.toFixed(4)) : (parseFloat(resObject.get(66)))?.toFixed(4),
        //     QUOTE_ASK_5M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(68)))?.toFixed(4)) : (parseFloat(resObject.get(68)))?.toFixed(4),
        //     QUOTE_ASK_6M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(70)))?.toFixed(4)) : (parseFloat(resObject.get(70)))?.toFixed(4),
        //     QUOTE_ASK_7M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(72)))?.toFixed(4)) : parseFloat(resObject.get(72))?.toFixed(4),
        //     QUOTE_ASK_8M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(74)))?.toFixed(4)) : (parseFloat(resObject.get(74)))?.toFixed(4),
        //     QUOTE_ASK_9M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(76)))?.toFixed(4)) : (parseFloat(resObject.get(76)))?.toFixed(4),
        //     QUOTE_ASK_10M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(78)))?.toFixed(4)) : (parseFloat(resObject.get(78)))?.toFixed(4),
        //     QUOTE_ASK_11M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(80)))?.toFixed(4)) : (parseFloat(resObject.get(80)))?.toFixed(4),
        //     QUOTE_ASK_1Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(82)))?.toFixed(4)) : (parseFloat(resObject.get(82)))?.toFixed(4),
        //     QUOTE_ASK_2Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(84)))?.toFixed(4)) : (parseFloat(resObject.get(84)))?.toFixed(4),
        //     QUOTE_ASK_3Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(86)))?.toFixed(4)) : (parseFloat(resObject.get(86)))?.toFixed(4),
        //     QUOTE_ASK_4Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(88)))?.toFixed(4)) : (parseFloat(resObject.get(88)))?.toFixed(4),
        //     QUOTE_ASK_5Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(90)))?.toFixed(4)) : (parseFloat(resObject.get(90)))?.toFixed(4),
        //   },
        //   FORWARD_BID: {
        //     QUOTE_BID_ON: FORWARD_WHITE_LISTING?.includes(splitext) == true ? (parseFloat(resObject.get(47)))?.toFixed(4) : (parseFloat(resObject.get(47)))?.toFixed(4),
        //     QUOTE_BID_SN: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(49)))?.toFixed(4)) : (parseFloat(resObject.get(49)))?.toFixed(4),
        //     QUOTE_BID_TN: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(51)))?.toFixed(4)) : (parseFloat(resObject.get(51)))?.toFixed(4),
        //     QUOTE_BID_1W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(53)))?.toFixed(4)) : (parseFloat(resObject.get(53)))?.toFixed(4),
        //     QUOTE_BID_2W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(55)))?.toFixed(4)) : (parseFloat(resObject.get(55)))?.toFixed(4),
        //     QUOTE_BID_3W: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(57)))?.toFixed(4)) : (parseFloat(resObject.get(57)))?.toFixed(4),
        //     QUOTE_BID_1M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(59)))?.toFixed(4)) : (parseFloat(resObject.get(59)))?.toFixed(4),
        //     QUOTE_BID_2M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(61)))?.toFixed(4)) : (parseFloat(resObject.get(61)))?.toFixed(4),
        //     QUOTE_BID_3M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(63)))?.toFixed(4)) : (parseFloat(resObject.get(63)))?.toFixed(4),
        //     QUOTE_BID_4M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(65)))?.toFixed(4)) : (parseFloat(resObject.get(65)))?.toFixed(4),
        //     QUOTE_BID_5M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(67)))?.toFixed(4)) : (parseFloat(resObject.get(67)))?.toFixed(4),
        //     QUOTE_BID_6M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(69)))?.toFixed(4)) : (parseFloat(resObject.get(69)))?.toFixed(4),
        //     QUOTE_BID_7M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(71)))?.toFixed(4)) : parseFloat(resObject.get(71))?.toFixed(4),
        //     QUOTE_BID_8M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(73)))?.toFixed(4)) : (parseFloat(resObject.get(73)))?.toFixed(4),
        //     QUOTE_BID_9M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(75)))?.toFixed(4)) : (parseFloat(resObject.get(75)))?.toFixed(4),
        //     QUOTE_BID_10M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(77)))?.toFixed(4)) : (parseFloat(resObject.get(77)))?.toFixed(4),
        //     QUOTE_BID_11M: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(79)))?.toFixed(4)) : (parseFloat(resObject.get(79)))?.toFixed(4),
        //     QUOTE_BID_1Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(81)))?.toFixed(4)) : (parseFloat(resObject.get(81)))?.toFixed(4),
        //     QUOTE_BID_2Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(83)))?.toFixed(4)) : (parseFloat(resObject.get(83)))?.toFixed(4),
        //     QUOTE_BID_3Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(85)))?.toFixed(4)) : (parseFloat(resObject.get(85)))?.toFixed(4),
        //     QUOTE_BID_4Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(87)))?.toFixed(4)) : (parseFloat(resObject.get(87)))?.toFixed(4),
        //     QUOTE_BID_5Y: FORWARD_WHITE_LISTING?.includes(splitext) == true ? ((parseFloat(resObject.get(89)))?.toFixed(4)) : (parseFloat(resObject.get(89)))?.toFixed(4),
        //   },
        //   "Timestamp": strTimeStamp
        // };
      }
      await resolve(updateLog);
    } catch (e) {
    }
  })
}

function SumTwoNumber(a, b) {
  return parseFloat(parseFloat(parseFloat(a) + parseFloat(b)).toFixed(4) / 2).toFixed(4);
}

function SumTwoNumber2(a) {
  return parseFloat(parseFloat(a) + 2).toFixed(4);
}

function Division100Number(a) {
  return parseFloat(a / 100).toFixed(4);
}

startAllDaysMonitoring().then((res) => { });
module.exports = {
  router: router,
  SocketLoad: async (io, myCache) => {
    io.on('connection', async (client) => {
      await client.on("userId", function (data) {
        startMonitoring(io, client, myCache, data);
      });
    });
  }
};
