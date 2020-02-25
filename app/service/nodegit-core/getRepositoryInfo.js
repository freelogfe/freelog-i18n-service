'use strict'
const path = require('path')
function getRepositoryInfo(nodegitConfig, repositoryName) {
  const { trackedRepositories, i18nRepositoriesDirPath } = nodegitConfig
  const CWD = process.cwd()
  for (const reposName in trackedRepositories) {
    const { reposUrl, reposI18nPath } = trackedRepositories[reposName]
    if (reposName === repositoryName) {
      const reposDirPath = path.resolve(CWD, i18nRepositoriesDirPath, reposName)
      return {
        reposName,
        reposUrl,
        reposDirPath,
        reposI18nPath: path.join(reposDirPath, reposI18nPath),
      }
    }
  }
  return null
}


module.exports = getRepositoryInfo
