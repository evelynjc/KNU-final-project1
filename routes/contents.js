const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

const Checkup = require('../models/checkup');
const MedicalStaff = require('../models/medstaff');
const Operation = require('../models/operation');
const PatientInfo = require('../models/patientinfo');
const Prescription = require('../models/prescription');
const Round = require('../models/round');
const Userinfo = require('../models/userinfo');


var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

// CONFIGURE ROUTER TO USE bodyParser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var checkupobj;

var myname, idobj, myidcode, infoobj, checkupobj, presobj, operobj, roundrecobj;
/* Black Bridge Path GET */
router.get('/', (req, res, next) => {
    res.redirect('/');
});

/* User Home GET */
router.get('/home', (req, res, next) => {
    let sess = req.session;
    if (sess.userid && sess.typeUser) {
        PatientInfo.find({ userid: sess.userid }, function (err, result) {
            if (err) console.log('user-patientinfo error');
            if (!result) console.log('user-patientinfo not found');
            infoobj = JSON.parse(JSON.stringify(result));
            res.render('contents/home', { obj: infoobj, userName: sess.name });
        });
    }
    else {
        console.log('user page, access denied');
        res.redirect('/users/login');
    }
});

/* User Checkup Records GET */
router.get('/checkups', (req, res, next) => {
    let sess = req.session;
    if (sess.userid && sess.typeUser) {
        PatientInfo.find({ userid: sess.userid }, function (err, pcode) {
            if (err) console.log('user-patientinfo error');
            if (!pcode) console.log('user-patient info not found');
            Checkup.find({ patientCode: pcode[0].patientCode }, function (err, result) {
                if (err) console.log('user-checkups error');
                if (!result) console.log('user-checksup info not found');
                checkupobj = JSON.parse(JSON.stringify(result));
                res.render('contents/checkups', { obj: checkupobj, userName: sess.name });
            });
        });
    }
    else {
        console.log('user page, access denied');
        res.redirect('/users/login');
    }
});

/* User Prescription Records GET */
router.get('/prescriptions', (req, res, next) => {
    let sess = req.session;
    if (sess.userid && sess.typeUser) {
        PatientInfo.find({ userid: sess.userid }, function (err, pcode) {
            if (err) console.log('user-patientinfo error');
            if (!pcode) console.log('user-patient info not found');
            Prescription.find({ patientCode: pcode[0].patientCode }, function (err, result) {
                if (err) console.log('user-checkups error');
                if (!result) console.log('user-checksup info not found');
                checkupobj = JSON.parse(JSON.stringify(result));
                res.render('contents/prescriptions', { obj: checkupobj, userName: sess.name });
            });
        });
    }
    else {
        console.log('user page, access denied');
        res.redirect('/users/login');
    }
});

/* User Operation Records GET */
router.get('/operations', (req, res, next) => {
    let sess = req.session;
    if (sess.userid && sess.typeUser) {
        PatientInfo.find({ userid: sess.userid }, function (err, pcode) {
            if (err) console.log('user-patientinfo error');
            if (!pcode) console.log('user-patient info not found');
            Operation.find({ patientCode: pcode[0].patientCode }, function (err, result) {
                if (err) console.log('user-checkups error');
                if (!result) console.log('user-checksup info not found');
                checkupobj = JSON.parse(JSON.stringify(result));
                res.render('contents/operations', { obj: checkupobj, userName: sess.name });
            });
        });
    }
    else {
        console.log('user page, access denied');
        res.redirect('/users/login');
    }
});

/* User Rounds Records GET */
router.get('/round-records', (req, res, next) => {
    let sess = req.session;
    if (sess.userid && sess.typeUser) {
        PatientInfo.find({ userid: sess.userid }, function (err, pcode) {
            if (err) console.log('user-patientinfo error');
            if (!pcode) console.log('user-patient info not found');
            Round.find({ patientCode: pcode[0].patientCode }, function (err, result) {
                if (err) console.log('user-checkups error');
                if (!result) console.log('user-checksup info not found');
                checkupobj = JSON.parse(JSON.stringify(result));
                res.render('contents/roundrecords', { obj: checkupobj, userName: sess.name });
            });
        });
    }
    else {
        console.log('user page, access denied');
        res.redirect('/users/login');
    }
});

/* --------------------------------------------------------- */

