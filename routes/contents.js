const express = require('express');
const router = express.Router();

/* Black Bridge Path GET */
router.get('/', (req,res,next) => {
    res.redirect('/');
});

/* Individual User GET */
router.get('/home', (req,res,next) => {
    let sess = req.session;
    if(sess.userid && sess.typeUser){
        res.render('contents/home');
    }
    else{
        console.log('user page, access denied');
        res.redirect('/users/login');
    }
});

/* See GET */

/* Medical Staff GET */
router.get('/medical-staff', (req,res,next) => {
    let sess = req.session;
    if(sess.userid && sess.typeMedStaff){
        res.render('contents/staff');
    }
    else{
        console.log('medical staff page, access denied');
        res.redirect('/users/login');
    }
});

/* Medical Staff POST */
router.post('/medical-staff', (req,res,next) => {
    console.log('medical staff form submitted');
    res.redirect('/');
});

/* Write GET*/

module.exports = router;
