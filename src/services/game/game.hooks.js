import { iff, isProvider } from 'feathers-hooks-common';
import { associateCurrentUser, queryWithCurrentUser } from 'feathers-authentication-hooks';
import { hooks } from 'mostly-feathers-mongoose';
import { cache } from 'mostly-feathers-cache';
import { hooks as content } from 'playing-content-services';

import GameEntity from '../../entities/game.entity';

export default function (options = {}) {
  return {
    before: {
      all: [
        hooks.authenticate('jwt', options.auth),
        cache(options.cache, { headers: ['enrichers-document'] })
      ],
      get: [
        // queryWithCurrentUser({ idField: 'id', as: 'creator' })
      ],
      find: [
        // queryWithCurrentUser({ idField: 'id', as: 'creator' })
      ],
      create: [
        iff(isProvider('external'),
          associateCurrentUser({ idField: 'id', as: 'creator' })),
        content.computePath({ type: 'game' }),
        content.computeAncestors()
      ],
      update: [
        iff(isProvider('external'),
          associateCurrentUser({ idField: 'id', as: 'creator' })),
        hooks.depopulate('parent'),
        hooks.discardFields('metadata', 'ancestors', 'createdAt', 'updatedAt', 'destroyedAt'),
        content.computePath({ type: 'game' }),
        content.computeAncestors()
      ],
      patch: [
        iff(isProvider('external'),
          associateCurrentUser({ idField: 'id', as: 'creator' })),
        hooks.depopulate('parent'),
        hooks.discardFields('metadata', 'ancestors', 'createdAt', 'updatedAt', 'destroyedAt'),
        content.computePath({ type: 'game' }),
        content.computeAncestors()
      ]
    },
    after: {
      all: [
        hooks.populate('creator', { service: 'users' }),
        hooks.populate('parent', { service: 'workouts', fallThrough: ['headers'] }),
        hooks.populate('ancestors'), // with typed id
        content.documentEnrichers(options),
        cache(options.cache, { headers: ['enrichers-document'] }),
        hooks.presentEntity(GameEntity, options.entities),
        hooks.responder()
      ],
      create: [
        content.documentNotifier('document.create')
      ]
    }
  };
}