/* Medical Staff Home GET */
router.get('/medical-staff', (req, res, next) => {
    let sess = req.session;
    if (sess.userid && sess.typeMedStaff) {
        MedicalStaff.find({ userid: sess.userid }, function (err, medinfo) {
            if (err) console.log('med staff error');
            if (!medinfo) console.log('med staff info not found');
            PatientInfo.find({ attendant: medinfo[0].name }, function (err, result) {
                if (err) console.log('user-checkups error');
                if (!result) console.log('user-checksup info not found');
                checkupobj = JSON.parse(JSON.stringify(result));
                res.render('contents/staff', { medobj: medinfo, obj: checkupobj, userName: sess.name });
            });
        });

    }
    else {
        console.log('medical staff page, access denied');
        res.redirect('/users/login');
    }
});

var find_code;

/* Medical Staff POST */
router.post('/medical-staff', (req, res, next) => {
    console.log('medical staff form submitted');
    console.log(req.body.pcode);
    find_code = req.body.pcode;
    if (req.body.type === "1")
        res.redirect('/contents/record');
    else if (req.body.type === "2")
        res.redirect('/contents/rounds');
    else if (req.body.type === "3")
        res.redirect('/contents/operation-records');
    else
        res.redirect('/contents/medical-staff');
});

/* Rounds Record GET */
router.get('/rounds', (req, res, next) => {
    let sess = req.session;
    if (sess.userid && sess.typeMedStaff) {
        PatientInfo.findOne({ patientCode: find_code }, function (err, tmp) {
            let file = 'uploads/' + find_code + '.json';
            var jsonLine;
            jsonfile.readFile(file, (err, obj) => {
                if (err) console.log(err);
                //console.dir(obj);
                let jsonArr = JSON.parse(JSON.stringify(obj));
                let index = Math.round(Math.random() * 10) % jsonArr.length;
                jsonLine = jsonArr[index];
                console.log(jsonLine);
                res.render('contents/round', { obj: jsonLine, userName: sess.name, pname: tmp.name });
            });
        });
    }
    else {
        console.log('medical staff page, access denied');
        res.redirect('/users/login');
    }
});

/* Rounds Record POST */
router.post('/rounds', (req, res, next) => {
    let sess = req.session;
    // console.log('checkup record form req received');
    // console.log(req.body);
    // res.redirect('/contents/medical-staff');
    // let dateObj = new Date();
    // let date = ("0" + dateObj.getDate()).slice(-2);
    // let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    // let year = dateObj.getFullYear();
    // var h = addZero(dateObj.getHours());
    // var m = addZero(dateObj.getMinutes());
    // var dateNow = year + "." + month + "." + date + "-" + h + ":" + m;
    var dateNow = moment().format('YYYY.MM.DD-HH:mm');

    var reqObj = req.body;
    var Pulse = reqObj.pulse;
    var breath = reqObj.respiration;
    var BT = reqObj.bodyTemp;
    var roRemarks = reqObj.remarks;
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    console.log(reqObj);

    (function () {
        PatientInfo.findOne({ patientCode: find_code }, function (err, thePatient) {
            if (err) console.log('patientinfo error');
            if (!thePatient) console.log("patientinfo result doesn't exist");
            inst = thePatient.institution;
            depart = thePatient.department;

            var API_CALL = require('./api-request')('blockchain');
            var data = '{ "patientCode":"' + find_code + '", "pulse":"' + Pulse + '", "time": "' + dateNow + '", "respiration": "' + breath + '", "bodyTemp": "' + BT + '", "remarks": "' + roRemarks + '"}';
            console.log('data: ' + data);
            data = JSON.parse(data);
            API_CALL.invoke(data, (err, apiResult) => {
                if (!err) {
                    Round.create({ patientCode: find_code, pulse: Pulse, time: dateNow, respiration: breath, bodyTemp: BT, hash: apiResult.hash, remarks: roRemarks }, (err, result) => {
                        if (err) console.log('round document create error: ' + err);
                        if (!apiResult) console.log("round document result doesn't exist");
                        console.log('round record block has been created: ' + JSON.stringify(apiResult));
                        res.redirect('/contents/medical-staff');
                    });
                }
                else {
                    res.json(err);
                }
            });
        });
        //res.redirect('/contents/medical-staff');
    })();
});

/* Checkups Record GET */
router.get('/record', (req, res, next) => {
    let sess = req.session;
    if (sess.userid && sess.typeMedStaff) {
        PatientInfo.find({ patientCode: find_code }, function (err, result) {
            if (err) console.log('user-info error');
            if (!result) console.log('user-info not found');
            infoobj = JSON.parse(JSON.stringify(result));
            Checkup.find({ patientCode: find_code }, function (err, p_check) {
                if (err) console.log('user-checkups error');
                if (!result) console.log('user-checksup info not found');
                checkobj = JSON.parse(JSON.stringify(p_check));
                Prescription.find({ patientCode: find_code }, function (err, p_pre) {
                    if (err) console.log('user-prescription error');
                    if (!p_pre) console.log('user-prescription info not found');
                    var preobj = JSON.parse(JSON.stringify(p_pre));
                    res.render('contents/record', { obj: infoobj, userName: sess.name, list: checkobj, pre: preobj });
                });
            });
        });
    }
    else {
        console.log('medical staff page, access denied');
        res.redirect('/users/login');
    }
});

