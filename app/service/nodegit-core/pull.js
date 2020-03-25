'use strict'

async function pull(repository, nodegitConfig) {
  const { REMOTE_ORIGIN, I18N_BRANCH_NAME } = nodegitConfig
  const nodegit = require('nodegit')
  try {
    await repository.fetchAll({
      callbacks: {
        credentials(url, userName) {
          return nodegit.Cred.sshKeyFromAgent(userName)
        },
        certificateCheck() {
          return 0
        },
      },
    })
    await repository.mergeBranches(`${I18N_BRANCH_NAME}`, `${REMOTE_ORIGIN}/${I18N_BRANCH_NAME}`)
  } catch (e) {
    console.log('[Pull failed]', e)
    throw new Error(e)
  }
}

module.exports = pull
