// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportNodegitCoreCheckRemoteBranch = require('../../../app/service/nodegit-core/checkRemoteBranch');
import ExportNodegitCoreCloneRepository = require('../../../app/service/nodegit-core/cloneRepository');
import ExportNodegitCoreGetChangesByStatus = require('../../../app/service/nodegit-core/getChangesByStatus');
import ExportNodegitCoreGetRepositoryInfo = require('../../../app/service/nodegit-core/getRepositoryInfo');
import ExportNodegitCoreInitialTrackRepositories = require('../../../app/service/nodegit-core/initialTrackRepositories');

declare module 'egg' {
  interface IService {
    nodegitCore: {
      checkRemoteBranch: ExportNodegitCoreCheckRemoteBranch;
      cloneRepository: ExportNodegitCoreCloneRepository;
      getChangesByStatus: ExportNodegitCoreGetChangesByStatus;
      getRepositoryInfo: ExportNodegitCoreGetRepositoryInfo;
      initialTrackRepositories: ExportNodegitCoreInitialTrackRepositories;
    }
  }
}
