const { Service, createService } = require('mostly-feathers-mongoose');
const fp = require('mostly-func');

const GameModel = require('../../models/game.model');
const defaultHooks = require('./game.hooks');

const defaultOptions = {
  name: 'games'
};

class GameService extends Service {
  constructor (options) {
    options = fp.assignAll(defaultOptions, options);
    super(options);
  }

  setup (app) {
    super.setup(app);
    this.hooks(defaultHooks(this.options));
  }

  async find (params) {
    params = { query: {}, ...params };
    params.query.$sort = params.query.$sort || { position: 1 };

    return super.find(params);
  }
}

module.exports = function init (app, options, hooks) {
  options = { ModelName: 'game', ...options };
  return createService(app, GameService, GameModel, options);
};
module.exports.Service = GameService;