'use strict';
const boom = require('boom');
const Logger = use('Logger');
exports.controller = (
    BusinessRulesInstance,
    method,
    {request, auth, response},
) =>
  new BusinessRulesInstance()[method](request, response, auth)
      .then((result) => {
        if (result && result.json) {
          response.status(result.statusCode).send(result.json);
        } else {
          response.noContent();
        }
      })
      .catch((err) => {
        if (err.statusCode) {
          response
              .status(err.statusCode)
              .send(boom.badRequest(JSON.stringify(err)));
        } else {
          Logger.error('ERROR: ', JSON.stringify(err));
          response.status(500).send(boom.internal(JSON.stringify(err)));
        }
      });
