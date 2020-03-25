'use strict'

// method path controller
module.exports = {
  'get /v1/i18n/index': 'home.index',
  'get /v1/i18n/readPackageJson': 'home.helloPackageJson',
  'get /v1/i18n/readdir': 'home.readdir',
  'get /v1/i18n/removeRepository': 'home.removeRepository',
  'get /v1/i18n/initialTrackRepositories': 'home.initialTrackRepositories',
  'get /v1/i18n/trackedRepositories/list': 'i18nManagement.getTrackedRepositories',
  'get /v1/i18n/trackedRepository': 'i18nManagement.trackedRepository',
  'get /v1/i18n/trackedRepository/data': 'i18nManagement.getRepositoryI18nData',
  'get /v1/i18n/trackedRepository/keyInfo': 'i18nManagement.getRepositoryInfo',
  'get /v1/i18n/reTrackRepository': 'i18nManagement.reTrackRepository',
  'get /v1/i18n/getGithubUserInfo': 'i18nManagement.getGithubUserInfo',
  'get /v1/i18n/pullRepository': 'i18nManagement.pullRepository',
  'get /v1/i18n/checkRepository': 'i18nManagement.checkRepository',
  'get /v1/i18n/file/download': 'i18nManagement.downloadFile',
  'put /v1/i18n/trackedRepository/data': 'i18nManagement.updateRepositoryI18nData',
  'put /v1/i18n/trackedRepository/keyInfo': 'i18nManagement.updateKeyInfo',
  'post /v1/i18n/trackedRepository/changes/push': 'i18nManagement.commitAndPushChanges',
  'post /v1/i18n/getGithubAccessToken': 'i18nManagement.getGithubOAuthAccessToken',
  'post /v1/i18n/trackedRepository/newModule': 'i18nManagement.creaetI18nNewModule',
  'delete /v1/i18n/trackedRepository/module': 'i18nManagement.deleteI18nModule',
}
