'use strict';

const Router = require('lambda-lambda-lambda');
const config = require('./config.json');

const accessControlHeaders    = require('./middleware/AccessControlHeaders');
const appConfigPlugin         = require('./middleware/AppConfigPlugin');
const cloudFrontCacheHeader   = require('./middleware/CloudFrontCacheHeader');
const preflightOptionsHandler = require('./middleware/PreflightOptionsHandler');

/**
 * @see AWS::Serverless::Function
 */
exports.handler = (event, context, callback) => {
  const {request, response} = event.Records[0].cf;

  const router = new Router(request, response);
  router.setPrefix(config.router.prefix);

  // Middleware (order is important).
  router.use(function(req, res, next) {
    if (req.method() === 'CONNECT') {
      res.status(405).send();
    } else {
      next();
    }
  });

  router.use(appConfigPlugin(config));
  router.use(accessControlHeaders);
  router.use(preflightOptionsHandler);
  router.use(cloudFrontCacheHeader);

  // Send root response.
  router.get('/', function(req, res) {
    res.status(501).send();
  });

  // .. everything else.
  router.default(function(req, res) {
    res.status(404).send();
  });

  callback(null, router.response());
};
