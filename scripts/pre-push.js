'use strict'

const { execSync } = require('child_process')
const CWD = process.cwd()

function getGitBranchName() {
  const name = execSync('git branch | grep \'*\' | sed \'s/* //\'', {
    cwd: CWD,
  }).toString()
  return name.trim()
}


function main() {
  const br = getGitBranchName()
  if (br === 'master') {
    execSync('npm run ci', {
      cwd: CWD,
      env: process.env,
      stdio: 'inherit',
    })
  }
}

main()
