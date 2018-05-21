import { Service, helpers, createService } from 'mostly-feathers-mongoose';
import fp from 'mostly-func';

import GameModel from '../../models/game.model';
import defaultHooks from './game.hooks';

const defaultOptions = {
  name: 'games'
};

export class GameService extends Service {
  constructor (options) {
    options = fp.assignAll(defaultOptions, options);
    super(options);
  }

  setup (app) {
    super.setup(app);
    this.hooks(defaultHooks(this.options));
  }

  find (params) {
    params = { query: {}, ...params };
    params.query.$sort = params.query.$sort || { position: 1 };

    return super.find(params);
  }

  reorder (id, data, params, original) {
    return this.get(data.target).then((target) => {
      if (!target) throw new Error("data.target not exists");
      target = target.data || target;
      return helpers.reorderPosition(this.Model, original, target.position, { classify: 'parent' });
    });
  }
}

export default function init (app, options, hooks) {
  options = { ModelName: 'game', ...options };
  return createService(app, GameService, GameModel, options);
}

init.Service = GameService;