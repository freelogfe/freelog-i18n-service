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
        return [repository, reposInfo];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZWdpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvc2VydmljZS9ub2RlZ2l0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHdDQUF3QztBQUN4QywyQ0FBMkM7QUFDM0MsNkJBQTZCO0FBQzdCLGdDQUFnQztBQUNoQyxtQ0FBbUM7QUFDbkMsMkJBQTJCO0FBRTNCLG1DQUFnRDtBQU9oRCxJQUFhLGNBQWMsc0JBQTNCLE1BQWEsY0FBYztJQVN6QixLQUFLLENBQUMsb0JBQW9CLENBQUMsY0FBc0I7UUFDL0MsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2xDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEUsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLGNBQWMsT0FBTyxDQUFDLENBQUE7U0FDaEU7UUFDRCxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsU0FBUyxDQUFBO1FBQ2xDLE1BQU0sVUFBVSxHQUFHLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyRixPQUFPLENBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBRSxDQUFBO0lBQ2xDLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLGNBQXNCO1FBQzFDLE1BQU0sTUFBTSxHQUFpQixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUE7UUFDdkUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtR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