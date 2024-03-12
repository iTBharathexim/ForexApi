let global = require('./NetDaniaJSAPI');
(function (NetDania) {
    'use strict';

    /**
     * Description
     * @method ChartSubscriber
     * @param {NetDania.ChartConnectionApi} connection
     * @return
     */
    NetDania.ChartSubscriber = function (connection) {
        this.chartConnectionApi = connection;
        this.id = NetDania.ChartSubscriber.generateID();
        this._subscribers = {};
        this._subscribers['initial'] = [];
        this._subscribers['update'] = [];
        this._subscribers['historical'] = [];
        this._subscribers['workspace'] = [];
    };
    NetDania.ChartSubscriber.ids = 0;

    NetDania.ChartSubscriber.generateID = function () {
        NetDania.ChartSubscriber.ids++;
        return NetDania.ChartSubscriber.ids;
    };

    NetDania.ChartSubscriber.prototype.onInitialData = function (data, id, meta) {
        var initial = this._subscribers['initial'];
        for (var i in initial) {
            initial[i](data, id, meta);
        }
    };

    NetDania.ChartSubscriber.prototype.onDataUpdated = function (data, isNewBar, id, meta) {
        var updated = this._subscribers['update'];
        for (var i in updated) {
            updated[i](data, isNewBar, id, meta);
        }
    };

    NetDania.ChartSubscriber.prototype.onHistoricalData = function (data, id, meta) {
        var historical = this._subscribers['historical'];
        for (var i in historical) {
            historical[i](data, id, meta);
        }
    };

    NetDania.ChartSubscriber.prototype.onWorkspaceData = function (data, id) {
        var workspace = this._subscribers['workspace'];
        for (var i in workspace) {
            workspace[i](data, id);
        }
    };

    NetDania.ChartSubscriber.prototype.subscribe = function (initial, update, historical, workspace) {
        this._subscribers['initial'].push(initial);
        this._subscribers['update'].push(update);
        this._subscribers['historical'].push(historical);
        this._subscribers['workspace'].push(workspace);
    };

    NetDania.ChartSubscriber.prototype.unsubscribe = function (initial, update, historical, workspace) {
        for (var i = 0, len = this._subscribers['initial'].length; i < len; i++) {
            if (this._subscribers['initial'][i] == initial) {
                this._subscribers['initial'].splice(i, 1);
            }
        }

        for (var i = 0, len = this._subscribers['update'].length; i < len; i++) {
            if (this._subscribers['update'][i] == update) {
                this._subscribers['update'].splice(i, 1);
            }
        }

        for (var i = 0, len = this._subscribers['historical'].length; i < len; i++) {
            if (this._subscribers['historical'][i] == historical) {
                this._subscribers['historical'].splice(i, 1);
            }
        }

        for (var i = 0, len = this._subscribers['workspace'].length; i < len; i++) {
            if (this._subscribers['workspace'][i] == workspace) {
                this._subscribers['workspace'].splice(i, 1);
            }
        }
    };

    /**
     * Description
     * @method monitorInstrument
     * @param {} symbol
     * @param {int} timescale
     * @param {} provider
     * @param {} quoteType
     * @return dataSet
     */
    NetDania.ChartSubscriber.prototype.monitorInstrument = function (symbol, timescale, provider, quoteType) {
        var requestId;
        if (this.chartConnectionApi.monitorInstrument.length == 4) {
            requestId = this.chartConnectionApi.monitorInstrument(symbol, timescale, provider, this.id);
        } else {
            requestId = this.chartConnectionApi.monitorInstrument(symbol, timescale, provider, quoteType, this.id);
        }

        if (requestId instanceof Object) {
            return requestId.liveId;
        }
        return requestId;
    };

    /**
     * Description
     * @method monitorInstrument
     * @param {} symbol
     * @param {} timescale
     * @param {} provider
     * @return dataSet
     */
    NetDania.ChartSubscriber.prototype.monitorChart = function (symbol, provider) {
        if (typeof this.chartConnectionApi.monitorChart === 'function') {
            var requestId = this.chartConnectionApi.monitorChart(symbol, provider, this.id);
            return requestId;
        }
    };

    /**
     * Description
     * @method unmonitorChart
     * @param {} symbol
     * @param {} timescale
     * @param {} provider
     * @return
     */
    NetDania.ChartSubscriber.prototype.unmonitorChart = function (symbol, provider) {
        if (typeof this.chartConnectionApi.unmonitorChart === 'function') {
            var requestId = this.chartConnectionApi.unmonitorChart(symbol, provider, this.id);
            return requestId;
        }
    };

    /**
     * Description
     * @method unmonitorInstrument
     * @param {} symbol
     * @param {} timescale
     * @param {} provider
     * @return
     */
    NetDania.ChartSubscriber.prototype.unmonitorInstrument = function (symbol, timescale, provider, quoteType) {
        if (typeof this.chartConnectionApi.unmonitorInstrument === 'function') {
            var requestId;
            if (this.chartConnectionApi.unmonitorInstrument.length == 4) {
                requestId = this.chartConnectionApi.unmonitorInstrument(symbol, timescale, provider, this.id);
            } else {
                requestId = this.chartConnectionApi.unmonitorInstrument(
                    symbol,
                    timescale,
                    provider,
                    quoteType,
                    this.id
                );
            }
            return requestId;
        }
    };

    /**
     * Description
     * @method snapshotData
     * @param {string} symbol
     * @param {int} timescale
     * @param {string} provider
     * @param {int} historicalPoints
     * @return
     */
    NetDania.ChartSubscriber.prototype.snapshotData = function (
        symbol,
        timescale,
        provider,
        historicalPoints
    ) {

        if (typeof this.chartConnectionApi.snapshotData === 'function') {
            var requestId;
                requestId = this.chartConnectionApi.snapshotData(
                    symbol,
                    timescale,
                    provider,
                    historicalPoints,
                    this.id,
                );

            //Old ChartConnectionApi will have an object as ID
            if (requestId instanceof Object) {
                return requestId.historicalId;
            }

            return requestId;
        }
    };

    /**
     * Description
     * @method snapshotData
     * @param {string} symbol
     * @param {int} timescale
     * @param {string} provider
     * @param {int} startDate
     * @param {int} interestPoints
     * @return
     */
    NetDania.ChartSubscriber.prototype.snapshotDataFromDate = function (
        symbol,
        timescale,
        provider,
        startDate,
        interestPoints
    ) {
        if (typeof this.chartConnectionApi.snapshotDataFromDate === 'function') {
            var requestId = this.chartConnectionApi.snapshotDataFromDate(
                symbol,
                timescale,
                provider,
                startDate,
                interestPoints,
                this.id
            );
            return requestId;
        }
    };

    /**
     * Description
     * @method snapshotData
     * @param {string} symbol
     * @param {int} timescale
     * @param {string} provider
     * @param {int} startDate
     * @param {int} endDate
     * @param {int} interestPoints
     * @return
     */
    NetDania.ChartSubscriber.prototype.snapshotDataBetweenDate = function (
        symbol,
        timescale,
        provider,
        startDate,
        endDate,
        interestPoints
    ) {
        if (typeof this.chartConnectionApi.snapshotDataBetweenDate === 'function') {
            var requestId = this.chartConnectionApi.snapshotDataBetweenDate(
                symbol,
                timescale,
                provider,
                startDate,
                endDate,
                interestPoints,
                this.id
            );
            return requestId;
        }
    };

    /**
     * Description
     * @method unsnapshotData
     * @param {} symbol
     * @param {} timescale
     * @param {} provider
     * @return
     */
    NetDania.ChartSubscriber.prototype.unsnapshotData = function (symbol, timescale, provider, requestId) {
        if (typeof this.chartConnectionApi.unsnapshotData === 'function') {
            var requestId = this.chartConnectionApi.unsnapshotData(symbol, timescale, provider, this.id, requestId);
            return requestId;
        }
    };

    /**
     * Load the user workspace
     * @param userID
     */
    NetDania.ChartSubscriber.prototype.loadWorkspace = function (userID) {
        if (typeof this.chartConnectionApi.loadWorkspace === 'function') {
            var requestId = this.chartConnectionApi.loadWorkspace(userID, this.id);
            return requestId;
        }
    };

    /**
     * Load the user workspace
     * @param userID
     */
    NetDania.ChartSubscriber.prototype.saveWorkspace = function (userID, workspaceString) {
        if (typeof this.chartConnectionApi.saveWorkspace === 'function') {
            var requestId = this.chartConnectionApi.saveWorkspace(userID, workspaceString, this.id);
            return requestId;
        }
    };

    /**
     * Get a price quote
     * @param userID
     */
    NetDania.ChartSubscriber.prototype.monitorPriceData = function (symbol, provider, flt) {
        if (typeof this.chartConnectionApi.monitorPriceData === 'function') {
            var requestId = this.chartConnectionApi.monitorPriceData(symbol, provider, this.id, flt);
            return requestId;
        }
    };

    /**
     * Get a price quote
     * @param userID
     */
    NetDania.ChartSubscriber.prototype.priceData = function (symbol, provider) {
        if (typeof this.chartConnectionApi.priceData === 'function') {
            var requestId = this.chartConnectionApi.priceData(symbol, provider, this.id);
            return requestId;
        }
    };

    /**
     * Description
     * @method unsnapshotData
     * @param {} symbol
     * @param {} timescale
     * @param {} provider
     * @return
     */
    NetDania.ChartSubscriber.prototype.unpriceData = function (symbol, provider, requestId) {
        if (typeof this.chartConnectionApi.unpriceData === 'function') {
            var requestId = this.chartConnectionApi.unpriceData(symbol, provider, this.id, requestId);
            return requestId;
        }
    };

    /**
     * Get a price quote
     * @param userID
     */
    NetDania.ChartSubscriber.prototype.newsSearch = function (
        strSource,
        strSearch,
        intMax,
        intStartTime,
        intEndTime,
        byteSearchIn,
        strProvider
    ) {
        if (typeof this.chartConnectionApi.newsSearch === 'function') {
            var requestId = this.chartConnectionApi.newsSearch(
                strSource,
                strSearch,
                intMax,
                intStartTime,
                intEndTime,
                byteSearchIn,
                strProvider,
                this.id
            );
            return requestId;
        }
    };

    NetDania.ChartSubscriber.prototype.removeNewsSearch = function (requestID) {
        if (typeof this.chartConnectionApi.removeNewsSearch === 'function') {
            this.chartConnectionApi.removeNewsSearch(requestID);
        }
    };

    /**
     * Get a price quote
     * @param userID
     */
    NetDania.ChartSubscriber.prototype.newsMonitor = function (strSource, intMax, strProvider, boolMonitor) {
        if (typeof this.chartConnectionApi.newsMonitor === 'function') {
            var requestId = this.chartConnectionApi.newsMonitor(strSource, intMax, strProvider, boolMonitor, this.id);
            return requestId;
        }
    };

    NetDania.ChartSubscriber.prototype.newsUnMonitor = function (requestID) {
        if (typeof this.chartConnectionApi.newsUnMonitor === 'function') {
            this.chartConnectionApi.newsUnMonitor(requestID);
        }
    };

    NetDania.ChartSubscriber.prototype.newsStory = function (strSource, strProvider) {
        if (typeof this.chartConnectionApi.newsStory === 'function') {
            return this.chartConnectionApi.newsStory(strSource, strProvider, this.id);
        }
    };

    NetDania.ChartSubscriber.prototype.removeNewsStory = function (requestID) {
        if (typeof this.chartConnectionApi.removeNewsStory === 'function') {
            this.chartConnectionApi.removeNewsStory(requestID);
        }
    };

    /**
     * Send a request to retrieve user active alerts
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsUserActiveAlerts = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsUserActiveAlerts === 'function') {
            return this.chartConnectionApi.alertsUserActiveAlerts(alertObject, this.id);
        }
    };

    /**
     * Send a request to retrieve user triggered alerts
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsUserTriggeredAlerts = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsUserTriggeredAlerts === 'function') {
            return this.chartConnectionApi.alertsUserTriggeredAlerts(alertObject, this.id);
        }
    };

    /**
     * Send a request to retrieve user triggered alerts
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsUserDeletedAlerts = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsUserDeletedAlerts === 'function') {
            return this.chartConnectionApi.alertsUserDeletedAlerts(alertObject, this.id);
        }
    };

    /**
     * Send a request to retrieve an user triggered alert
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsUserTriggeredAlert = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsUserTriggeredAlert === 'function') {
            return this.chartConnectionApi.alertsUserTriggeredAlert(alertObject, this.id);
        }
    };

    /**
     * Send a request to retrieve an user deleted alert
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsUserDeletedAlert = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsUserDeletedAlert === 'function') {
            return this.chartConnectionApi.alertsUserDeletedAlert(alertObject, this.id);
        }
    };

    /**
     * Send a request to retrieve user activity
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsMonitorUserActivity = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsMonitorUserActivity === 'function') {
            return this.chartConnectionApi.alertsMonitorUserActivity(alertObject, this.id);
        }
    };
    /**
     * Send a request to retrieve user activity
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsUnmonitorUserActivity = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsUnmonitorUserActivity === 'function') {
            return this.chartConnectionApi.alertsUnmonitorUserActivity(alertObject, this.id);
        }
    };

    /**
     * Send a request to retrieve user activity
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsMonitorUser = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsMonitorUser === 'function') {
            return this.chartConnectionApi.alertsMonitorUser(alertObject, this.id);
        }
    };
    /**
     * Send a request to retrieve user activity
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsUnmonitorUser = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsUnmonitorUser === 'function') {
            return this.chartConnectionApi.alertsUnmonitorUser(alertObject, this.id);
        }
    };

    /**
     * Send a request to retrieve user activity
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsGetAlert = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsGetAlert === 'function') {
            return this.chartConnectionApi.alertsGetAlert(alertObject, this.id);
        }
    };

    /**
     * Add user alert
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsAddUserAlert = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsAddUserAlert === 'function') {
            return this.chartConnectionApi.alertsAddUserAlert(alertObject, this.id);
        }
    };

    /**
     * Edit user alert
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsEditUserAlert = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsEditUserAlert === 'function') {
            return this.chartConnectionApi.alertsEditUserAlert(alertObject, this.id);
        }
    };

    /**
     * delete user alert
     * @param alertObject
     * @return {*}
     */
    NetDania.ChartSubscriber.prototype.alertsDeleteUserAlert = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsDeleteUserAlert === 'function') {
            return this.chartConnectionApi.alertsDeleteUserAlert(alertObject, this.id);
        }
    };

    NetDania.ChartSubscriber.prototype.alertsRemoveRequest = function (requestID) {
        if (typeof this.chartConnectionApi.alertsRemoveRequest === 'function') {
            return this.chartConnectionApi.alertsRemoveRequest(requestID);
        }
    };

    /**
     * @param alertObject
     * @return {number}
     */
    NetDania.ChartSubscriber.prototype.alertsAddUser = function (alertObject) {
        if (typeof this.chartConnectionApi.alertsAddUser === 'function') {
            return this.chartConnectionApi.alertsAddUser(alertObject, this.id);
        }
    };

    /**
     * @param alertObject
     * @return {number}
     */
    NetDania.ChartSubscriber.prototype.getUserDevices = function (alertObject) {
        if (typeof this.chartConnectionApi.getUserDevices === 'function') {
            return this.chartConnectionApi.getUserDevices(alertObject, this.id);
        }
    };
})((global.NetDania));
