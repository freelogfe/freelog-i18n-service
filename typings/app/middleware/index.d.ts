// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandler = require('../../../app/middleware/error-handler');
import ExportHttpProxy = require('../../../app/middleware/http-proxy');

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    httpProxy: typeof ExportHttpProxy;
  }
}
