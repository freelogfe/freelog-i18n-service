'use strict'
const fse = require('fs-extra')
const getRepositoryInfo = require('./getRepositoryInfo')

// 检测
async function checkRepository(targetReposName, nodegitConfig) {
  const result = { isOK: false, isCloned: false, dirs: [] }
  const reposInfo = await getRepositoryInfo(nodegitConfig, targetReposName)
  if (reposInfo != null) {
    const nodegit = require('nodegit')
    const { reposI18nPath, reposDirPath } = reposInfo
    result.isOK = fse.pathExistsSync(reposI18nPath)
    result.dirs = fse.readdirSync(reposDirPath)
    const repository = await nodegit.Repository.open(reposDirPath).catch(e => e)
    result.isCloned = repository instanceof nodegit.Repository
  }
  return result
}

module.exports = checkRepository