/* Checkups Record POST */
router.post('/record', (req, res, next) => {
    let sess = req.session;
    // console.log('checkup record form req received');
    console.log(req.body);
    // res.redirect('/contents/medical-staff');
    // let dateObj = new Date();
    // let date = ("0" + dateObj.getDate()).slice(-2);
    // let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    // let year = dateObj.getFullYear();
    // var dateNow = year + "." + month + "." + date;
    var dateNow = moment().format('YYYY.MM.DD');

    var reqObj = req.body;
    var pcode = reqObj.pcode;
    var diagno = reqObj.diagnosis;
    var chRemarks = reqObj.remarks;
    var presc = reqObj.prescription;
    var prRemarks = reqObj.etc;
    var depart;
    var inst;

    (function () {
        PatientInfo.findOne({ patientCode: pcode }, function (err, thePatient) {
            if (err) console.log('patientinfo error');
            if (!thePatient) console.log("patientinfo result doesn't exist");
            inst = thePatient.institution;
            depart = thePatient.department;

            var API_CALL = require('./api-request')('blockchain');
            var chData = '{'+'"patientCode": "'+pcode+'", "diagnosis": "'+diagno+'", "date": "'+dateNow+'", "attendant": "'+
            sess.name+'", "department": "'+depart+'", "institution": "'+inst+'", "remarks": "'+chRemarks+'"}';
            var prData = '{'+'"patientCode": "'+pcode+'", "attendant": "'+sess.name+'", "medication": "'+presc+'", "department": "'+
            depart+'", "date": "'+dateNow+'", "institution": "'+inst+'", "remarks": "'+prRemarks+'"}';
            console.log('chData: ' + chData);
            console.log('prData: ' + prData);
            chData = JSON.parse(chData);
            prData = JSON.parse(prData);

            API_CALL.invoke(chData, (err, chapiResult) => {
                if (!err) {
                    if (diagno != " " || chRemarks != " ") {
                        Checkup.create({ patientCode: pcode, diagnosis: diagno, date: dateNow, attendant: sess.name, department: depart, institution: inst, hash: chapiResult.hash, remarks: chRemarks }, (err, chResult) => {
                            if (err) console.log('checkup document create error');
                            if (!chResult) console.log("checkup document result doesn't exist");
                            console.log('checkup record block has been created: ' + JSON.stringify(chResult));
                        });
                    }
                }
                else {
                    res.json(err);
                }
            });

            API_CALL.invoke(prData, (err, prapiResult) => {
                if (!err) {
                    if (presc != " " || prRemarks != " ") {
                        Prescription.create({ patientCode: pcode, attendant: sess.name, medication: presc, department: depart, date: dateNow, institution: inst, remarks: prRemarks, hash: prapiResult.hash }, (err, prResult) => {
                            if (err) console.log('prescription document create error');
                            if (prResult) console.log("prescription document result doesn't exist");
                            console.log('prescription record block has been created: ' + JSON.stringify(prResult));
                        });
                    }
                }
                else {
                    res.json(err);
                }
            });

        });
        res.redirect('/contents/medical-staff');
    })();
});

/* Lookup All Records of a Patient GET */
router.get('/lookup', (req, res, next) => {
    let sess = req.session;
    if (sess.userid && sess.typeMedStaff) {
        PatientInfo.find({ patientCode: find_code }, function (err, info) {
            if (err) console.log('user-checkups error');
            if (!info) console.log('user-checksup info not found');
            Checkup.find({ patientCode: find_code }, function (err, check) {
                if (err) console.log('user-checkups error');
                if (!info) console.log('user-checksup info not found');
                Prescription.find({ patientCode: find_code }, function (err, medication) {
                    if (err) console.log('user-checkups error');
                    if (!info) console.log('user-checksup info not found');
                    Operation.find({ patientCode: find_code }, function (err, oper) {
                        if (err) console.log('user-checkups error');
                        if (!info) console.log('user-checksup info not found');
                        Round.find({ patientCode: find_code }, function (err, sign) {
                            if (err) console.log('user-checkups error');
                            if (!info) console.log('user-checksup info not found');
                            res.render('contents/lookup', { infoobj: info, checkobj: check, preobj: medication, operobj: oper, signobj: sign, userName: sess.name });
                        })
                    });
                });
            });
        });
    }
    else {
        console.log('medical staff page, access denied');
        res.redirect('/users/login');
    }
});

