/**
 * Game of a parent workout with a child insight
 */
const fields = {
  category: { type: String },  // category
  content: { type: String },   // game content
  mimetype: { type: String },  // content mimetype
  genre: { type: String },     // game genre
  levels: [{ type: String }],  // dificulty levels
};

module.exports = function (app, name) {
  const mongoose = app.get('mongoose');
  const DocumentModel = mongoose.model('document');
  const schema = new mongoose.Schema(fields);
  return DocumentModel.discriminator(name, schema);
};