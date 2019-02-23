'use strict';

const SampleError = require('../sample.error');

exports.handleError = (e, res) => {

    if (e instanceof SampleError) {
        res.status(e.status).send({
            message: e.message
        });
    } else {
        res.status(500).send({
            // message: 'Erro interno, não foi possível processar a requisição'
            message: e.message
        });
    }
}