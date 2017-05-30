var nytTop = require('nyt-top');
const articleRoutes = require('./article_routes');

require('dotenv').config()

nytTop.key(process.env.NYT_KEY);

nytTop.section('home', function (err, data) {
  if (err) { console.log(err); } else {
    var results = data.results;
    for (var i = 0; i < 10; i++) { // top ten most recent stories
      console.log(results[i].title);
    }
  }
});