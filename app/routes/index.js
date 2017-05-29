const articleRoutes = require('./article_routes');
const nytRoutes = require('./nyt_routes');
module.exports = function(app, db) {
  articleRoutes(app, db);
  // Other route groups could go here, in the future
};