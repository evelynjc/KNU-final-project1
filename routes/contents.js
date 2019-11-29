const express = require('express');
const router = express.Router();
const util = require('util');
const bodyParser = require('body-parser');

const Checkup = require('../models/checkup');
const MedicalStaff = require('../models/medstaff');
const Operation = require('../models/operation');
const PatientInfo = require('../models/patientinfo');
const Prescription = require('../models/prescription');
const Round = require('../models/round');
const Userinfo = require('../models/userinfo');

// CONFIGURE ROUTER TO USE bodyParser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

Checkup.find({}, function(err, checkups){
    if(err) console.log('checkup model error');
    if(!checkups) console.log('checkup not found');
    //console.log('checkups: '+checkups);
    //console.log(typeof(checkups));
    //console.log(checkups[0].date); //JSON.stringify()
    //console.log(checkups.length);
});
MedicalStaff.find({}, function(err, medstaff){
    if(err) console.log('medstaff model error');
    if(!medstaff) console.log('medstaff not found');
    //console.log('medstaff: '+medstaff);
});
Operation.find({}, function(err, operations){
    if(err) console.log('operations model error');
    if(!operations) console.log('operations not found');
    //console.log('operations: '+operations);
});
PatientInfo.find({}, function(err, patientsinfo){
    if(err) console.log('patientsinfo model error');
    if(!patientsinfo) console.log('patientsinfo not found');
    //console.log('patientsinfo: '+patientsinfo);
});
Prescription.find({}, function(err, prescriptions){
    if(err) console.log('prescriptions model error');
    if(!prescriptions) console.log('prescriptions not found');
    //console.log('prescriptions: '+prescriptions);
});
Round.find({}, function(err, rounds){
    if(err) console.log('round model error');
    if(!rounds) console.log('round not found');
    //console.log('rounds: '+rounds);
});
Userinfo.find({}, function(err, usrinfo){
    if(err) console.log('usrinfo model error');
    if(!usrinfo) console.log('usrinfo not found');
    //console.log('usrinfo: '+usrinfo);
});

/////////////////////

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
