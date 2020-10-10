// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/fonts', express.static(__dirname + 'public/fonts'))

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// home page
app.get('/home', function(req, res) {
    res.render('pages/home');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// services page
app.get('/services', function(req, res) {
    res.render('pages/services');
});

// project page
app.get('/project', function(req, res) {
    res.render('pages/project');
});

// contact page
app.get('/contact', function(req, res) {
    res.render('pages/contact');
});

app.listen(process.env.PORT || 3000);