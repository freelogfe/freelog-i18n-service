'use strict'
const fse = require('fs-extra')
const path = require('path')

async function setSparseCheckout(reposDirName, i18nDirPath, repository) {
  const config = await repository.config()
  await config.setBool('core.sparseCheckout', 1)
  const CWD = process.cwd()
  const sparseCoFilePath = path.resolve(CWD, reposDirName, '.git/info/sparse-checkout')
  fse.ensureFileSync(sparseCoFilePath)
  fse.writeFileSync(sparseCoFilePath, i18nDirPath)
}
module.exports = setSparseCheckout
