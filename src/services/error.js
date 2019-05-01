'use strict';

exports.error = (status, res, message) => {
    if (status == 400) {
        res.status(status).send({
            status: status,
            message: 'Error 400: Bad Request. ' + message
        });
        return;
    }

    if (status == 401) {
        res.status(status).send({
            status: status,
            message: 'Error 401: Unauthorized. ' + message
        });
        return;
    }

    if (status == 403) {
        res.status(status).send({
            status: status,
            message: 'Error 403: Forbidden. ' + message
        });
        return;
    }

    if (status == 404) {
        res.status(status).send({
            status: status,
            message: 'Error 404: Not Found. ' + message
        });
        return;
    }

    if (status == 500) {
        res.status(status).send({
            status: status,
            message: 'Error 500: Internal Server Error. ' + message
        });
        return;
    }
}