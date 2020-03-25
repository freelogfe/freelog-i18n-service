// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportI18nManagement = require('../../../app/service/i18n-management');
import ExportKeysInfoMapHandler = require('../../../app/service/keysInfoMap-handler');
import ExportRepositoryStatusMap = require('../../../app/service/repositoryStatusMap');
import ExportNodegitCoreAddAndCommit = require('../../../app/service/nodegit-core/addAndCommit');
import ExportNodegitCoreCheckRemoteBranch = require('../../../app/service/nodegit-core/checkRemoteBranch');
import ExportNodegitCoreCheckRepository = require('../../../app/service/nodegit-core/checkRepository');
import ExportNodegitCoreCloneRepository = require('../../../app/service/nodegit-core/cloneRepository');
import ExportNodegitCoreCloneTrackedRepository = require('../../../app/service/nodegit-core/cloneTrackedRepository');
import ExportNodegitCoreCreateNewBranch = require('../../../app/service/nodegit-core/createNewBranch');
import ExportNodegitCoreGetChangesByStatus = require('../../../app/service/nodegit-core/getChangesByStatus');
import ExportNodegitCoreGetRepositoryInfo = require('../../../app/service/nodegit-core/getRepositoryInfo');
import ExportNodegitCoreInitialTrackRepositories = require('../../../app/service/nodegit-core/initialTrackRepositories');
import ExportNodegitCorePull = require('../../../app/service/nodegit-core/pull');
import ExportNodegitCorePush = require('../../../app/service/nodegit-core/push');
import ExportNodegitCoreReTrackRepository = require('../../../app/service/nodegit-core/reTrackRepository');
import ExportNodegitCoreSetSparseCheckout = require('../../../app/service/nodegit-core/setSparseCheckout');

declare module 'egg' {
  interface IService {
    i18nManagement: ExportI18nManagement;
    keysInfoMapHandler: ExportKeysInfoMapHandler;
    repositoryStatusMap: ExportRepositoryStatusMap;
    nodegitCore: {
      addAndCommit: ExportNodegitCoreAddAndCommit;
      checkRemoteBranch: ExportNodegitCoreCheckRemoteBranch;
      checkRepository: ExportNodegitCoreCheckRepository;
      cloneRepository: ExportNodegitCoreCloneRepository;
      cloneTrackedRepository: ExportNodegitCoreCloneTrackedRepository;
      createNewBranch: ExportNodegitCoreCreateNewBranch;
      getChangesByStatus: ExportNodegitCoreGetChangesByStatus;
      getRepositoryInfo: ExportNodegitCoreGetRepositoryInfo;
      initialTrackRepositories: ExportNodegitCoreInitialTrackRepositories;
      pull: ExportNodegitCorePull;
      push: ExportNodegitCorePush;
      reTrackRepository: ExportNodegitCoreReTrackRepository;
      setSparseCheckout: ExportNodegitCoreSetSparseCheckout;
    }
  }
}
