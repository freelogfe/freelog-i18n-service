'use strict'
const checkRemoteBranch = require('./checkRemoteBranch')
const cloneTrackedRepository = require('./cloneTrackedRepository')
// const path = require('path')

async function initialTrackRepositories(nodegitConfig) {
  console.log('[Track Repositories]: init!')
  const nodegit = require('nodegit')
  const { I18N_BRANCH_NAME } = nodegitConfig
  const repositories = await cloneAllTrackedRepositories(nodegitConfig)
  repositories.forEach(async repos => {
    if (repos instanceof nodegit.Repository) {
      await checkRemoteBranch(repos, I18N_BRANCH_NAME)
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

module.exports = initialTrackRepositories
