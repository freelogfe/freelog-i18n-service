'use strict'

async function getChangesByStatus(repository) {
  const statuses = await repository.getStatus()
  const changes = new Set()
  statuses.forEach(status => {
    const path = status.path()
    if (status.isNew()) {
      changes.add({ type: 'added', path })
    }
    if (status.isModified()) {
      changes.add({ type: 'modified', path })
    }
    if (status.isDeleted()) {
      changes.add({ type: 'deleted', path })
    }
    if (status.isTypechange()) {
      changes.add({ type: 'typechange', path })
    }
    if (status.isRenamed()) {
      changes.add({ type: 'renamed', path })
    }
  })
  return changes
}

module.exports = getChangesByStatus
