'use strict'

async function createNewBranch(repository, brName) {
  let reference
  try {
    // reference = await repository.getReference(brName)
    reference = await repository.getBranch(brName).catch(e => e)
    if (reference instanceof Error) {
      // 不存在该分支，可新建
      const commit = await repository.getMasterCommit()
      reference = await repository.createBranch(brName, commit, 0)
      console.log(`Created branch ${brName}`)
    } else {
      console.log(` A branch named '${brName}' already exists.`)
    }
    await repository.checkoutBranch(reference, {})
    console.log(`Switched to a new branch '${brName}'`)
  } catch (e) {
    console.log('[createNewBranch error]: ', e)
  }
  return reference
}
module.exports = createNewBranch
