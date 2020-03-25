'use strict'
const fse = require('fs-extra')
const cloneRepository = require('./cloneRepository')
const getRepositoryInfo = require('./getRepositoryInfo')
const repositoryStatus = require('../repositoryStatusMap')
// const path = require('path')

async function cloneTrackedRepository(nodegitConfig, reposName) {
  if (repositoryStatus.get(reposName, 'cloneStatus') === 0) {
    console.log(`Repository '${reposName}' is cloning!`)
    return null
  }
  const reposInfo = await getRepositoryInfo(nodegitConfig, reposName)
  let repository
  if (reposInfo != null) {
    const { reposDirPath } = reposInfo
    const nodegit = require('nodegit')
    repository = await nodegit.Repository.open(reposDirPath).catch(e => e)
    if (repository instanceof nodegit.Repository) {
      console.log(`Repository '${reposName}' already exists!`)
    } else {
      if (fse.pathExistsSync(reposDirPath)) {
        fse.removeSync(reposDirPath)
      }
      repository = await cloneRepository(reposInfo, nodegitConfig.user)
    }
  }
  return repository
}


module.exports = cloneTrackedRepository

