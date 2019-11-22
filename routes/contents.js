const express = require('express');
const router = express.Router();

/* Black Bridge Path GET */
router.get('/', (req,res,next) => {
    res.redirect('/');
});

/* Individual User GET */
router.get('/individual', (req,res,next) => {
    let sess = req.session;
    if(sess.userid && sess.typeUser){
        res.render('contents/indiv');
    }
    else{
        console.log('user page, access denied');
        res.redirect('/users/login');
    }
});

/* Medical Staff GET */
router.get('/medical-staff-doctor', (req,res,next) => {
    //res.render('contents/doctor');
    let sess = req.session;
    if(sess.userid && sess.typeDoctor){
        res.render('contents/doctor');
    }
    else{
        console.log('doctor page, access denied');
        res.redirect('/users/login');
    }
});

router.get('/medical-staff-nurse', (req,res,next) => {
    //res.render('contents/nurse');
    let sess = req.session;
    if(sess.userid && sess.typeNurse){
        res.render('contents/nurse');
    }
    else{
        console.log('nurse page, access denied');
        res.redirect('/users/login');
    }
});

/* Medical Staff POST */
router.post('/medical-staff-doctor', (req,res,next) => {
    console.log('doctor form submitted');
    res.redirect('/');
});
router.post('/medical-staff-nurse', (req,res,next) => {
    console.log('nurse form submitted');
    res.redirect('/');
});


module.exports = router;
