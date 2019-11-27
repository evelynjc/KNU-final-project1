const express = require('express');
const router = express.Router();
//const models = require('../models');
//const crypto = require('crypto');

router.get('/', (req,res,next) => {
    res.redirect('/');
});

/* LOG IN GET */
router.get('/login', (req,res,next) => {
    let session = req.session;
    
    res.render('users/login', {
        session : session
    });
});

/* LOG IN POST*/
router.post('/login', async(req,res,next) => {
    try {
    let body = req.body;
    let inputid = body.userid;
    let inputpw = body.userpw;
    
    let user1id = 'user';
    let user1pw = 'user';

    let user2id = 'doctor';
    let user2pw = 'doctor';

    let user3id = 'nurse';
    let user3pw = 'nurse';

    if (inputid === user1id){
        if(inputpw === user1pw){
            console.log('login successful as a common user');
            req.session.userid = inputid;
            req.session.typeUser = inputid;
            res.redirect('/contents/home');
        }
        else{
            console.log('common user id, login failed');
            res.redirect('/users/login');
        }
    }
    else if (inputid === user2id){
        if(inputpw === user2pw){
            console.log('login successful as a doctor');
            req.session.userid = inputid;
            req.session.typeMedStaff = inputid;
            res.redirect('/contents/medical-staff');
        }
        else{
            console.log('doctor id, login failed');
            res.redirect('/users/login');
        }
    }
    else if (inputid === user3id){
        if(inputpw === user3pw){
            console.log('login successful as a nurse');
            req.session.userid = inputid;
            req.session.typeMedStaff = inputid;
            res.redirect('/contents/medical-staff');
        }
        else{
            console.log('nurse id, login failed');
            res.redirect('/users/login');
        }
    }
    else {
        console.log('login failed');
        res.redirect('/users/login');
    }
    }
    catch(err){
        next(err);
    }
});

/* Logout GET */
router.get('/logout', (req,res,next) => {
    req.session.destroy(function (err){
        if(err){
            console.log(err);
        }
        else{
            res.clearCookie('key');
            res.redirect('/users/login');
        }
    });
});

/* SIGN UP GET (signup form) */
router.get('/signup', (req, res, next) => {
    let session = req.session;

    res.render('users/signup', {
        session : session
    });
});

/* SIGN UP POST*/
router.post('/signup', async(req,res,next) => {
    console.log('signup form submitted');
    res.redirect('/users/login');
});

module.exports = router;
