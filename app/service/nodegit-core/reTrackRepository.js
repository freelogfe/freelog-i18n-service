'use strict'
const fse = require('fs-extra')
const getRepositoryInfo = require('./getRepositoryInfo')
const checkRemoteBranch = require('./checkRemoteBranch')
const cloneTrackedRepository = require('./cloneTrackedRepository')
const repositoryStatus = require('../repositoryStatusMap')

// 重新追踪项目：删除项目代码，重新clone
async function reTrackRepository(targetReposName, nodegitConfig) {
  if (repositoryStatus.get(targetReposName, 'cloneStatus') === 0) {
    console.log(`Repository '${targetReposName}' is cloning!`)
    return
  }
  const nodegit = require('nodegit')
  const { I18N_BRANCH_NAME } = nodegitConfig
  const reposInfo = await getRepositoryInfo(nodegitConfig, targetReposName)
  if (reposInfo != null) {
    console.log(`删除仓库${reposInfo.reposName}`)
    fse.removeSync(reposInfo.reposDirPath)
    console.log(`重新克隆${reposInfo.reposName}`)
    const repository = await cloneTrackedRepository(nodegitConfig, targetReposName)
    if (repository instanceof nodegit.Repository) {
      await checkRemoteBranch(repository, I18N_BRANCH_NAME)
    }
  }
}

module.exports = reTrackRepository

