var ObjectID = require('mongodb').ObjectID;
var nytTop = require('nyt-top');

require('dotenv').config()
nytTop.key(process.env.NYT_KEY);

module.exports = function(app, db) {
  app.get('/articles/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('articles').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.put('/articles/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const article = { text: req.body.body, title: req.body.title };
    db.collection('articles').update(details, article, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(article);
      }
    });
  });


  app.delete('/articles/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('articles').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Article ' + id + ' deleted!');
      }
    });
  });

  app.post('/articles', (req, res) => {
    const article = { text: req.body.body, title: req.body.title };
    db.collection('articles').insert(article, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  nytTop.section('home', function (err, data) {
    if (err) { console.log(err); } else {
      var results = data.results;
      var articles = [];
      for(var i =0; i<10;i++){
        articles[i] = { text: results[i].abstract, title: results[i].title };
        db.collection('articles').insert(articles[i], (err, result) => {
          console.log(articles[i]);
        });
      }
    }
  });
};
