const express = require('express');
const router = express.Router();
const Userinfo = require('../models/userinfo');
const PatientInfo = require('../models/patientinfo');
const MedicalStaff = require('../models/medstaff');

Userinfo.find({}, function (err, usrinfo) {
    if (err) console.log('usrinfo model error');
    if (!usrinfo) console.log('usrinfo not found');
    //console.log('usrinfo: '+usrinfo);
});

router.get('/', (req, res, next) => {
    res.redirect('/');
});

/* LOG IN GET */
router.get('/login', (req, res, next) => {
    let session = req.session;

    res.render('users/login', {
        session: session
    });
});

/* LOG IN POST*/
router.post('/login', async (req, res, next) => {
    try {
        let body = req.body;
        let inputid = body.userid;
        let inputpw = body.userpw;
        
        Userinfo.findOne({ id: inputid, password: inputpw }, (err, usrinfo) => {
            if (err) {
                console.log('usrinfo model error');
                res.redirect('/users/login');
            }
            else if (!usrinfo) {
                console.log('usrinfo not found');
                res.redirect('/users/login');
            }
            else {
                req.session.userid = inputid;
                PatientInfo.findOne({ userid: inputid }, (err, result) => {
                    if (err) {
                        console.log('user-patientinfo error');
                    }
                    else if (!result) {
                        console.log('user-patientinfo not found');
                        MedicalStaff.findOne({ userid: inputid }, (err, medresult) => {
                            if (err) {
                                console.log('user-medstaff error');
                            }
                            else if (!medresult) {
                                console.log('user-medstaff not found');
                                res.redirect('/users/login');
                            }
                            else {
                                // signed in as medical staff
                                req.session.typeMedStaff = inputid;
                                req.session.name = medresult.name;
                                console.log('sess name: ' + req.session.name);
                                res.redirect('/contents/medical-staff');
                            }
                        });
                    }
                    else {
                        // signed in as an average user
                        req.session.typeUser = inputid;
                        req.session.name = result.name;
                        console.log('sess name: ' + req.session.name);
                        res.redirect('/contents/home');
                    }
                });
            }
        });
    }
    catch (err) {
        next(err);
    }
});

/* Logout GET */
router.get('/logout', (req, res, next) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.clearCookie('key');
            res.redirect('/users/login');
        }
    });
});

/* SIGN UP GET (signup form) */
router.get('/signup', (req, res, next) => {
    let session = req.session;

    res.render('users/signup', {
        session: session
    });
});

/* SIGN UP POST*/
router.post('/signup', async (req, res, next) => {
    console.log('signup form submitted');
    res.redirect('/users/login');
});

module.exports = router;
