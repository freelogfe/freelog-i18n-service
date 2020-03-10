'use strict'

async function push(repository, remote, userConfig, accessToken) {
  const nodegit = require('nodegit')
  const remoteResult = await repository.getRemote(remote)
  let refSpecs = await remoteResult.getPushRefspecs()
  const reference = await repository.getCurrentBranch()

  if (refSpecs.length === 0) {
    const refSpec = `${reference.name()}:${reference.name()}`
    nodegit.Remote.addPush(repository, 'origin', refSpec)
    refSpecs = [ refSpec ]
  }

  const result = await remoteResult.push(
    refSpecs,
    {
      callbacks: {
        credentials() {
          return nodegit.Cred.userpassPlaintextNew(userConfig.name, userConfig.password)
          // eslint-disable-next-line no-unreachable
          return nodegit.Cred.userpassPlaintextNew(accessToken, 'x-oauth-basic')
        },
      },
    }
  )
  return result
}
module.exports = push
