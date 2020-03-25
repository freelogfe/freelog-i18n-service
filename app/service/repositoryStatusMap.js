'use strict'
const fse = require('fs-extra')
const objectPath = require('object-path')
const path = require('path')
const reposMapPath = path.resolve(__dirname, '../../repositories-status-map.json')

module.exports = {
  get(repositoryName, statusKey) {
    const data = fse.readJSONSync(reposMapPath)
    return objectPath.get(data, [ repositoryName, statusKey ])
  },
  set(repositoryName, statusKey, value) {
    const data = fse.readJSONSync(reposMapPath)
    objectPath.set(data, [ repositoryName, statusKey ], value)
    fse.writeJSONSync(reposMapPath, data, { spaces: '\t' })
  },
  saveChanges(repositoryName, changes) {
    const keys = [ repositoryName, 'changes' ]
    const data = fse.readJSONSync(reposMapPath)
    const tmpChanges = objectPath.get(data, keys) || []
    const temPaths = tmpChanges.map(item => item.path)
    for (const change of changes) {
      if (temPaths.indexOf(change.path) === -1) {
        tmpChanges.unshift(change)
      }
    }
    objectPath.set(data, keys, tmpChanges)
    fse.writeJSONSync(reposMapPath, data, { spaces: '\t' })
    return tmpChanges
  },
  clearChanges(repositoryName) {
    const data = fse.readJSONSync(reposMapPath)
    objectPath.set(data, [ repositoryName, 'changes' ], [])
    fse.writeJSONSync(reposMapPath, data, { spaces: '\t' })
    return []
  },
}
