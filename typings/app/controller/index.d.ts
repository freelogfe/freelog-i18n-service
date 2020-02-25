// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportI18nManagement = require('../../../app/controller/i18n-management');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    i18nManagement: ExportI18nManagement;
  }
}
