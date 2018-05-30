import Entity from 'mostly-entity';
import fp from 'mostly-func';
import { BlobEntity, DocTypes } from 'playing-content-common';

const GameEntity = new Entity('Game', {
  file: { using: BlobEntity },
  files: { using: BlobEntity },
});

GameEntity.expose('metadata', (obj, options) => {
  obj.metadata = obj.metadata || {};
  
  const Types = options.DocTypes || DocTypes;

  if (Types[obj.type]) {
    obj.metadata.facets = Types[obj.type].facets;
    obj.metadata.packages = Types[obj.type].packages;
  }
  
  return fp.sortKeys(obj.metadata);
});

GameEntity.excepts('destroyedAt');

export default GameEntity.asImmutable();
