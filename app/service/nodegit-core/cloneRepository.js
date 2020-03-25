'use strict'
const ora = require('ora')
// const path = require('path')

const cloneStatus = {}
async function cloneRepository(reposInfo, userConfig) {
  const { reposDirPath, reposUrl } = reposInfo
  const nodegit = require('nodegit')
  let repository
  const spinner = ora(`clone into '${reposUrl}'...`)
  spinner.start()
  if (cloneStatus[reposUrl] !== true) {
    try {
      cloneStatus[reposUrl] = true
      repository = await nodegit.Clone(reposUrl, reposDirPath, {
        fetchOpts: {
          callbacks: {
            credentials() {
              // return nodegit.Cred.userpassPlaintextNew(userConfig.token, 'x-oauth-basic')
              return nodegit.Cred.userpassPlaintextNew(userConfig.name, userConfig.password)
            },
            certificateCheck() {
              return 0
            },
          },
        },
      })
      spinner.succeed()
    } catch (e) {
      cloneStatus[reposUrl] = false
      spinner.fail(e.toString())
      console.log('[Clone Repository error]: ', e)
    }
  } else {
    console.log(`cloning '${reposUrl}'...`)
  }
  return repository
}

module.exports = cloneRepository
