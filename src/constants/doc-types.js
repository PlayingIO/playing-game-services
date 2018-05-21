import { DocTypes as CommonTypes } from 'common';

export default Object.assign(CommonTypes, {
  game: {
    "type":"Game",
    "packages": "playing-game-elements",
    "facets":[
      "Versionable",
      "Publishable",
      "Commentable",
      "HasRelatedText",
      "Tagable",
      "Downloadable"
    ]
  }
});