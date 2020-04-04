// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
import path = require('path')
import fse = require('fs-extra')
import nodegit = require('nodegit')
import ora = require('ora')

import { provide, config, inject } from 'midway'
import { Repository, Remote, Reference, Signature, Commit } from 'nodegit'
import { PlainObject, INodegitUser, INodegitConfig } from '../../interface/index'
import { INodegitService, ICheckResult, IRepositoryChanges, IRepository, IReference } from '../../interface/nodegit'
import { IRepositoryInfoService, IRepositoryInfo, IRepositoryInfoResult } from '../../interface/repositoryInfo'

@provide('nodegitService')
export class NodegitService implements INodegitService {
  static cloneStatus: PlainObject = {}

  @config('nodegit')
  nodegitConfig: INodegitConfig

  @inject('repositoryInfoService')
  riService: IRepositoryInfoService

  async openRepositoryByName(repositoryName: string): Promise<[ IRepository, IRepositoryInfoResult ]> {
    const nodegit = require('nodegit')
    const reposInfo = this.riService.getRepositoryInfo(repositoryName)
    if (reposInfo === null) {
      throw new Error(`参数repositoryName有误：仓库（${repositoryName}）未备追踪`)
    }
    const { reposDirPath } = reposInfo
    const repository = await nodegit.Repository.open(reposDirPath).catch((e: Error) => e)
    return [ repository, reposInfo ]
  }

  async checkRepository(repositoryName: string): Promise<ICheckResult> {
    const result: ICheckResult = { isOK: false, isCloned: false, dirs: [] }
    const reposInfo = this.riService.getRepositoryInfo(repositoryName)
    if (reposInfo != null) {
      const nodegit = require('nodegit')
      const { reposI18nPath, reposDirPath } = reposInfo
      result.isOK = fse.pathExistsSync(reposI18nPath)
      result.dirs = fse.readdirSync(reposDirPath)
      const repository = await nodegit.Repository.open(reposDirPath).catch((e: any) => e)
      result.isCloned = repository instanceof nodegit.Repository
    }
    return result
  }

  async cloneRepository(reposInfo: IRepositoryInfo, userConfig: INodegitUser): Promise<IRepository> {
    const { reposDirPath, reposUrl } = reposInfo
    const nodegit = require('nodegit')
    let repository: IRepository = null
    const spinner = ora(`clone into '${reposUrl}'...`)
    spinner.start()
    if (NodegitService.cloneStatus[reposUrl] !== true) {
      try {
        NodegitService.cloneStatus[reposUrl] = true
        repository = await nodegit.Clone(reposUrl, reposDirPath, {
          fetchOpts: {
            callbacks: {
              credentials() {
                // return nodegit.Cred.userpassPlaintextNew(userConfig.token, 'x-oauth-basic')
                return nodegit.Cred.userpassPlaintextNew(userConfig.name, userConfig.password)
              },
              certificateCheck() {
                return 0
              },
            },
          },
        })
        spinner.succeed()
      } catch (e) {
        NodegitService.cloneStatus[reposUrl] = false
        spinner.fail(e.toString())
        console.log('[Clone Repository error]: ', e)
      }
    } else {
      console.log(`cloning '${reposUrl}'...`)
    }
    return repository
  }

  async createNewBranch(repository: Repository, brName: string): Promise<IReference> {
    let reference: IReference
    try {
      // reference = await repository.getReference(brName)
      reference = await repository.getBranch(brName).catch((e: Error) => e)
      if (reference instanceof Error) {
        // 不存在该分支，可新建
        const commit = await repository.getMasterCommit()
        reference = await repository.createBranch(brName, commit, false)
        console.log(`Created branch ${brName}`)
      } else {
        console.log(` A branch named '${brName}' already exists.`)
      }
      await repository.checkoutBranch(reference, {})
      console.log(`Switched to a new branch '${brName}'`)
    } catch (e) {
      reference = null
      console.log('[createNewBranch error]: ', e)
    }
    return reference
  }

