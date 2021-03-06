'use strict'
const path = require('path')
async function getRepositoryInfo(nodegitConfig, repositoryName) {
  const { trackedRepositories, i18nRepositoriesDirPath, I18N_BRANCH_NAME } = nodegitConfig
  for (const reposName in trackedRepositories) {
    const { reposUrl, reposI18nPath } = trackedRepositories[reposName]
    if (reposName === repositoryName) {
      const reposDirPath = path.resolve(process.cwd(), i18nRepositoriesDirPath, reposName)
      return {
        reposName,
        reposUrl,
        reposDirPath,
        reposI18nPath: path.join(reposDirPath, reposI18nPath),
        reposI18nBranch: I18N_BRANCH_NAME,
      }
    }
  }
  return null
}

module.exports = getRepositoryInfo
