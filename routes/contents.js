const express = require('express');
const router = express.Router();

/* Black Bridge Path GET */
router.get('/', (req,res,next) => {
    res.redirect('/');
});

/* Individual GET*/
router.get('/individual', (req,res,next) => {
    res.render('contents/indiv');
});

/* Medical Staff GET*/
router.get('/medical-staff-doctor', (req,res,next) => {
    res.render('contents/doctor');
});

router.get('/medical-staff-nurse', (req,res,next) => {
    res.render('contents/nurse');
});

/* Medical Staff POST*/
router.post('/medical-staff-doctor', (req,res,next) => {
    console.log('doctor form submitted');
    res.redirect('/');
});
router.post('/medical-staff-nurse', (req,res,next) => {
    console.log('nurse form submitted');
    res.redirect('/');
});


module.exports = router;