  async checkRemoteBranch(repository: Repository, brName: string): Promise<IReference> {
    let reference: IReference
    try {
      reference = await repository.getReference(brName).catch((e: Error) => e)

      if (reference instanceof Error) {
        const targetCommit: Commit = await repository.getHeadCommit()
        reference = await repository.createBranch(brName, targetCommit, false)
        await repository.checkoutBranch(reference, {})
        const commit: Commit = await repository.getReferenceCommit('refs/remotes/origin/' + brName)
        await nodegit.Reset.reset(repository, commit, 3, {})
      } else {
        if (reference != null) {
          await repository.checkoutBranch(reference, {})
          console.log(`Already on '${brName}'`)
        }
      }
    } catch (e) {
      reference = null
      console.log('[checkRemoteBranch error]:', e)
    }
    return reference
  }

  async getChangesByStatus(repository: Repository): Promise<IRepositoryChanges> {
    const statuses = await repository.getStatus()
    const changes: IRepositoryChanges = []
    statuses.forEach((status: any) => {
      const path = status.path()
      if (status.isNew()) {
        changes.push({ type: 'added', path })
      }
      if (status.isModified()) {
        changes.push({ type: 'modified', path })
      }
      if (status.isDeleted()) {
        changes.push({ type: 'deleted', path })
      }
      if (status.isTypechange()) {
        changes.push({ type: 'typechange', path })
      }
      if (status.isRenamed()) {
        changes.push({ type: 'renamed', path })
      }
    })
    return changes
  }

  async addAndCommit(repository: Repository, userName: string, userEmail: string, commitMsg: string): Promise<string> {
    const changes = await this.getChangesByStatus(repository)
    if (changes.length === 0) {
      console.log('nothing to commit, working tree clean')
      return ''
    } else {
      const signature: Signature = nodegit.Signature.now(userName, userEmail)
      const commitId: string = await this.commitAllFiles(repository, changes, signature, commitMsg)
      console.log('[i18n success]: commitId - ', commitId)
      return commitId
    }
  }

  async commitAllFiles(repository: Repository, changes: IRepositoryChanges, signature: Signature, commitMsg: string): Promise<string> {
    const indexResult = await repository.refreshIndex()
    const oidResult = await indexResult.addAll().then(() => indexResult.write()).then(() => indexResult.writeTree())
    const head = await nodegit.Reference.nameToId(repository, 'HEAD')
    const parent = await repository.getCommit(head)
    commitMsg = commitMsg || `[nodegit i18n] commit ${changes.length} changes.`
    const oid = await repository.createCommit('HEAD', signature, signature, commitMsg, oidResult, [ parent ])
    return oid.tostrS()
  }

  async pull(repository: Repository, branch: string): Promise<void> {
    const { i18nRemote } = this.nodegitConfig
    const nodegit = require('nodegit')
    try {
      await repository.fetchAll({
        callbacks: {
          credentials(url: string, userName: string) {
            return nodegit.Cred.sshKeyFromAgent(userName)
          },
          certificateCheck() {
            return 0
          },
        },
      })
      await repository.mergeBranches(`${branch}`, `${i18nRemote}/${branch}`)
    } catch (e) {
      console.log('[Pull failed]', e)
      throw new Error(e)
    }
  }

  async push(repository: Repository, remote: string, nodegitUser: INodegitUser, accessToken: string): Promise<void> {
    const remoteResult: Remote = await repository.getRemote(remote)
    let refSpecs = await remoteResult.getPushRefspecs()
    const reference: Reference = await repository.getCurrentBranch()

    if (refSpecs.length === 0) {
      const refSpec = `${reference.name()}:${reference.name()}`
      nodegit.Remote.addPush(repository, 'origin', refSpec)
      refSpecs = [ refSpec ]
    }

    await remoteResult.push(
      refSpecs,
      {
        callbacks: {
          credentials() {
            return nodegit.Cred.userpassPlaintextNew(nodegitUser.name, nodegitUser.password)
            // eslint-disable-next-line no-unreachable
            return nodegit.Cred.userpassPlaintextNew(accessToken, 'x-oauth-basic')
          },
        },
      }
    )
  }

  async setSparseCheckout(reposDirName: string, i18nDirPath: string, repository: any): Promise<void> {
    const config = await repository.config()
    await config.setBool('core.sparseCheckout', 1)
    const CWD = process.cwd()
    const sparseCoFilePath = path.resolve(CWD, reposDirName, '.git/info/sparse-checkout')
    fse.ensureFileSync(sparseCoFilePath)
    fse.writeFileSync(sparseCoFilePath, i18nDirPath)
  }
}
