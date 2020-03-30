"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NodegitService_1;
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
const path = require("path");
const fse = require("fs-extra");
const nodegit = require("nodegit");
const ora = require("ora");
const midway_1 = require("midway");
let NodegitService = NodegitService_1 = class NodegitService {
    async openRepositoryByName(repositoryName) {
        const nodegit = require('nodegit');
        const reposInfo = this.riService.getRepositoryInfo(repositoryName);
        if (reposInfo === null) {
            throw new Error(`参数repositoryName有误：仓库（${repositoryName}）未备追踪`);
        }
        const { reposDirPath } = reposInfo;
        const repository = await nodegit.Repository.open(reposDirPath).catch((e) => e);
        return repository;
    }
    async checkRepository(repositoryName) {
        const result = { isOK: false, isCloned: false, dirs: [] };
        const reposInfo = this.riService.getRepositoryInfo(repositoryName);
        if (reposInfo != null) {
            const nodegit = require('nodegit');
            const { reposI18nPath, reposDirPath } = reposInfo;
            result.isOK = fse.pathExistsSync(reposI18nPath);
            result.dirs = fse.readdirSync(reposDirPath);
            const repository = await nodegit.Repository.open(reposDirPath).catch((e) => e);
            result.isCloned = repository instanceof nodegit.Repository;
        }
        return result;
    }
    async cloneRepository(reposInfo, userConfig) {
        const { reposDirPath, reposUrl } = reposInfo;
        const nodegit = require('nodegit');
        let repository = null;
        const spinner = ora(`clone into '${reposUrl}'...`);
        spinner.start();
        if (NodegitService_1.cloneStatus[reposUrl] !== true) {
            try {
                NodegitService_1.cloneStatus[reposUrl] = true;
                repository = await nodegit.Clone(reposUrl, reposDirPath, {
                    fetchOpts: {
                        callbacks: {
                            credentials() {
                                // return nodegit.Cred.userpassPlaintextNew(userConfig.token, 'x-oauth-basic')
                                return nodegit.Cred.userpassPlaintextNew(userConfig.name, userConfig.password);
                            },
                            certificateCheck() {
                                return 0;
                            },
                        },
                    },
                });
                spinner.succeed();
            }
            catch (e) {
                NodegitService_1.cloneStatus[reposUrl] = false;
                spinner.fail(e.toString());
                console.log('[Clone Repository error]: ', e);
            }
        }
        else {
            console.log(`cloning '${reposUrl}'...`);
        }
        return repository;
    }
    async createNewBranch(repository, brName) {
        let reference;
        try {
            // reference = await repository.getReference(brName)
            reference = await repository.getBranch(brName).catch((e) => e);
            if (reference instanceof Error) {
                // 不存在该分支，可新建
                const commit = await repository.getMasterCommit();
                reference = await repository.createBranch(brName, commit, false);
                console.log(`Created branch ${brName}`);
            }
            else {
                console.log(` A branch named '${brName}' already exists.`);
            }
            await repository.checkoutBranch(reference, {});
            console.log(`Switched to a new branch '${brName}'`);
        }
        catch (e) {
            reference = null;
            console.log('[createNewBranch error]: ', e);
        }
        return reference;
    }
    async checkRemoteBranch(repository, brName) {
        let reference;
        try {
            reference = await repository.getReference(brName).catch((e) => e);
            if (reference instanceof Error) {
                const targetCommit = await repository.getHeadCommit();
                reference = await repository.createBranch(brName, targetCommit, false);
                await repository.checkoutBranch(reference, {});
                const commit = await repository.getReferenceCommit('refs/remotes/origin/' + brName);
                await nodegit.Reset.reset(repository, commit, 3, {});
            }
            else {
                if (reference != null) {
                    await repository.checkoutBranch(reference, {});
                    console.log(`Already on '${brName}'`);
                }
            }
        }
        catch (e) {
            reference = null;
            console.log('[checkRemoteBranch error]:', e);
        }
        return reference;
    }
    async getChangesByStatus(repository) {
        const statuses = await repository.getStatus();
        const changes = [];
        statuses.forEach((status) => {
            const path = status.path();
            if (status.isNew()) {
                changes.push({ type: 'added', path });
            }
            if (status.isModified()) {
                changes.push({ type: 'modified', path });
            }
            if (status.isDeleted()) {
                changes.push({ type: 'deleted', path });
            }
            if (status.isTypechange()) {
                changes.push({ type: 'typechange', path });
            }
            if (status.isRenamed()) {
                changes.push({ type: 'renamed', path });
            }
        });
        return changes;
    }
    async addAndCommit(repository, userName, userEmail, commitMsg) {
        const changes = await this.getChangesByStatus(repository);
        if (changes.length === 0) {
            console.log('nothing to commit, working tree clean');
            return '';
        }
        else {
            const signature = nodegit.Signature.now(userName, userEmail);
            const commitId = await this.commitAllFiles(repository, changes, signature, commitMsg);
            console.log('[i18n success]: commitId - ', commitId);
            return commitId;
        }
    }
    async commitAllFiles(repository, changes, signature, commitMsg) {
        const indexResult = await repository.refreshIndex();
        const oidResult = await indexResult.addAll().then(() => indexResult.write()).then(() => indexResult.writeTree());
        const head = await nodegit.Reference.nameToId(repository, 'HEAD');
        const parent = await repository.getCommit(head);
        commitMsg = commitMsg || `[nodegit i18n] commit ${changes.length} changes.`;
        const oid = await repository.createCommit('HEAD', signature, signature, commitMsg, oidResult, [parent]);
        return oid.tostrS();
    }
    async pull(repository, branch) {
        const { i18nRemote } = this.nodegitConfig;
        const nodegit = require('nodegit');
        try {
            await repository.fetchAll({
                callbacks: {
                    credentials(url, userName) {
                        return nodegit.Cred.sshKeyFromAgent(userName);
                    },
                    certificateCheck() {
                        return 0;
                    },
                },
            });
            await repository.mergeBranches(`${branch}`, `${i18nRemote}/${branch}`);
        }
        catch (e) {
            console.log('[Pull failed]', e);
            throw new Error(e);
        }
    }
    async push(repository, remote, nodegitUser, accessToken) {
        const remoteResult = await repository.getRemote(remote);
        let refSpecs = await remoteResult.getPushRefspecs();
        const reference = await repository.getCurrentBranch();
        if (refSpecs.length === 0) {
            const refSpec = `${reference.name()}:${reference.name()}`;
            nodegit.Remote.addPush(repository, 'origin', refSpec);
            refSpecs = [refSpec];
        }
        await remoteResult.push(refSpecs, {
            callbacks: {
                credentials() {
                    return nodegit.Cred.userpassPlaintextNew(nodegitUser.name, nodegitUser.password);
                    // eslint-disable-next-line no-unreachable
                    return nodegit.Cred.userpassPlaintextNew(accessToken, 'x-oauth-basic');
                },
            },
        });
    }
    async setSparseCheckout(reposDirName, i18nDirPath, repository) {
        const config = await repository.config();
        await config.setBool('core.sparseCheckout', 1);
        const CWD = process.cwd();
        const sparseCoFilePath = path.resolve(CWD, reposDirName, '.git/info/sparse-checkout');
        fse.ensureFileSync(sparseCoFilePath);
        fse.writeFileSync(sparseCoFilePath, i18nDirPath);
    }
};
NodegitService.cloneStatus = {};
__decorate([
    midway_1.config('nodegit'),
    __metadata("design:type", Object)
], NodegitService.prototype, "nodegitConfig", void 0);
__decorate([
    midway_1.inject('repositoryInfoService'),
    __metadata("design:type", Object)
], NodegitService.prototype, "riService", void 0);
NodegitService = NodegitService_1 = __decorate([
    midway_1.provide('nodegitService')
], NodegitService);
exports.NodegitService = NodegitService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZWdpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvc2VydmljZS9ub2RlZ2l0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHdDQUF3QztBQUN4QywyQ0FBMkM7QUFDM0MsNkJBQTZCO0FBQzdCLGdDQUFnQztBQUNoQyxtQ0FBbUM7QUFDbkMsMkJBQTJCO0FBRTNCLG1DQUFnRDtBQU9oRCxJQUFhLGNBQWMsc0JBQTNCLE1BQWEsY0FBYztJQVN6QixLQUFLLENBQUMsb0JBQW9CLENBQUMsY0FBc0I7UUFDL0MsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2xDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEUsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLGNBQWMsT0FBTyxDQUFDLENBQUE7U0FDaEU7UUFDRCxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsU0FBUyxDQUFBO1FBQ2xDLE1BQU0sVUFBVSxHQUFHLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyRixPQUFPLFVBQVUsQ0FBQTtJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxjQUFzQjtRQUMxQyxNQUFNLE1BQU0sR0FBaUIsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFBO1FBQ3ZFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEUsSUFBSSxTQUFTLElBQUks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