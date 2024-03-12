class UnimplementedException extends Error {
}
class ConnectionApiAbstract {
    /**
     * Monitor chart request
     * @param {CommonSubscriber} subscriber
     * @param {string} symbol
     * @param {string} provider
     */
    monitorChart(subscriber, symbol, provider) {
        throw new UnimplementedException("monitorChart is not implemented on connection API");
    }

    /**
     * Unsubscribe from monitoring a chart
     * @param {CommonSubscriber} subscriber
     * @param {string} symbol
     * @param {string} provider
     */
    unMonitorChart(subscriber, symbol, provider) {
        throw new UnimplementedException("unMonitorChart is not implemented on connection API");
    }

    /**
     * Subscriber to monitoring instrument
     * @param {CommonSubscriber} subscriber
     * @param {string} symbol
     * @param {int} timescale
     * @param {string} provider
     * @param {string} quoteType
     */
    monitorInstrument(subscriber, symbol, timescale, provider, quoteType) {
        throw new UnimplementedException("monitorInstrument is not implemented on connection API");
    }

    /**
     * Unsubscribe from monitoring an instrument
     * @param {CommonSubscriber} subscriber
     * @param {string} symbol
     * @param {int} timescale
     * @param {string} provider
     * @param {string} quoteType
     */
    unMonitorInstrument(subscriber, symbol, timescale, provider, quoteType) {
        throw new UnimplementedException("unMonitorInstrument is not implemented on connection API");
    }

    /**
     * Snapshot data for a given instrument
     * @param {CommonSubscriber} subscriber
     * @param {string} symbol
     * @param {int} timescale
     * @param {string} provider
     * @param {string} quoteType
     * @param {int} points
     */
    snapshotData(subscriber, symbol, timescale, provider, points, quoteType) {
        throw new UnimplementedException("snapshotData is not implemented on connection API");
    }

    /**
     * Snapshot instrument data by a given date
     * @param {CommonSubscriber} subscriber
     * @param {string} symbol
     * @param {int} timescale
     * @param {string} provider
     * @param {int} startDate
     * @param {string} quoteType
     * @param {int} points
     */
    snapshotDataFromDate(subscriber, symbol, timescale, provider, startDate, quoteType, points) {
        throw new UnimplementedException("snapshotDataFromDate is not implemented on connection API");
    }

    /**
     * Unsubscribe from snapshot
     * @param {CommonSubscriber} subscriber
     * @param {string} symbol
     * @param {int} timescale
     * @param {string} provider
     */
    unSnapshotData(subscriber, symbol, timescale, provider) {
        throw new UnimplementedException("unSnapshotData is not implemented on connection API");
    }

    /**
     * Load workspace by a given user id
     * @param {CommonSubscriber} subscriber
     * @param {string} workspaceId
     */
    loadWorkspace(subscriber, workspaceId) {
        throw new UnimplementedException("loadWorkspace is not implemented on connection API");
    }

    /**
     * Handle request for saving workspace to a server
     * @param {CommonSubscriber} subscriber
     * @param {string} workspaceId valid file name
     * @param {string} workspace file content
     */
    saveWorkspace(subscriber, workspaceId, workspace) {
        throw new UnimplementedException("saveWorkspace is not implemented on connection API");
    }

    /**
     * Request for monitoring price data
     * @param {CommonSubscriber} subscriber
     * @param {string} symbol
     * @param {string} provider
     * @param {object} filters
     */
    monitorPriceData(subscriber, symbol, provider, filters) {
        throw new UnimplementedException("monitorPriceData is not implemented on connection API");
    }

    /**
     * Request for unMonitoring price data
     * @param {CommonSubscriber} subscriber
     * @param {string} requestId
     * @param {string} symbol
     * @param {string} provider
     */
    unMonitorPriceData(subscriber, requestId, symbol, provider) {
        throw new UnimplementedException("unMonitorPriceData is not implemented on connection API");
    }

