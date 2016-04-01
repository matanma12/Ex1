var path = require('path');
var express = require('express');
//var expressSession = require('express-session');
//var passport = require('passport');
//var passportLocal = require('passport-local');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');

var app = express();

app.set('views',path.join(__dirname,'views') ,'ejs');

app.use(express.static(path.join(__dirname,'bower_components')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('./utils'));

app.listen(process.env.PORT || 1337);