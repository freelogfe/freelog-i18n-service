// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportI18nManagement = require('../../../app/service/i18n-management');
import ExportNodegitCoreAddAndCommit = require('../../../app/service/nodegit-core/addAndCommit');
import ExportNodegitCoreCheckRemoteBranch = require('../../../app/service/nodegit-core/checkRemoteBranch');
import ExportNodegitCoreCloneRepository = require('../../../app/service/nodegit-core/cloneRepository');
import ExportNodegitCoreCreateNewBranch = require('../../../app/service/nodegit-core/createNewBranch');
import ExportNodegitCoreGetChangesByStatus = require('../../../app/service/nodegit-core/getChangesByStatus');
import ExportNodegitCoreGetRepositoryInfo = require('../../../app/service/nodegit-core/getRepositoryInfo');
import ExportNodegitCoreInitialTrackRepositories = require('../../../app/service/nodegit-core/initialTrackRepositories');
import ExportNodegitCoreOpen = require('../../../app/service/nodegit-core/open');
import ExportNodegitCorePush = require('../../../app/service/nodegit-core/push');
import ExportNodegitCoreSetSparseCheckout = require('../../../app/service/nodegit-core/setSparseCheckout');

declare module 'egg' {
  interface IService {
    i18nManagement: ExportI18nManagement;
    nodegitCore: {
      addAndCommit: ExportNodegitCoreAddAndCommit;
      checkRemoteBranch: ExportNodegitCoreCheckRemoteBranch;
      cloneRepository: ExportNodegitCoreCloneRepository;
      createNewBranch: ExportNodegitCoreCreateNewBranch;
      getChangesByStatus: ExportNodegitCoreGetChangesByStatus;
      getRepositoryInfo: ExportNodegitCoreGetRepositoryInfo;
      initialTrackRepositories: ExportNodegitCoreInitialTrackRepositories;
      open: ExportNodegitCoreOpen;
      push: ExportNodegitCorePush;
      setSparseCheckout: ExportNodegitCoreSetSparseCheckout;
    }
  }
}