    /**
     * Search for news by a set of given filters
     * @param {CommonSubscriber} subscriber callable success function
     * @param {string} source string for the news source
     * @param {string} search string
     * @param {int} max unsigned short for the max number of results
     * @param {int} startTime start time in seconds
     * @param {int} endTime end time in seconds
     * @param {int} searchIn Byte field for search (0 = all, 1 = headlines only, 2 = stories only)
     * @param {string} provider news provider
     */
    newsSearch(subscriber, source, search, max, startTime, endTime, searchIn, provider) {
        throw new UnimplementedException("newsSearch is not implemented on connection API");
    }

    /**
     * Monitor news by a given provider
     * @param {CommonSubscriber} subscriber callback for error
     * @param {string} source for monitoring
     * @param {int} max
     * @param {string} provider
     * @param {boolean} monitor indicating subscription mode
     */
    monitorNews(subscriber, source, max, provider, monitor) {
        throw new UnimplementedException("monitorNews is not implemented on connection API");
    }

    /**
     * Unsubscribe from news monitor
     * @param {CommonSubscriber} subscriber
     */
    unMonitorNews(subscriber) {
        throw new UnimplementedException("unMonitorNews is not implemented on connection API");
    }

    /**
     * Request the story of a news
     * @param {CommonSubscriber} subscriber
     * @param {string} source
     * @param {string} provider
     */
    newsStory(subscriber, source, provider) {
        throw new UnimplementedException("newsStory is not implemented on connection API");
    }

    /**
     * Request active alerts
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    activeAlerts(subscriber, alertObject) {
        throw new UnimplementedException("activeAlerts is not implemented on connection API");
    }

    /**
     * Request triggered alerts
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    triggeredAlerts(subscriber, alertObject) {
        throw new UnimplementedException("triggeredAlerts is not implemented on connection API");
    }

    /**
     * Request deleted alerts
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    deletedAlerts(subscriber, alertObject) {
        throw new UnimplementedException("deletedAlerts is not implemented on connection API");
    }

    /**
     * Send request to retrieve a triggered alert
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    triggeredAlert(subscriber, alertObject) {
        throw new UnimplementedException("triggeredAlert is not implemented on connection API");
    }

    /**
     * Send request to retrieve a deleted alert
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    deletedAlert(subscriber, alertObject) {
        throw new UnimplementedException("deletedAlert is not implemented on connection API");
    }

    /**
     * Send request to monitor user activity
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    monitorUserActivity(subscriber, alertObject) {
        throw new UnimplementedException("monitorUserActivity is not implemented on connection API");
    }

    /**
     * Request to unsubscribe from user activity
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    unMonitorUserActivity(subscriber, alertObject) {
        throw new UnimplementedException("unMonitorUserActivity is not implemented on connection API");
    }

    /**
     * Request to monitor user
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    monitorUser(subscriber, alertObject) {
        throw new UnimplementedException("monitorUser is not implemented on connection API");
    }

    /**
     * Unsubscribe from monitoring user
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    unMonitorUser(subscriber, alertObject) {
        throw new UnimplementedException("unMonitorUser is not implemented on connection API");
    }

    /**
     * Request to retrieve a certain alert
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    getAlert(subscriber, alertObject) {
        throw new UnimplementedException("getAlert is not implemented on connection API");
    }

    /**
     * Request for adding an alert
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    addAlert(subscriber, alertObject) {
        throw new UnimplementedException("addAlert is not implemented on connection API");
    }

    /**
     * Request for editing an alert
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    editAlert(subscriber, alertObject) {
        throw new UnimplementedException("editAlert is not implemented on connection API");
    }

    /**
     * Request for deleting an alert
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    deleteAlert(subscriber, alertObject) {
        throw new UnimplementedException("deleteAlert is not implemented on connection API");
    }

    /**
     * Request for adding an user for alerts
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    addAlertsUser(subscriber, alertObject) {
        throw new UnimplementedException("addAlertsUser is not implemented on connection API");
    }

    /**
     * Request for retrieving user devices used for alerts
     * @param {CommonSubscriber} subscriber
     * @param {object} alertObject
     */
    getUserDevices(subscriber, alertObject) {
        throw new UnimplementedException("getUserDevices is not implemented on connection API");
    }
}

module.exports = UnimplementedException;
module.exports = ConnectionApiAbstract;