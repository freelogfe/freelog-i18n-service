'use strict'
const nodegit = require('nodegit')
const ora = require('ora')
const fse = require('fs-extra')

const cloneStatus = {}
async function openRepository(repositoryInfo, token) {
  const { reposUrl, reposDirPath } = repositoryInfo
  const exists = await fse.pathExistsSync(reposDirPath)

  let repository = null
  if (!exists) {
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
  } else {
    repository = await nodegit.Repository.open(reposDirPath)
  }

  return repository
}
module.exports = openRepository
