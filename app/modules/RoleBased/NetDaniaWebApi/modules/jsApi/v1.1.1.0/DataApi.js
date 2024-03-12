let global = require("./NetDaniaJSAPI.js");
require("./ChartConnectionApi.js");
require("./ChartSubscriber.js");

let defaultConfiguration = {
    host: '//balancer.netdania.com/StreamingServer/StreamingServer',
    failoverHosts: [
        '//balancer-cro.netdania.com/StreamingServer/StreamingServer',
        '//balancer.datafeeds.io/StreamingServer/StreamingServer',
        '//balancer-cro.datafeeds.io/StreamingServer/StreamingServer',
    ],
    connectionType: global.NetDania.JsApi.ConnectionType.AUTO,
    pollingInterval: global.NetDania.JsApi.PoolingInterval.AUTO,    
    livePoints: 500,
    historicalPoints: 500,    
    usergroup: '',
    password: '',
};

class DataApi {
    constructor(opts) {
        // making sure opts is defined
        opts = typeof opts !== "undefined" ? opts : {};
        this.config = {
            jsApi: {
                host: opts.hasOwnProperty('host') ? opts.host : defaultConfiguration.host,
                failoverHosts: opts.hasOwnProperty('failoverHosts') ? opts.failoverHosts : defaultConfiguration.failoverHosts,
                behavior: opts.hasOwnProperty('connectionType') ? opts.connectionType : defaultConfiguration.connectionType,
                pollingInterval: opts.hasOwnProperty('pollingInterval') ? opts.pollingInterval : defaultConfiguration.pollingInterval,                
                appId: opts.hasOwnProperty('appId') ? opts.appId : defaultConfiguration.appId,
                v: opts.version ?? 4,
                usergroup: opts.hasOwnProperty('usergroup') ? opts.usergroup : defaultConfiguration.usergroup,
                password: opts.hasOwnProperty('password') ? opts.password : defaultConfiguration.password,
            },           
            livePoints: opts.hasOwnProperty('livePoints') ? opts.livePoints : defaultConfiguration.livePoints,
            historicalPoints: opts.hasOwnProperty('historicalPoints') ? opts.historicalPoints : defaultConfiguration.historicalPoints,
        };

        if (
            opts.hasOwnProperty('usergroup') &&
            typeof opts.usergroup !== 'undefined'
        ) {
            this.config.jsApi.usergroup = opts.usergroup;
        }

        this.connection = new global.NetDania.ChartConnectionApi(this.config);

        if (!this.connection.isConnected) {
            this.connection.connect();
        }
    }

    getSubscriber() {
        return this.connection.subscribe();
    }

    destroy() {
        this.connection.destroy();
        delete this.config;
    }
}

module.exports = DataApi;