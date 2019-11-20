const express = require('express');
const session = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');

module.exports = function(app){
app.use(session({
    secret: '#$@#%**OOG-',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24000*60*60
    }
}));

app.get('/', (req,res) => {
    console.log(req.session);
    res.render('login');
    if(req.sesion.id === undefined){
        res.render('login');
        console.log('no session');
    }
    else {
        res.redirect('/about');
        console.log('login successsful');
    }    
});

app.get('/about', (req,res) =>{
    res.render('about');
});

app.post('/', async (req,res,next) =>{
    let body = req.body();
    let id = "111";
    let pw = "222";
    let inputid = body.user_id;
    let inputpw = body.user_pw;

    if(inputid === id){
        console.log("login successful");
        req.session.id = body.user_id;
        res.redirect('/about');
    }
    else{
        console.log("wrong password");
        res.redirect('/');
    }
});

} //module exports func

/*
module.exports = function(app){
    app.get('/', (req,res) => {
        res.render('index.html');
    });
    app.get('/about', (req,res) => {
        res.render('about.html');
    });
}
*/
