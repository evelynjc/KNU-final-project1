const express = require('express');
const router = express.Router();

/* Black Bridge Path GET */
router.get('/', (req,res,next) => {
    res.redirect('/');
});

/* User Home GET */
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

/* User Checkup Records GET */
router.get('/checkups', (req,res,next) => {
    let sess = req.session;
    if(sess.userid && sess.typeUser){
        res.render('contents/checkups');
    }
    else{
        console.log('user page, access denied');
        res.redirect('/users/login');
    }
});

/* User Prescription Records */
router.get('/prescriptions', (req,res,next) => {
    let sess = req.session;
    if(sess.userid && sess.typeUser){
        res.render('contents/prescriptions');
    }
    else{
        console.log('user page, access denied');
        res.redirect('/users/login');
    }
});

/* User Operation Records */
router.get('/operations', (req,res,next) => {
    let sess = req.session;
    if(sess.userid && sess.typeUser){
        res.render('contents/operations');
    }
    else{
        console.log('user page, access denied');
        res.redirect('/users/login');
    }
});

/* --------------------------------------------------------- */

/* Medical Staff Home GET */
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

/* Medical Staff Record GET */

module.exports = router;