/* Operatoin Record GET */
router.get('/operation-records', (req, res, next) => {
    let sess = req.session;
    if (sess.userid && sess.typeMedStaff) {
        PatientInfo.find({ patientCode: find_code }, function (err, p_list) {
            if (err) console.log('user-patientinfo error');
            if (!p_list) console.log('user-patient info not found');
            Operation.find({ patientCode: find_code }, function (err, result) {
                if (err) console.log('user-checkups error');
                if (!result) console.log('user-checksup info not found');
                res.render('contents/operrecord', { obj: p_list, userName: sess.name, operobj: result });
            });
        });
    }
    else {
        console.log('user page, access denied');
        res.redirect('/users/login');
    }
});

/* Operatoin Record POST */
router.post('/operation-records', (req, res, next) => {
    let sess = req.session;
    // console.log('checkup record form req received');
    // console.log(req.body);
    // res.redirect('/contents/medical-staff');
    // let dateObj = new Date();
    // let date = ("0" + dateObj.getDate()).slice(-2);
    // let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    // let year = dateObj.getFullYear();
    // var dateNow = year + "." + month + "." + date;
    var dateNow = moment().format('YYYY.MM.DD');

    var reqObj = req.body;
    var pcode = reqObj.pcode;
    var Type = reqObj.ptype;
    var pcondition = reqObj.status;
    var Ward = reqObj.ward;
    var Room = reqObj.room;
    var opertype = reqObj.opertype;
    var oper = reqObj.operation;
    var Remarks = reqObj.remarks;
    var depart;
    var inst;
    var pname;
    var psex;

    console.log(req.body);
    PatientInfo.findOne({ patientCode: pcode }, function (err, thePatient) {
        if (err) console.log('patientinfo error');
        if (!thePatient) console.log("patientinfo result doesn't exist");
        inst = thePatient.institution;
        depart = thePatient.department;
        pname = thePatient.name;
        psex = thePatient.sex;
        pid = thePatient.userid;

        var API_CALL = require('./api-request')('blockchain');
        var pinfoData = '{' + '"userid": "' + pid + '", "patientCode": "' + pcode +
            '", "name": "' + pname + '", "sex": "' + psex + '", "attendant": "' + sess.name +
            '", "ward": "' + Ward + '", "room": "' + Room + '", "date": "' + dateNow +
            '", "department": "' + depart + '", "type": "' + Type + '", "condition": "' +
            pcondition + '", "institution": "' + inst + '"}';
        var operData = '{' + '"patientCode": "' + pcode + '", "type": "' + opertype + '", "operation": "' + oper + '", "attendant": "' + sess.name + '", "department": "' + depart + '", "date": "' + dateNow + '", "institution": "' + inst + '", "remarks": "' + Remarks + '"}';
        console.log('pinfoData: ' + pinfoData);
        console.log('operData: ' + operData);
        pinfoData = JSON.parse(pinfoData);
        operData = JSON.parse(operData);
        API_CALL.invoke(pinfoData, (err, apiResult) => {
            if (!err) {
                console.log(apiResult);
                PatientInfo.create({ userid: pid, patientCode: pcode, name: pname, sex: psex, attendant: sess.name, ward: Ward, room: Room, date: dateNow, department: depart, type: Type, condition: pcondition, institution: inst, hash: apiResult.hash }, (err, papiResult) => {
                    if (err) console.log('patientinfo document create error: ' + err);
                    if (!papiResult) console.log("patientinfo document result doesn't exist");
                    console.log('round record block has been created: ' + JSON.stringify(papiResult));
                    API_CALL.invoke(operData, (errr, apiResult) => {
                        if (!errr) {
                            console.log(apiResult);
                            Operation.create({ patientCode: pcode, type: opertype, operation: oper, attendant: sess.name, department: depart, date: dateNow, institution: inst, remarks: Remarks, hash: apiResult.hash }, (err, oapiResult) => {
                                if (errr) console.log('operation document create error -> ' + errr);
                                if (!oapiResult) console.log("operation document result doesn't exist");
                                console.log('operation record block has been created: ' + JSON.stringify(oapiResult));
                                res.redirect('/contents/medical-staff');
                            });
                        }
                        else {
                            res.json(errr);
                        }
                    });
                });
            }
            else {
                res.json(err);
            }
        });


    });
});
module.exports = router;
