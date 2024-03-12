class CommonSubscriber {
    /**
     * Subscriber for connection instance
     * @param {function} success
     * @param {function} error
     */
    constructor(success, error) {
        this.onSuccess = success;
        this.onError = error;
        // Forwarding update to success by passing an array containing one element
        this.onUpdate = (data) => {
            success([data]);
        };
    }

    /**
     * Set identifier on current instance
     * @param id
     */
    setId(id) {
        this.id = id;
    }

    /**
     * Returns current subscriber's id
     * @returns {*}
     */
    getId() {
        return this.id;
    }
}

module.exports = CommonSubscriber;