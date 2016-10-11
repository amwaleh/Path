var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

  app.use(express.static(__dirname + '/views/'));
  app.use('/static',express.static(__dirname + '/static/'));
  app.use('/images',express.static(__dirname + '/images/'));
  app.use('/css',express.static(__dirname + '/css/'));
  app.use('/js',express.static(__dirname + '/js/'));
  app.get('/', function (req, res) {
    res.render( 'index');
  });
  app.get('/createcohort', function (req, res) {
    res.render( 'createClass');
  });

  app.get('/applicants', function (req, res) {
    res.render( 'Applicants');
  });
  app.get('/candidate', function(req, res) {
    res.render('candidate');
  });
  app.get('/tools', function (req, res) {
     res.render( 'tools');
  });
  app.get('/cohort', function (req, res) {
     res.render( 'cohort');
  });
  app.get('/cycleAnalytics', function (req, res) {
    res.render('analytics');
  });
  app.get('/location_cohort', function (req, res) {
    res.render('location_cohort');
  });
  app.get('/toolsDescription', function (req, res) {
    res.render('toolsDes');
  });
  app.get('/toolchart', function (req, res) {
    res.render('usage');
  });
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
