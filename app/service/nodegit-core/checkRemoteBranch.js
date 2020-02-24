'use strict'
const nodegit = require('nodegit')

async function checkRemoteBranch(repository, brName) {
  let reference
  try {
    reference = await repository.getReference(brName).catch(e => e)
    const isCheckoutToHead = reference instanceof Error

    if (isCheckoutToHead) {
      const targetCommit = await repository.getHeadCommit()
      reference = await repository.createBranch(brName, targetCommit, false)
      await repository.checkoutBranch(reference, {})
      const commit = await repository.getReferenceCommit('refs/remotes/origin/' + brName)
      await nodegit.Reset.reset(repository, commit, 3, {})
    } else {
      await repository.checkoutBranch(reference, {})
      console.log(`Already on '${brName}'`)
    }
  } catch (e) {
    console.log('[checkRemoteBranch error]:', e)
  }
  return reference
}
module.exports = checkRemoteBranch
