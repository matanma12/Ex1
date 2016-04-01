var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var objId = schema.ObjectId;
var User = mongoose.model('User', new schema({
    id: objId,
    firstName: String,
    lastName: String,
    email:{type: String, unique: true},
    password: String
}));

mongoose.connect('mongodb://localhost/database');

router.get('/',function(req,res){
    res.render('index.ejs');
});
//Sign in
router.get('/signIn',function(req,res){
    res.render('signIn.ejs');
});
router.post('/signIn',function(req,res){
    var user;
    user = new User({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    user.save(function (err) {
        if(err){
            var err = 'Server Error';
            if(err.code === 11000){
                err = 'The user name is already taken';
            }
            res.render('signIn.ejs',{error:err});
        }else{
            res.redirect('/dashboard');
        }
    });
});

//Login
router.get('/login',function(req,res){
    res.render('login.ejs');
});
router.post('/login', function (req, res) {
    User.findOne({email: req.body.email},function (err, user) {
        if(!user){
            res.render('login.ejs',{ error: 'Wrong email or password'});
        }else{
            if(req.body.password === user.password && req.body.email === user.email) {
                res.redirect('/dashboard');
            }
            else {
                res.render('login.ejs', {error: 'Wrong email or password'});
            }
        }
    });
});

//Logout
router.get('/logout',function(req,res){
    res.redirect('/');
});

//Dashboard
router.get('/dashboard',function(req,res){
    res.render('dashboard.ejs');
});
router.post('/dashboard',function(req,res){
    res.end(JSON.stringify(req.files)+"\n");
    //res.render('login.ejs', {error: 'Wrong email or password'});
});

//Error handler
//router.use(function(err,req,res,next){
//    res.status(err.status||500);
//    res.render('error',{
//        massage:err.massage,
//        error:err
//    });
//});


module.exports = router;

