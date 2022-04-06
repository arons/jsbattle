const ExtendedDbService = require("../../lib/ExtendedDbService.js");
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const getEntityConfig = require("../../lib/getEntityConfig.js");
const validators = require("../../validators");

module.exports = (config) => {
  let adapterConfig = getDbAdapterConfig(config.data, 'league');
  let entity = getEntityConfig('League');

  return {
    ...adapterConfig,
    name: "league",
    mixins: [ExtendedDbService],
    settings: {
      ...entity,
      obfuscate: config.league.obfuscate,
      cutOffFightCount: config.league.cutOffFightCount,
      cutOffWinRatio: config.league.cutOffWinRatio
    },

    actions: {
      pickRandomOpponents: require('./actions/pickRandomOpponents.js'),
      seedLeague: require('./actions/seedLeague.js'),
      getUserSubmission: require('./actions/getUserSubmission.js'),
      getHistory: require('./actions/getHistory.js'),
      leaveLeague: require('./actions/leaveLeague.js'),
      getLeagueSummary: require('./actions/getLeagueSummary.js'),
      getUserRankTable: require('./actions/getUserRankTable.js'),
      getScript: {
        params: {
          id: validators.entityId()
        },
        handler: require('./actions/getScript.js')
      },
      joinLeague: {
        scriptId: validators.entityId(),
        handler: require('./actions/joinLeague.js')
      },
      updateRank: {
        params: {
          id: validators.entityId(),
          winner: { type: "boolean" }
        },
        handler: require('./actions/updateRank.js')
      },
      failBattle: {
        params: {
          id: validators.entityId()
        },
        handler: require('./actions/failBattle.js')
      },
      listRankTable: {
        params: {
          page: {type: "number", positive: true, min: 1, optional: true, convert: true},
          pageSize: {type: "number", positive: true, min: 1, max: 50, optional: true, convert: true}
        },
        handler: require('./actions/listRankTable.js')
      },
    },
    hooks: {
      before: {
        create: [require('./hooks/create.js')]
      }
    },
    events: {
      "app.seed": require('./events/onAppSeed.js')
    },
    started: require('./events/onStart.js')
  };
};
