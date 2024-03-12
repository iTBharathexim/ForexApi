let ConnectionApiAbstract = require('./ConnectionApiAbstract');
let DataApi = require('./v1.1.1.0/DataApi');

class ConnectionApi extends ConnectionApiAbstract {
    constructor(opts) {
        super();
        this.connection = new DataApi(opts);
    }

    newsSearch(subscriber, source, search, max, startTime, endTime, searchIn, provider) {
        // get subscriber
        let chartSubscriber = this.connection.getSubscriber();

        // set id on internal subscriber
        subscriber.setId(chartSubscriber.id);

        // append callbacks
        chartSubscriber.onHistoricalHeadlines = subscriber.onSuccess;
        chartSubscriber.onError = subscriber.onError;
        chartSubscriber.newsSearch(source, search, max, startTime, endTime, searchIn, provider);
    }

    monitorNews(subscriber, source, max, provider, monitor) {
        let chartSubscriber = this.connection.getSubscriber();

        subscriber.setId(chartSubscriber.id);

        chartSubscriber.onHistoricalHeadlines = subscriber.onSuccess;
        chartSubscriber.onHeadlineUpdate = subscriber.onUpdate;
        chartSubscriber.onError = subscriber.onError;
        chartSubscriber.newsMonitor(source, max, provider, monitor);
    }

    unMonitorNews(subscriber) {
        let chartSubscriber = this.connection.getSubscriber();
        chartSubscriber.newsUnMonitor(subscriber.getId());
    }

    monitorPriceData(subscriber, symbol, provider, filters) {
        let chartSubscriber = this.connection.getSubscriber();
        subscriber.setId(chartSubscriber.id);

        chartSubscriber.onPriceData = subscriber.onSuccess;
        chartSubscriber.onError = subscriber.onError;
        return chartSubscriber.monitorPriceData(symbol, provider, filters);
    }

    unMonitorPriceData(subscriber, requestId, symbol, provider) {
        let chartSubscriber = this.connection.getSubscriber();
        chartSubscriber.id = subscriber.getId();
        chartSubscriber.unpriceData(symbol, provider, subscriber.getId());
    }

    snapshotData(subscriber, symbol, timescale, provider, historicalPoints) {
        let chartSubscriber = this.connection.getSubscriber();
        subscriber.setId(chartSubscriber.id);

        chartSubscriber.onHistoricalData = subscriber.onSuccess;
        chartSubscriber.onError = subscriber.onError;
        return chartSubscriber.snapshotData(symbol, timescale, provider, historicalPoints);
    }

    snapshotDataFromDate(subscriber, symbol, timescale, provider, startDate,  historicalPoints) {
        let chartSubscriber = this.connection.getSubscriber();
        subscriber.setId(chartSubscriber.id);

        chartSubscriber.onHistoricalData = subscriber.onSuccess;
        chartSubscriber.onError = subscriber.onError;
        return chartSubscriber.snapshotDataFromDate(symbol, timescale, provider, startDate, historicalPoints);
    }

    snapshotDataBetweenDate(subscriber, symbol, timescale, provider, startDate, endDate, historicalPoints) {
        let chartSubscriber = this.connection.getSubscriber();
        subscriber.setId(chartSubscriber.id);
        chartSubscriber.onHistoricalData = subscriber.onSuccess;
        chartSubscriber.onError = subscriber.onError;
        return chartSubscriber.snapshotDataBetweenDate(symbol, timescale, provider, startDate, endDate, historicalPoints);
    }

    dispose() {
        this.connection && this.connection.destroy();
        delete this.connection;
    }
}

module.exports = ConnectionApi;
