'use strict'

// method path controller
module.exports = {
  'get /v1/i18n/index': 'home.index',
  'get /v1/i18n/readPackageJson': 'home.helloPackageJson',
  'get /v1/i18n/readdir': 'home.readdir',
  'get /v1/i18n/removeRepository': 'home.removeRepository',
  'get /v1/i18n/initialTrackRepositories': 'home.initialTrackRepositories',
  'get /v1/i18n/trackedRepositories/list': 'i18nManagement.getTrackedRepositories',
  'get /v1/i18n/trackedRepository/data': 'i18nManagement.getRepositoryI18nData',
  'put /v1/i18n/trackedRepository/data': 'i18nManagement.updateRepositoryI18nData',
  'post /v1/i18n/trackedRepository/changes/push': 'i18nManagement.commitAndPushChanges',
}
