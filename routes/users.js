const express = require('express');
const router = express.Router();
//const models = require('../models');
//const crypto = require('crypto');

router.get('/', (req,res,next) => {
    res.redirect('/');
});
/* SIGN IN GET */
router.get('/login', (req,res,next) => {
    res.render('users/login');
});

/* SIGN IN POST*/
router.post('/login', (req,res,next) => {
    //res.send('login form submitted');
    console.log('login form submitted');

    res.redirect('/');
});

/* SIGN UP GET (signup form) */
router.get('/signup', function(req, res, next) {
  res.render('users/signup');
});

/* SIGN UP POST*/
router.post('/signup', (req,res,next) => {
    //res.send('signup form submitted');
    console.log('signup form submitted');
   
    res.redirect('/users/login');
});

module.exports = router;
