"use strict";

class SampleError extends Error {

    constructor (message, status) {
        super();
        this._message = message;
        this._status = status;
    }

    set status (status) {
        this._status = status;
    }

    get status () {
        return this._status;
    }

    set message (message) {
        this._message = message;
    }

    get message () {
        return this._message;
    }
}

module.exports = SampleError;