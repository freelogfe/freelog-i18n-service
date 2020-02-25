'use strict'
const fse = require('fs-extra')
const cloneRepository = require('./cloneRepository')
const getRepositoryInfo = require('./getRepositoryInfo')
// const path = require('path')

async function initialTrackRepositories(nodegitConfig) {
  const { I18N_BRANCH_NAME } = nodegitConfig
  const repositories = await cloneAllTrackedRepositories(nodegitConfig)
  repositories.forEach(async repos => {
    const nodegit = require('nodegit')
    if (repos instanceof nodegit.Repository) {
      await this.checkRemoteBranch(repos, I18N_BRANCH_NAME)
    }
  })
}

async function cloneAllTrackedRepositories(nodegitConfig) {
  const { trackedRepositories } = nodegitConfig
  const repositories = []
  for (const reposName of Object.keys(trackedRepositories)) {
    const repos = await cloneTrackedRepository(nodegitConfig, reposName)
    repositories.push(repos)
  }
  return repositories
}

async function cloneTrackedRepository(nodegitConfig, reposName) {
  const reposInfo = await getRepositoryInfo(nodegitConfig, reposName)
  let repository
  if (reposInfo != null) {
    const { reposDirPath, reposUrl } = reposInfo
    const nodegit = require('nodegit')
    console.log('----', reposDirPath, reposUrl)
    repository = await nodegit.Repository.open(reposDirPath).catch(e => e)
    if (repository instanceof nodegit.Repository) {
      console.log(`Repository '${reposName}' already exists!`)
    } else {
      if (fse.pathExistsSync(reposDirPath)) {
        fse.removeSync(reposDirPath)
      }
      const token = nodegitConfig.user && nodegitConfig.user.token || ''
      repository = await cloneRepository(reposUrl, reposDirPath, token)
    }
  }
  return repository
}


module.exports = initialTrackRepositories
