'use strict'
const ora = require('ora')
const path = require('path')
const cwd = process.cwd()

const cloneStatus = {}
async function cloneRepository(reposUrl, reposDirPath, token) {
  const nodegit = require(path.resolve(cwd, 'nodegit/dist/nodegit.js'))
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
              return nodegit.Cred.userpassPlaintextNew(token, 'x-oauth-basic')
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
      console.log('[error]: ', e)
    }
  } else {
    console.log(`cloning '${reposUrl}'...`)
  }
  return repository
}

module.exports = cloneRepository
