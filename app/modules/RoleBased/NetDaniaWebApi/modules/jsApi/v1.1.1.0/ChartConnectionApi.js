let global = require('./NetDaniaJSAPI');
let NetDania = global.NetDania;

(function (global) {
    global.NetDania = global.NetDania || {};

    /**
     * Description
     * @method ChartConnectionApi
     * @param {} configuration
     * @return
     */
    NetDania.ChartConnectionApi = function (configuration) {
        if (
            configuration.hasOwnProperty('chartConnectionApiForceNewInstance') &&
            typeof configuration.chartConnectionApiForceNewInstance !== 'undefined' &&
            configuration.chartConnectionApiForceNewInstance === true
        ) {
            this.initialize(configuration);
        } else {
            if (NetDania.ChartConnectionApi.prototype._singletonInstance) {
                return NetDania.ChartConnectionApi.prototype._singletonInstance;
            } else {
                NetDania.ChartConnectionApi.prototype._singletonInstance = this;
            }
            this.initialize(configuration);
        }
    };

    /**
     * Custom propery to detect if it is a custom dataApi
     * @type {string}
     */
    NetDania.ChartConnectionApi.CD = false;

    /**
     * Description
     * @method initialize
     * @param {} configuration
     * @return
     */
    NetDania.ChartConnectionApi.prototype.initialize = function (configuration) {
        this.configuration = configuration;
        this.ids = [];
        this.isSubscribed = false;
        this.isConnected = configuration.doNotConnect;
        this.connection = null;
        this.historicalDataFunction = null;
        this.subscribers = [];
        this.requests = [];

        //ids;
        this.subscriberIds = 0;
        this.batchS = 0;

        this.onJsApiDisconnected = (function (a) {
            return function (e) {};
        })(this);
    };

    /**
     * Description
     * @method connect
     * @return
     */
    NetDania.ChartConnectionApi.prototype.connect = function () {
        this.tryConnect();
    };

    /**
     * Description
     * @method subscribe
     * @return subscriber
     */
    NetDania.ChartConnectionApi.prototype.subscribe = function () {
        var subscriber = new NetDania.ChartSubscriber(this);
        this.subscribers[subscriber.id] = subscriber;
        return subscriber;
    };

    /**
     * Description
     * @method subscribe
     * @return subscriber
     */
    NetDania.ChartConnectionApi.prototype.unsubscribe = function (subscriberId) {
        delete this.subscribers[subscriberId];
    };

    /**
     * Description
     * @method getSubscriberId
     * @return MemberExpression
     */
    NetDania.ChartConnectionApi.prototype.getSubscriberId = function () {
        this.subscriberIds++;
        return this.subscriberIds;
    };

    /**
     * Description
     * @method tryConnect
     * @return
     */
    NetDania.ChartConnectionApi.prototype.tryConnect = function () {
        this.connection ||
            ((this.connection = new NetDania.JsApi.JSONConnection(this.configuration.jsApi)),
            this.connection.addListener(NetDania.JsApi.Events.ONDISCONNECTED, this.onJsApiDisconnected));
        this.connection &&
            !this.historicalDataFunction &&
            ((this.historicalDataFunction = (function (a) {
                return function (b) {
                    a.onHistoricalData(b);
                };
            })(this)),
            this.connection.addListener(NetDania.JsApi.Events.ONHISTORICALDATA, this.historicalDataFunction)),
            this.connection &&
                !this.workspaceDataFunction &&
                ((this.workspaceDataFunction = (function (a) {
                    return function (b) {
                        a.onWorkspaceData(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONWORKSPACEDATA, this.workspaceDataFunction)),
            this.connection &&
                !this.priceDataFunction &&
                ((this.priceDataFunction = (function (a) {
                    return function (b) {
                        a.onPriceData(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONPRICEUPDATE, this.priceDataFunction)),
            this.connection &&
                !this.errorFunction &&
                ((this.errorFunction = (function (a) {
                    return function (b) {
                        a.onError(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONERROR, this.errorFunction)),
            this.connection &&
                !this.newsSearchDataFunction &&
                ((this.newsSearchDataFunction = (function (a) {
                    return function (b) {
                        a.onHistoricalHeadlines(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONNEWSSEARCH, this.newsSearchDataFunction)),
            this.connection &&
                !this.newsMonitorDataFunction &&
                ((this.newsMonitorDataFunction = (function (a) {
                    return function (b) {
                        a.onHeadlineUpdate(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONHEADLINEUPDATE, this.newsMonitorDataFunction)),
            this.connection &&
                !this.newsMonitorUpdateFunction &&
                ((this.newsMonitorUpdateFunction = (function (a) {
                    return function (b) {
                        a.onHistoricalHeadlines(b);
                    };
                })(this)),
                this.connection.addListener(
                    NetDania.JsApi.Events.ONHISTORICALHEADLINES,
                    this.newsMonitorUpdateFunction
                )),
            this.connection &&
                !this.newsStoryFunction &&
                ((this.newsStoryFunction = (function (a) {
                    return function (b) {
                        a.onNewsStory(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONNEWSSTORY, this.newsStoryFunction)),
            this.connection &&
                !this.alertGetActiveFunction &&
                ((this.alertGetActiveFunction = (function (a) {
                    return function (b) {
                        a.onAlertGetActive(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONALERTGETACTIVE, this.alertGetActiveFunction)),
            this.connection &&
                !this.alertsGetDeletedFunction &&
                ((this.alertsGetDeletedFunction = (function (a) {
                    return function (b) {
                        a.onAlertsGetDeleted(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONALERTSGETDELETED, this.alertsGetDeletedFunction)),
            this.connection &&
                !this.alertGetDeletedFunction &&
                ((this.alertGetDeletedFunction = (function (a) {
                    return function (b) {
                        a.onAlertGetDeleted(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONALERTGETDELETED, this.alertGetDeletedFunction)),
            this.connection &&
                !this.alertsGetTriggeredFunction &&
                ((this.alertsGetTriggeredFunction = (function (a) {
                    return function (b) {
                        a.onAlertsGetTriggered(b);
                    };
                })(this)),
                this.connection.addListener(
                    NetDania.JsApi.Events.ONALERTSGETTRIGGERED,
                    this.alertsGetTriggeredFunction
                )),
            this.connection &&
                !this.alertGetTriggeredFunction &&
                ((this.alertGetTriggeredFunction = (function (a) {
                    return function (b) {
                        a.onAlertGetTriggered(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONALERTGETTRIGGERED, this.alertGetTriggeredFunction)),
            this.connection &&
                !this.alertMonitorUserActivityFunction &&
                ((this.alertMonitorUserActivityFunction = (function (a) {
                    return function (b) {
                        a.onAlertMonitorUserActivity(b);
                    };
                })(this)),
                this.connection.addListener(
                    NetDania.JsApi.Events.ONALERTMONITORUSERACTIVITY,
                    this.alertMonitorUserActivityFunction
                )),
            this.connection &&
                !this.alertGetAlertFunction &&
                ((this.alertGetAlertFunction = (function (a) {
                    return function (b) {
                        a.onAlertGet(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONALERTGET, this.alertGetAlertFunction)),
            this.connection &&
                !this.alertAddAlertFunction &&
                ((this.alertAddAlertFunction = (function (a) {
                    return function (b) {
                        a.onAlertAdded(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONALERTADDED, this.alertAddAlertFunction)),
            this.connection &&
                !this.alertEditAlertFunction &&
                ((this.alertEditAlertFunction = (function (a) {
                    return function (b) {
                        a.onAlertEdited(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONALERTEDIT, this.alertEditAlertFunction)),
            this.connection &&
                !this.alertDeleteAlertFunction &&
                ((this.alertDeleteAlertFunction = (function (a) {
                    return function (b) {
                        a.onAlertDeleted(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONALERTDELETE, this.alertDeleteAlertFunction)),
            this.connection &&
                !this.alertUserAddedFunction &&
                ((this.alertUserAddedFunction = (function (a) {
                    return function (b) {
                        a.onAlertUserAdded(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONALERTUSERADDED, this.alertUserAddedFunction)),
            this.connection &&
                !this.alertTriggeredFunction &&
                ((this.alertTriggeredFunction = (function (a) {
                    return function (b) {
                        a.onAlertTriggered(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONALERTMONITORUSER, this.alertTriggeredFunction)),
            this.connection &&
                !this.onUserDevicesFunction &&
                ((this.onUserDevicesFunction = (function (a) {
                    return function (b) {
                        a.onUserDevices(b);
                    };
                })(this)),
                this.connection.addListener(NetDania.JsApi.Events.ONALERTGETPUSHDEVICES, this.onUserDevicesFunction)),
            !this.isConnected && (this.connection.Connect(), (this.isConnected = this.connection.isConnected()));
    };

    /**
     * Description
     * @method disconnect
     * @return
     */
    NetDania.ChartConnectionApi.prototype.disconnect = function () {
        this.tryDisconnect();
    };

    /**
     * Description
     * @method tryDisconnect
     * @return
     */
    NetDania.ChartConnectionApi.prototype.tryDisconnect = function () {
        if (this.isConnected) {
            if (this.ids.length > 0) {
                this.connection && this.connection.RemoveRequests(this.ids);
                this.ids.length = 0;
            }
            this.connection.disconnect();

            this.connection.removeListener(NetDania.JsApi.Events.ONHISTORICALDATA, this.historicalDataFunction);
            this.connection.removeListener(NetDania.JsApi.Events.ONWORKSPACEDATA, this.workspaceDataFunction);
            this.connection.removeListener(NetDania.JsApi.Events.ONPRICEUPDATE, this.priceDataFunction);
            this.connection.removeListener(NetDania.JsApi.Events.ONNEWSSEARCH, this.newsSearchDataFunction);
            this.connection.removeListener(NetDania.JsApi.Events.ONHEADLINEUPDATE, this.newsMonitorDataFunction);
            this.connection.removeListener(NetDania.JsApi.Events.ONHISTORICALHEADLINES, this.newsMonitorUpdateFunction);

            this.connection.removeListener(NetDania.JsApi.Events.ONERROR, this.errorFunction);

            this.historicalDataFunction = null;
            this.errorFunction = null;
            this.priceDataFunction = null;
            this.workspaceDataFunction = null;
            this.newsSearchDataFunction = null;
            this.newsMonitorDataFunction = null;
            this.newsMonitorUpdateFunction = null;
            this.connection = null;

            this.isSubscribed = false;
            this.isConnected = false;
        }
    };

    /**
     * Description
     * @method destroy
     * @return
     */
    NetDania.ChartConnectionApi.prototype.destroy = function () {
        /*
    TODO:Check for multiple charts
    For now this will not work if we have multiple charts on the page
     */
        this.tryUnSubscribeToServer();
        this.tryDisconnect();

        // clear cache, clear all objects/arrays, etc.
        /*
  for (var r in this.requests) {
    r = null;
  }
  this.requests = null;
  NetDania.ChartConnectionApi.prototype._singletonInstance = null;
  */
    };

    /**
     * Description
     * @method trySubscribeToServer
     * @return
     */
    NetDania.ChartConnectionApi.prototype.trySubscribeToServer = function () {
        !this.isSubscribed &&
            this.connection &&
            this.connection.Observer &&
            (this.connection.Observer.subscribe(this), (this.isSubscribed = !this.isSubscribed));
    };

    /**
     * Description
     * @method trySubscribeToServer
     * @return
     */
    NetDania.ChartConnectionApi.prototype.tryUnSubscribeToServer = function () {
        this.isSubscribed &&
            this.connection &&
            this.connection.Observer &&
            (this.connection.Observer.unsubscribe(this), (this.isSubscribed = !this.isSubscribed));
    };

    /**
     * Description
     * @method tryAppendRequestToServer
     * @param {} request
     * @return
     */
    NetDania.ChartConnectionApi.prototype.tryAppendRequestToServer = function (request) {
        if (this.batchS > 0) {
            if (this.batchRequestList == undefined || this.batchRequestList == null) {
                this.batchRequestList = [];
            }
            this.batchRequestList.push(request);
            return;
        }
        this.trySubscribeToServer();
        this.connection && this.connection.appendRequests([request]);
        this.tryConnect();
    };

    /**
     * Description
     * @method tryAppendRequestsToServer
     * @param {} requests
     * @return
     */
    NetDania.ChartConnectionApi.prototype.tryAppendRequestsToServer = function (requests) {
        this.trySubscribeToServer();
        this.connection.appendRequests(requests);
        this.tryConnect();
    };

    /**
     * Description
     * @method batchStart
     * @return
     */
    NetDania.ChartConnectionApi.prototype.batchStart = function () {
        this.batchS++;
    };

    /**
     * Description
     * @method batchEnd
     * @return
     */
    NetDania.ChartConnectionApi.prototype.batchEnd = function () {
        this.batchS--;
        if (this.batchS == 0) {
            if (
                this.batchRequestList != null &&
                this.batchRequestList != undefined &&
                this.batchRequestList.length > 0
            ) {
                this.tryAppendRequestsToServer(this.batchRequestList);
                while (this.batchRequestList.length > 0) {
                    this.batchRequestList.pop();
                }
            }
        }
    };

    /**
     * Description
     * @method monitorChart
     * @param {} symbol
     * @param {} provider
     * @param {} subscriberId
     * @return dataSet
     */
    NetDania.ChartConnectionApi.prototype.monitorChart = function (symbol, provider, subscriberID) {
        var request = NetDania.JsApi.Request.getReqObjChart(symbol, 0, 1, provider, true);
        this._addRequest(subscriberID, symbol, provider, 0, request.i, 'monitor');
        this.ids.push(request.i);
        this.tryAppendRequestToServer(request);
        return request.i;
    };

    /**
     * Description
     * @method unmonitorChart
     * @param {} symbol
     * @param {} provider
     * @param {} subscriberId
     * @return
     */
    NetDania.ChartConnectionApi.prototype.unmonitorChart = function (symbol, provider, subscriberId) {
        var request = this._getRequestInstrument(subscriberId, symbol, 0, provider, 'monitor');
        if (
            request !== null &&
            request !== undefined &&
            request.requestId !== null &&
            request.requestId !== undefined
        ) {
            var requestID = request.requestId;
            this._removeRequest(requestID);
            var requests = [];

            if (this.batchS > 0) {
                if (this.batchRequestList == undefined || this.batchRequestList == null) {
                    this.batchRequestList = [];
                }
                var removeReq = NetDania.JsApi.Request.getReqObjRemove(requestID);
                this.batchRequestList.push(removeReq);
            } else {
                requests[requests.length] = requestID;
                if (requests.length > 0) {
                    this.connection && this.connection.removeRequests(requests);
                }
            }
            this.ids[this.ids.indexOf(requestID)] = null;
            return requestID;
        }

        return null;
    };

    /**
     * Description
     * @method monitorInstrument
     * @param {string} symbol
     * @param {number} timescale
     * @param {string} provider
     * @param {number} quoteType - 0|Bid, 1|Ask, 2|Mid
     * @param {number} subscriberId
     * @return dataSet
     */
    NetDania.ChartConnectionApi.prototype.monitorInstrument = function (
        symbol,
        timescale,
        provider,
        quoteType,
        subscriberID
    ) {
        var request = NetDania.JsApi.Request.getReqObjChart(symbol, timescale, 0, provider, true);
        this._addRequest(subscriberID, symbol, provider, timescale, request.i, 'monitor');
        this.ids.push(request.i);
        this.tryAppendRequestToServer(request);
        return request.i;
    };

    /**
     * Description
     * @method unmonitorInstrument
     * @param {} symbol
     * @param {} timescale
     * @param {} provider
     * @param {} subscriberId
     * @return
     */
    NetDania.ChartConnectionApi.prototype.unmonitorInstrument = function (symbol, timescale, provider, subscriberId) {
        var request = this._getRequestInstrument(subscriberId, symbol, timescale, provider, 'monitor');
        if (
            request !== null &&
            request !== undefined &&
            request.requestId !== null &&
            request.requestId !== undefined
        ) {
            var requestID = request.requestId;
            this._removeRequest(requestID);
            var requests = [];

            if (this.batchS > 0) {
                if (this.batchRequestList == undefined || this.batchRequestList == null) {
                    this.batchRequestList = [];
                }
                var removeReq = NetDania.JsApi.Request.getReqObjRemove(requestID);
                this.batchRequestList.push(removeReq);
            } else {
                requests[requests.length] = requestID;
                if (requests.length > 0) {
                    this.connection && this.connection.removeRequests(requests);
                }
            }
            this.ids[this.ids.indexOf(requestID)] = null;
            return requestID;
        }

        return null;
    };

    /**
     * Request a number of points until current date (date in the future)
     * @method snapshotData
     * @param {String} symbol
     * @param {Number} timescale
     * @param {String} provider
     * @param {Number} quoteType
     * @param {String} subscriberId
     * @param {Number} historicalPoints
     * @return
     */
    NetDania.ChartConnectionApi.prototype.snapshotData = function (
        symbol,
        timescale,
        provider,
        historicalPoints,
        subscriberId
    ) {
        var futureDate = new Date();
        futureDate.setFullYear(futureDate.getUTCFullYear() + 10);
        var points = typeof historicalPoints !== 'undefined' ? historicalPoints : this.configuration.historicalPoints;
        var jsApiRequest = NetDania.JsApi.Request.getReqChartHistory(
            symbol,
            timescale,
            points,
            provider,
            false,
            0,
            Math.round(futureDate.getTime() / 1000)
        );
        this._addRequest(subscriberId, symbol, provider, timescale, jsApiRequest.i, 'history');
        this.ids.push(jsApiRequest.i);
        this.tryAppendRequestToServer(jsApiRequest);
        return jsApiRequest.i;
    };

    /**
     * Request a number of points starting from a date
     * @method snapshotData
     * @param {} symbol
     * @param {} timescale
     * @param {} provider
     * @param {} subscriberId
     * @param {} quoteType
     * @param {} startDate
     * @param {number} interestPoints
     * @return
     */
    NetDania.ChartConnectionApi.prototype.snapshotDataFromDate = function (
        symbol,
        timescale,
        provider,
        subscriberId,
        startDate,
        quoteType,
        interestPoints
    ) {
        var requestPoints = interestPoints;
        if (requestPoints < this.configuration.historicalPoints) {
            requestPoints = this.configuration.historicalPoints;
        }

        var jsApiRequest = NetDania.JsApi.Request.getReqChartHistory(
            symbol,
            timescale,
            requestPoints,
            provider,
            false,
            0,
            startDate - 1
        );
        this._addRequest(subscriberId, symbol, provider, timescale, jsApiRequest.i, 'history');
        this.ids.push(jsApiRequest.i);
        this.tryAppendRequestToServer(jsApiRequest);
        return jsApiRequest.i;
    };

    NetDania.ChartConnectionApi.prototype.loadWorkspace = function (userID, subscriberId) {
        var workspaceRequest = NetDania.JsApi.Request.getReqObjWorkspace(userID, true);
        this._addRequest(subscriberId, null, null, null, workspaceRequest.i, 'workspace');
        this.ids.push(workspaceRequest.i);
        this.tryAppendRequestToServer(workspaceRequest);
        return workspaceRequest.i;
    };

    /**
     * Description
     * @method unmonitorInstrument
     * @param {} symbol
     * @param {} timescale
     * @param {} provider
     * @param {} subscriberId
     * @return
     */
    NetDania.ChartConnectionApi.prototype.unsnapshotData = function (
        symbol,
        timescale,
        provider,
        subscriberId,
        requestId
    ) {
        var request;
        if (requestId !== null && requestId !== undefined) {
            var subscriber = this._getSubscriber(subscriberId);
            request = this._getRequest(subscriber, requestId);
        } else {
            request = this._getRequestInstrument(subscriberId, symbol, timescale, provider, 'history');
        }

        if (
            request !== null &&
            request !== undefined &&
            request.requestId !== null &&
            request.requestId !== undefined
        ) {
            var requestID = request.requestId;
            this._removeRequest(requestID);
            var requests = [];

            if (this.batchS > 0) {
                if (this.batchRequestList == undefined || this.batchRequestList == null) {
                    this.batchRequestList = [];
                }
                var removeReq = NetDania.JsApi.Request.getReqObjRemove(requestID);
                this.batchRequestList.push(removeReq);
            } else {
                requests[requests.length] = requestID;
                if (requests.length > 0) {
                    this.connection && this.connection.removeRequests(requests);
                }
            }
            this.ids[this.ids.indexOf(requestID)] = null;
            return requestID;
        }

        return null;
    };

    NetDania.ChartConnectionApi.prototype.saveWorkspace = function (userID, workspaceString, subscriberId) {
        var _byteUnzippedArray = [];
        var self = this;

        var subscriberID = subscriberId;

        for (var i = 0; i < workspaceString.length; i++) {
            _byteUnzippedArray.push(workspaceString.charCodeAt(i));
        }

        //Archive the string
        var _byteZippedArray = pako.deflate(_byteUnzippedArray, { raw: true });

        //Read the length
        var _length = _byteZippedArray.length;

        //Convert the length to 4 bytes
        var _bytesLength = this.writeIntBytes(_length);

        //Concatenate the 4 bytes with the rest of the bytes array
        var _byteZippedArrayConcat = new Uint8Array(_bytesLength.byteLength + _byteZippedArray.byteLength);
        _byteZippedArrayConcat.set(new Uint8Array(_bytesLength), 0);
        _byteZippedArrayConcat.set(new Uint8Array(_byteZippedArray), _bytesLength.byteLength);

        _length = null;
        _bytesLength = null;
        _byteZippedArray = null;
        _byteUnzippedArray = null;

        /**
         *
         * @param result
         * @private
         */
        var _processCallback = function (result, id) {
            self.subscribers[this.subscriberID].onWorkspaceSaved(result, id);
        }.bind({ subscriberID: subscriberID });

        var request = this.connection.saveWorkspace(
            userID,
            _byteZippedArrayConcat,
            NetDania.Controls.FSC.Data.Defaults.appId,
            _processCallback
        );
        return request.i;
    };

    /**
     * priceData
     * @param symbol
     * @param provider
     * @param subscriberId
     * @param flt request filters
     * @return {*}
     */
    NetDania.ChartConnectionApi.prototype.monitorPriceData = function (symbol, provider, subscriberId, flt) {
        var priceRequest = NetDania.JsApi.Request.getReqObjPrice(symbol, provider, true, flt);
        this._addRequest(subscriberId, symbol, provider, null, priceRequest.i, 'currency');
        this.ids.push(priceRequest.i);
        this.tryAppendRequestToServer(priceRequest);
        return priceRequest.i;
    };

    /**
     * priceData
     * @param symbol
     * @param provider
     * @param subscriberId
     * @return {*}
     */
    NetDania.ChartConnectionApi.prototype.priceData = function (symbol, provider, subscriberId) {
        var priceRequest = NetDania.JsApi.Request.getReqObjPrice(symbol, provider, false);
        this._addRequest(subscriberId, symbol, provider, null, priceRequest.i, 'price');
        this.ids.push(priceRequest.i);
        this.tryAppendRequestToServer(priceRequest);
        return priceRequest.i;
    };

    /**
     * Description
     * @method unmonitorInstrument
     * @param {} symbol
     * @param {} timescale
     * @param {} provider
     * @param {} subscriberId
     * @return
     */
    NetDania.ChartConnectionApi.prototype.unpriceData = function (symbol, provider, subscriberId, requestId) {
        var request;
        if (requestId !== null && requestId !== undefined) {
            var subscriber = this._getSubscriber(subscriberId);
            request = this._getRequest(subscriber, requestId);
        } else {
            request = this._getRequestPrice(subscriberId, symbol, provider, 'price');
        }

        if (
            request !== null &&
            request !== undefined &&
            request.requestId !== null &&
            request.requestId !== undefined
        ) {
            var requestID = request.requestId;
            this._removeRequest(requestID);
            var requests = [];

            if (this.batchS > 0) {
                if (this.batchRequestList == undefined || this.batchRequestList == null) {
                    this.batchRequestList = [];
                }
                var removeReq = NetDania.JsApi.Request.getReqObjRemove(requestID);
                this.batchRequestList.push(removeReq);
            } else {
                requests[requests.length] = requestID;
                if (requests.length > 0) {
                    this.connection && this.connection.removeRequests(requests);
                }
            }
            this.ids[this.ids.indexOf(requestID)] = null;
            return requestID;
        }

        return null;
    };

    /**
     * News search
     * @param strSource
     * @param strSearch
     * @param intMax
     * @param intStartTime
     * @param intEndTime
     * @param byteSearchIn
     * @param strProvider
     * @param subscriberId
     * @return {*}
     */
    NetDania.ChartConnectionApi.prototype.newsSearch = function (
        strSource,
        strSearch,
        intMax,
        intStartTime,
        intEndTime,
        byteSearchIn,
        strProvider,
        subscriberId
    ) {
        var newsRequest = NetDania.JsApi.Request.getReqObjNewsSearch(
            strSource,
            strSearch,
            intMax,
            intStartTime,
            intEndTime,
            byteSearchIn,
            strProvider
        );
        this._addRequest(subscriberId, null, null, null, newsRequest.i, 'newsSearch');
        this.ids.push(newsRequest.i);
        this.tryAppendRequestToServer(newsRequest);
        return newsRequest.i;
    };

    NetDania.ChartConnectionApi.prototype.removeNewsSearch = function (requestID) {
        this._removeRequest(requestID);
        this.connection && this.connection.removeRequests([requestID]);
    };

    /**
     *
     * @param strSource
     * @param intMax
     * @param strProvider
     * @param boolMonitor
     * @param subscriberId
     * @return {*}
     */
    NetDania.ChartConnectionApi.prototype.newsMonitor = function (
        strSource,
        intMax,
        strProvider,
        boolMonitor,
        subscriberId
    ) {
        var newsRequest = NetDania.JsApi.Request.getReqObjHeadlines(strSource, intMax, strProvider, boolMonitor);
        this._addRequest(subscriberId, null, null, null, newsRequest.i, 'newsMonitor');
        this.ids.push(newsRequest.i);
        this.tryAppendRequestToServer(newsRequest);
        return newsRequest.i;
    };

    NetDania.ChartConnectionApi.prototype.newsUnMonitor = function (requestID) {
        this._removeRequest(requestID);
        this.connection && this.connection.removeRequests([requestID]);
    };

    NetDania.ChartConnectionApi.prototype.newsStory = function (strSource, strProvider, subscriberId) {
        var newsRequest = NetDania.JsApi.Request.getReqObjStory(strSource, strProvider);
        this._addRequest(subscriberId, null, null, null, newsRequest.i, 'newsSearch');
        this.ids.push(newsRequest.i);
        this.tryAppendRequestToServer(newsRequest);
        return newsRequest.i;
    };

    NetDania.ChartConnectionApi.prototype.removeNewsStory = function (requestID) {
        this._removeRequest(requestID);
        this.connection && this.connection.removeRequests([requestID]);
    };

    /**
     * Send a request to retrieve user active alerts
     * @param alertObject
     * @param subscriberId
     * @return {*}
     */
    NetDania.ChartConnectionApi.prototype.alertsUserActiveAlerts = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertGetUserActiveAlerts(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsUserActiveAlerts');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    /**
     * Send a request to retrieve user triggered alerts
     * @param alertObject
     * @param subscriberId
     * @return {*}
     */
    NetDania.ChartConnectionApi.prototype.alertsUserTriggeredAlerts = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertsGetTriggered(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsUserTriggeredAlerts');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    /**
     * Send a request to retrieve user deleted alerts
     * @param alertObject
     * @param subscriberId
     * @return {*}
     */
    NetDania.ChartConnectionApi.prototype.alertsUserDeletedAlerts = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertsGetDeleted(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsUserDeletedAlerts');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    /**
     * Send a request to retrieve user triggered alerts
     * @param alertObject
     * @param subscriberId
     * @return {*}
     */
    NetDania.ChartConnectionApi.prototype.alertsUserTriggeredAlert = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertGetTriggered(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsUserTriggeredAlert');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    /**
     * Send a request to retrieve user deleted alerts
     * @param alertObject
     * @param subscriberId
     * @return {*}
     */
    NetDania.ChartConnectionApi.prototype.alertsUserDeletedAlert = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertGetDeleted(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsUserDeletedAlert');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    /**
     *
     * @param alertObject
     * @param subscriberId
     * @return {number}
     */
    NetDania.ChartConnectionApi.prototype.alertsMonitorUserActivity = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertMonitorUserActivity(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsMonitorUserActivity');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    NetDania.ChartConnectionApi.prototype.alertsUnmonitorUserActivity = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertDisconnectMonitorUserActivity(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsUnmonitorUserActivity');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        this._removeRequest(alertObject.REQUEST_ID);
        return alertRequest.i;
    };

    /**
     *
     * @param alertObject
     * @param subscriberId
     * @return {number}
     */
    NetDania.ChartConnectionApi.prototype.alertsMonitorUser = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertMonitorUser(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsMonitorUser');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    NetDania.ChartConnectionApi.prototype.alertsUnmonitorUser = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertDisconnectMonitorUser(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsUnmonitorUser');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        this._removeRequest(alertObject.REQUEST_ID);
        return alertRequest.i;
    };

    /**
     *
     * @param alertObject
     * @param subscriberId
     * @return {number}
     */
    NetDania.ChartConnectionApi.prototype.alertsGetAlert = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertGet(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsGetAlert');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    /**
     *
     * @param alertObject
     * @param subscriberId
     * @return {number}
     */
    NetDania.ChartConnectionApi.prototype.alertsAddUserAlert = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertAddAlert(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsAddAlert');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    /**
     *
     * @param alertObject
     * @param subscriberId
     * @return {number}
     */
    NetDania.ChartConnectionApi.prototype.alertsEditUserAlert = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertEdit(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsEditAlert');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    /**
     *
     * @param alertObject
     * @param subscriberId
     * @return {number}
     */
    NetDania.ChartConnectionApi.prototype.alertsDeleteUserAlert = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertDelete(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsDeleteAlert');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    /**
     *
     * @param alertObject
     * @param subscriberId
     * @return {number}
     */
    NetDania.ChartConnectionApi.prototype.alertsAddUser = function (alertObject, subscriberId) {
        var alertRequest = NetDania.JsApi.Request.getReqObjAlertAddUser(alertObject);
        this._addRequest(subscriberId, null, null, null, alertRequest.i, 'alertsAddUser');
        this.ids.push(alertRequest.i);
        this.tryAppendRequestToServer(alertRequest);
        return alertRequest.i;
    };

    /**
     *
     * @param alertObject
     * @param subscriberId
     * @return {number}
     */
    NetDania.ChartConnectionApi.prototype.getUserDevices = function (alertObject, subscriberId) {
        var request = NetDania.JsApi.Request.getReqObjAlertGetPushDevices(alertObject);
        this._addRequest(subscriberId, null, null, null, request.i, 'getUserDevices');
        this.ids.push(request.i);
        this.tryAppendRequestToServer(request);
        return request.i;
    };

    /**
     * In case of add and edit alert we remove the initial request in order for request not not be triggered again
     * @param requestID
     */
    NetDania.ChartConnectionApi.prototype.alertsRemoveRequest = function (requestID) {
        this._removeRequest(requestID);
        this.connection && this.connection.removeRequests([requestID]);
    };

    /**
     * Description
     * @method init
     * @param {} arrSeries
     * @param {} id
     * @return
     */
    NetDania.ChartConnectionApi.prototype.init = function (arrSeries, id) {
        if (!this.isConnected) {
            this.isConnected = this.connection.isConnected();
        }

        var subscribers = this._getRequestSubscribers(id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            try {
                var dates = [],
                    opens = [],
                    highs = [],
                    lows = [],
                    closes = [],
                    volumes = [];
                for (var i = 0, length = arrSeries[0].v.length; i < length; i++) {
                    for (var j = 0, lengthArrSeries = arrSeries.length; j < lengthArrSeries; j++) {
                        var f = arrSeries[j].f;

                        switch (f) {
                            case 100:
                                //@TODO - investigate old customeres if we need to have *1000
                                dates[dates.length] = arrSeries[j].v[i];
                                break;

                            case 101:
                                opens[opens.length] = arrSeries[j].v[i];
                                break;

                            case 102:
                                highs[highs.length] = arrSeries[j].v[i];
                                break;

                            case 103:
                                lows[lows.length] = arrSeries[j].v[i];
                                break;

                            case 104:
                                closes[closes.length] = arrSeries[j].v[i];
                                break;

                            case 105:
                                volumes[volumes.length] = arrSeries[j].v[i];
                                break;
                        }
                    }
                }

                var data = [dates, opens, highs, lows, closes, volumes];
            } catch (ex) {
                
            }

            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (subscribers[a].type == 'monitor') {
                    this.subscribers[subscriberID].onInitialData(data, id, {
                        instr: subscribers[a].instrument.instr,
                        timescale: subscribers[a].instrument.timescale,
                        provider: subscribers[a].instrument.provider,
                    });
                }
            }
        }
    };
    /**
     * Description
     * @method update
     * @param {} arrSeries
     * @param {} rt
     * @param {} id
     * @return
     */
    NetDania.ChartConnectionApi.prototype.update = function (arrSeries, rt, id) {
        if (!this.isConnected) {
            this.isConnected = this.connection.isConnected();
        }

        var subscribers = this._getRequestSubscribers(id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var date, close, vol;
            var dates = [],
                opens = [],
                highs = [],
                lows = [],
                closes = [],
                volumes = [];

            if (arrSeries === null || arrSeries === undefined) return;

            for (var i = 0; i < arrSeries.length; i++) {
                var f = arrSeries[i].f;
                switch (f) {
                    case 100:
                        //@TODO - investigate old customeres if we need to have *1000
                        date = arrSeries[i].v;
                        break;

                    case 104:
                        close = parseFloat(arrSeries[i].v);
                        break;

                    case 105:
                        vol = parseInt(arrSeries[i].v, 10);
                        break;
                }
            }

            if (date === null || date === undefined) {
                dates[dates.length] = rt;
            } else {
                dates[dates.length] = date;
            }

            closes[closes.length] = close;
            opens[opens.length] = close;
            highs[highs.length] = close;
            lows[lows.length] = close;
            volumes[volumes.length] = vol;

            var data = [dates, opens, highs, lows, closes, volumes];

            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (subscribers[a].type === 'monitor') {
                    var isNewBar = null;
                    this.subscribers[subscriberID].onDataUpdated(data, isNewBar, id, {
                        instr: subscribers[a].instrument.instr,
                        timescale: subscribers[a].instrument.timescale,
                        provider: subscribers[a].instrument.provider,
                    });
                }
            }
        }
    };

    /**
     * Description
     * @method onHistoricalData
     * @param {} monitorChartResponse
     * @return
     */
    NetDania.ChartConnectionApi.prototype.onHistoricalData = function (response) {
        if (!this.isConnected) {
            this.isConnected = this.connection.isConnected();
        }

        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var dates = [],
                opens = [],
                highs = [],
                lows = [],
                closes = [],
                volumes = [];

            var arrSeries = response.data;

            if (arrSeries !== null) {
                for (var i = 0, length = arrSeries[0].v.length; i < length; i++) {
                    for (var j = 0, lengthArrSeries = arrSeries.length; j < lengthArrSeries; j++) {
                        var f = arrSeries[j].f;

                        switch (f) {
                            case 100:
                                //@TODO - investigate old customeres if we need to have *1000
                                dates.push(arrSeries[j].v[i]);
                                break;
                            case 101:
                                opens.push(parseFloat(arrSeries[j].v[i]));
                                break;
                            case 102:
                                highs.push(parseFloat(arrSeries[j].v[i]));
                                break;
                            case 103:
                                lows.push(parseFloat(arrSeries[j].v[i]));
                                break;
                            case 104:
                                closes.push(parseFloat(arrSeries[j].v[i]));
                                break;
                            case 105:
                                volumes.push(parseInt(arrSeries[j].v[i], 10));
                                break;
                        }
                    }
                }
            }

            var data = [dates, opens, highs, lows, closes, volumes];

            var subscribers = this._getRequestSubscribers(response.id);
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (subscribers[a].type == 'history') {
                    //this._removeRequest(response.id);

                    this.subscribers[subscriberID].onHistoricalData(data, response.id, {
                        instr: subscribers[a].instrument.instr,
                        timescale: subscribers[a].instrument.timescale,
                        provider: subscribers[a].instrument.provider,
                    });
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onWorkspaceData = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var _stringObject = '';
            var _byteEncodedZippedString = response.data.data;
            var _byteUnzippedArray;

            if (_byteEncodedZippedString !== null && _byteEncodedZippedString !== undefined) {
                //decode the string
                var _byteZippedArray = this.decode64(_byteEncodedZippedString);

                //We unzip the array
                _byteUnzippedArray = pako.inflate(_byteZippedArray, { raw: true });

                //Get the string characters
                for (var i = 0; i < _byteUnzippedArray.length; i++) {
                    _stringObject += String.fromCharCode(_byteUnzippedArray[i]);
                }
            }

            _byteEncodedZippedString = null;
            _byteZippedArray = null;
            _byteUnzippedArray = null;

            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (subscribers[a].type == 'workspace') {
                    this._removeRequest(response.id);

                    this.subscribers[subscriberID].onWorkspaceData(_stringObject, response.id);
                }
            }
        }
    };

    /**
     * Description
     * @method onHistoricalData
     * @param {} monitorChartResponse
     * @return
     */
    NetDania.ChartConnectionApi.prototype.onPriceData = function (response) {
        if (!this.isConnected) {
            this.isConnected = this.connection.isConnected();
        }

        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var data = response.data;

            var subscribers = this._getRequestSubscribers(response.id);
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (['price', 'currency'].indexOf(subscribers[a].type) !== -1) {
                    subscribers[a].type === 'price' && this._removeRequest(response.id);

                    if (subscribers[a].type === 'price') {
                        this.subscribers[subscriberID].onPriceData(data, response.id, {
                            instr: subscribers[a].instrument.instr,
                            provider: subscribers[a].instrument.provider,
                        });
                    } else {
                        this.subscribers[subscriberID].onPriceData(response.data, response.id, {
                            instr: subscribers[a].instrument.instr,
                            provider: subscribers[a].instrument.provider,
                        });
                    }
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onHistoricalHeadlines = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var news = [];

            if (response.data !== null) {
                //Parse the news
                news = NetDania.ChartConnectionApi._formatNewsData(response);
            }

            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                var request = this._getRequest(subscribers[a], response.id);
                //Call the response function
                if (typeof this.subscribers[subscriberID].onHistoricalHeadlines === 'function') {
                    this.subscribers[subscriberID].onHistoricalHeadlines(news, response.id);
                } else if (typeof this.subscribers[subscriberID].onHeadlineUpdate === 'function') {
                    this.subscribers[subscriberID].onHeadlineUpdate(news, response.id);
                }
            }
        }
    };

    NetDania.ChartConnectionApi.prototype.onNewsStory = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onNewsStoryUpdate === 'function') {
                    this.subscribers[subscriberID].onNewsStoryUpdate(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertTriggered = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertTriggered === 'function') {
                    this.subscribers[subscriberID].onAlertTriggered(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertGetActive = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertGetActive === 'function') {
                    this.subscribers[subscriberID].onAlertGetActive(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertGetTriggered = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertGetTriggered === 'function') {
                    this.subscribers[subscriberID].onAlertGetTriggered(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertGetDeleted = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertGetDeleted === 'function') {
                    this.subscribers[subscriberID].onAlertGetDeleted(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertsGetTriggered = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertsGetTriggered === 'function') {
                    this.subscribers[subscriberID].onAlertsGetTriggered(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertsGetDeleted = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertsGetDeleted === 'function') {
                    this.subscribers[subscriberID].onAlertsGetDeleted(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertMonitorUserActivity = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertMonitorUserActivity === 'function') {
                    this.subscribers[subscriberID].onAlertMonitorUserActivity(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertGet = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertGet === 'function') {
                    this.subscribers[subscriberID].onAlertGet(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertsGetDeleted = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertsGetDeleted === 'function') {
                    this.subscribers[subscriberID].onAlertsGetDeleted(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertEdited = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertEdited === 'function') {
                    this.subscribers[subscriberID].onAlertEdited(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertAdded = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertAdded === 'function') {
                    this.subscribers[subscriberID].onAlertAdded(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertDeleted = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertDeleted === 'function') {
                    this.subscribers[subscriberID].onAlertDeleted(response, response.id);
                }
            }
        }
    };
    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onAlertUserAdded = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onAlertUserAdded === 'function') {
                    this.subscribers[subscriberID].onAlertUserAdded(response, response.id);
                }
            }
        }
    };
    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onUserDevices = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (typeof this.subscribers[subscriberID].onUserDevices === 'function') {
                    this.subscribers[subscriberID].onUserDevices(response, response.id);
                }
            }
        }
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onHeadlineUpdate = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);

        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var news = [];

            if (response.data !== null) {
                //Parse the news
                news = NetDania.ChartConnectionApi._formatNewsData(response);
            }

            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;

                if (subscribers[a].type === 'newsMonitor') {
                    var request = this._getRequest(subscribers[a], response.id);
                    //Call the response function
                    this.subscribers[subscriberID].onHeadlineUpdate(news, response.id, true);
                }
            }
        }
    };

    /**
     * Format the news response
     * @param response
     * @return {Array}
     * @private
     */
    NetDania.ChartConnectionApi._formatNewsData = function (response) {
        return response.data;
    };

    /**
     *
     * @param response
     */
    NetDania.ChartConnectionApi.prototype.onError = function (response) {
        var subscribers = this._getRequestSubscribers(response.id);
        if (subscribers !== null && subscribers !== undefined && subscribers.length > 0) {
            var totalSubscribers = subscribers.length;
            for (var a = 0; a < totalSubscribers; a++) {
                var subscriberID = subscribers[a].subscriberID;
                if (this.subscribers[subscriberID] && this.subscribers[subscriberID].onError)
                    if (typeof response === 'object') {
                        this.subscribers[subscriberID].onError(null, response.code, response.id);
                    } else {
                        this.subscribers[subscriberID].onError(response, null, null);
                    }
            }
        }
    };

    NetDania.ChartConnectionApi.prototype._addRequest = function (
        subscriberID,
        symbol,
        provider,
        timescale,
        requestID,
        type
    ) {
        var subscriber = this._getSubscriber(subscriberID);
        if (subscriber !== null) {
            var request = this._getRequest(subscriber, requestID);
            request.instrument = { instr: symbol, provider: provider, timescale: timescale };
            request.type = type;
        }
    };

    NetDania.ChartConnectionApi.prototype._getSubscriber = function (subscriberID) {
        if (this.requests !== null) {
            for (var r in this.requests) {
                if (
                    this.requests[r] !== null &&
                    this.requests[r] !== undefined &&
                    this.requests[r].subscriberID !== null &&
                    this.requests[r].subscriberID !== undefined &&
                    this.requests[r].subscriberID == subscriberID
                ) {
                    return this.requests[r];
                }
            }
            this.requests.push({ subscriberID: subscriberID });
            return this.requests[this.requests.length - 1];
        }
        return null;
    };

    NetDania.ChartConnectionApi.prototype._getRequestSubscribers = function (requestID) {
        if (this.requests !== null) {
            var returnSubscribers = [];
            for (var s in this.requests) {
                if (
                    this.requests[s] !== null &&
                    this.requests[s] !== undefined &&
                    this.requests[s].requests !== null &&
                    this.requests[s].requests !== undefined
                ) {
                    var requests = this.requests[s].requests;
                    for (var r in requests) {
                        if (requestID !== null && requestID !== undefined) {
                            if (
                                requests[r] !== null &&
                                requests[r] !== undefined &&
                                requests[r].requestId !== null &&
                                requests[r].requestId !== undefined &&
                                requests[r].requestId == requestID
                            ) {
                                returnSubscribers.push({
                                    subscriberID: this.requests[s].subscriberID,
                                    instrument: requests[r].instrument,
                                    type: requests[r].type,
                                });
                            }
                        } else {
                            returnSubscribers.push({
                                subscriberID: this.requests[s].subscriberID,
                                instrument: requests[r].instrument,
                                type: requests[r].type,
                            });
                        }
                    }
                }
            }

            if (returnSubscribers.length > 0) {
                return returnSubscribers;
            } else {
                return null;
            }
        }
        return null;
    };

    NetDania.ChartConnectionApi.prototype._getRequest = function (subscriber, requestId) {
        if (subscriber !== null) {
            subscriber.requests = subscriber.requests || [];
            for (var r in subscriber.requests) {
                if (
                    subscriber.requests[r] !== null &&
                    subscriber.requests[r] !== undefined &&
                    subscriber.requests[r].requestId !== null &&
                    subscriber.requests[r].requestId !== undefined &&
                    subscriber.requests[r].requestId == requestId
                ) {
                    return subscriber.requests[r];
                }
            }

            subscriber.requests.push({ requestId: requestId });
            return subscriber.requests[subscriber.requests.length - 1];
        }
        return null;
    };

    NetDania.ChartConnectionApi.prototype._getRequestInstrument = function (
        subscriberID,
        symbol,
        timescale,
        provider,
        type
    ) {
        var subscriber = this._getSubscriber(subscriberID);
        if (subscriber !== null) {
            for (var r in subscriber.requests) {
                if (subscriber.requests[r] !== null && subscriber.requests[r] !== undefined) {
                    if (subscriber.requests[r].instrument !== null && subscriber.requests[r].instrument !== undefined) {
                        if (
                            subscriber.requests[r].instrument.instr == symbol &&
                            subscriber.requests[r].instrument.timescale == timescale &&
                            subscriber.requests[r].instrument.provider == provider &&
                            subscriber.requests[r].type !== undefined &&
                            type !== undefined &&
                            subscriber.requests[r].type == type
                        ) {
                            return subscriber.requests[r];
                        }
                    }
                }
            }
        }
        return null;
    };

    NetDania.ChartConnectionApi.prototype._getRequestPrice = function (subscriberID, symbol, provider, type) {
        var subscriber = this._getSubscriber(subscriberID);
        if (subscriber !== null) {
            for (var r in subscriber.requests) {
                if (subscriber.requests[r] !== null && subscriber.requests[r] !== undefined) {
                    if (subscriber.requests[r].instrument !== null && subscriber.requests[r].instrument !== undefined) {
                        if (
                            subscriber.requests[r].instrument.instr == symbol &&
                            subscriber.requests[r].instrument.provider == provider &&
                            subscriber.requests[r].type !== undefined &&
                            type !== undefined &&
                            subscriber.requests[r].type == type
                        ) {
                            return subscriber.requests[r];
                        }
                    }
                }
            }
        }
        return null;
    };

    NetDania.ChartConnectionApi.prototype._removeRequest = function (requestID) {
        if (this.requests !== null) {
            for (var s in this.requests) {
                if (
                    this.requests[s] !== null &&
                    this.requests[s] !== undefined &&
                    this.requests[s].requests !== null &&
                    this.requests[s].requests !== undefined
                ) {
                    var requests = this.requests[s].requests;
                    for (var r in requests) {
                        if (
                            requests[r] !== null &&
                            requests[r] !== undefined &&
                            requests[r].requestId !== null &&
                            requests[r].requestId !== undefined &&
                            requests[r].requestId == requestID
                        ) {
                            requests.splice(r, 1);
                            break;
                        }
                    }
                }
            }
        }
    };

    /**
     *
     * @param num
     * @returns {Uint8Array}
     */
    NetDania.ChartConnectionApi.prototype.writeIntBytes = function (num) {
        var bufferArr = new Uint8Array(4);
        bufferArr[0] = (num & 0xff000000) >> 24;
        bufferArr[1] = (num & 0x00ff0000) >> 16;
        bufferArr[2] = (num & 0x0000ff00) >> 8;
        bufferArr[3] = num & 0x000000ff;

        return bufferArr;
    };

    /**
     *
     * @param bytesArray
     * @returns {*}
     */
    NetDania.ChartConnectionApi.prototype.readIntBytes = function (bytesArray) {
        var ch1 = bytesArray[0];
        var ch2 = bytesArray[1];
        var ch3 = bytesArray[2];
        var ch4 = bytesArray[3];

        var _val = (ch1 << 24) + (ch2 << 16) + (ch3 << 8) + (ch4 << 0);
        return _val;
    };

    NetDania.ChartConnectionApi.prototype.getAppId = function () {
        return this.connection.getAppId();
    };

    /**
     *
     * @type {string}
     */
    NetDania.ChartConnectionApi.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    /**
     * @description Decodes an input from base64 to a byte array
     * @ToDo - Check if we can use atoa and btoa instead of _encode64 and _decode64 to reduce the source code amount
     * @param input
     * @private
     * @returns {Array}
     */
    NetDania.ChartConnectionApi.prototype.decode64 = function (input) {
        var keyStr = NetDania.ChartConnectionApi.keyStr;
        var output = [];
        var j = 0;
        var chr1,
            chr2,
            chr3 = '';
        var enc1,
            enc2,
            enc3,
            enc4 = '';
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, -, _, or =
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

        do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output[j++] = chr1;

            if (enc3 != 64) {
                output[j++] = chr2;
            }

            if (enc4 != 64) {
                output[j++] = chr3;
            }

            chr1 = chr2 = chr3 = '';
            enc1 = enc2 = enc3 = enc4 = '';
        } while (i < input.length);

        return output;
    };
})(typeof window !== 'undefined' ? window : global);
