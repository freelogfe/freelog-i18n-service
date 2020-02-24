'use strict'
const nodegit = require('nodegit')
const getChangesByStatus = require('./getChangesByStatus')

async function addAndCommit(repository, userName, userEmail, commitMsg) {
  const changes = await getChangesByStatus(repository)
  let commitId
  if (changes.size === 0) {
    console.log('nothing to commit, working tree clean')
  } else {
    const signature = nodegit.Signature.now(userName, userEmail)
    commitId = await commitAllFiles(repository, changes, signature, commitMsg)
    console.log('[i18n nodeigt]: commitId - ', commitId)
    // const errorCode = await push(repository)

    // if (errorCode == null) {
    //   console.log(`[nodegit i18n] push success! ${commitId}`)
    // }
  }
  return commitId
}

async function commitAllFiles(repository, changes, signature, commitMsg) {
  const indexResult = await repository.refreshIndex()
  const oidResult = await indexResult.addAll().then(() => indexResult.write()).then(() => indexResult.writeTree())
  const head = await nodegit.Reference.nameToId(repository, 'HEAD')
  const parent = await repository.getCommit(head)
  commitMsg = commitMsg || `[nodegit i18n] commit ${changes.size} changes.`
  // console.log(commitMsg, [ ...changes ])
  const oid = await repository.createCommit('HEAD', signature, signature, commitMsg, oidResult, [ parent ])
  return oid.tostrS()
}

module.exports = addAndCommit
exports.commitAllFiles = commitAllFiles
