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
var checkupobj;
Checkup.find({}, function(err, checkups){
    if(err) console.log('checkup model error');
    if(!checkups) console.log('checkup not found');
    //console.log('checkups: '+checkups);
    //console.log(typeof(checkups));
    //console.log(checkups[0].date); //JSON.stringify()
    //console.log(checkups.length);
    checkupobj = JSON.parse(JSON.stringify(checkups));
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

var myname, idobj, myidcode,infoobj, checkupobj, presobj, operobj, roundrecobj;
/* Black Bridge Path GET */
router.get('/', (req,res,next) => {
    res.redirect('/');
});

/* User Home GET */
router.get('/home', (req,res,next) => {
    let sess = req.session;
    
    if(sess.userid && sess.typeUser){
        Userinfo.findOne({id:sess.userid}, function(err, myidcode){
            if(err) console.log('myid error');
            if(!myidcode) console.log('myid code not found');
            idobj = JSON.parse(JSON.stringify(myidcode));
            myidcode = idobj._id;
            PatientInfo.find({userid:myidcode}, function(err, result){
                if(err) console.log('user-patientinfo error');
                if(!result) console.log('user-patientinfo not found');
                infoobj = JSON.parse(JSON.stringify(result));
                console.log(result);
                res.render('contents/home', {obj: infoobj});
            });
        });
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

/* User Prescription Records GET */
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

/* User Operation Records GET */
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

/* User Rounds Records GET */
router.get('/round-records', (req,res,next) => {
    let sess = req.session;
    if(sess.userid && sess.typeUser){
        res.render('contents/roundrecords');
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

/* Rounds Record GET */
router.get('/rounds', (req,res,next) => {
    let sess = req.session;
    if(sess.userid && sess.typeMedStaff){
        res.render('contents/round');
    }
    else{
        console.log('medical staff page, access denied');
        res.redirect('/users/login');
    }
});

/* Rounds Record POST */
router.post('/rounds', (req,res,next) => {
    console.log('round record form submitted');
    res.redirect('/');
});

/* Checkups Record GET */
router.get('/record', (req,res,next) => {
    let sess = req.session;
    if(sess.userid && sess.typeMedStaff){
        res.render('contents/record');
    }
    else{
        console.log('medical staff page, access denied');
        res.redirect('/users/login');
    }
});

/* Checkups Record POST */
router.post('/record', (req,res,next) => {
    console.log('checkup record form submitted');
    res.redirect('/');
});


module.exports = router;
