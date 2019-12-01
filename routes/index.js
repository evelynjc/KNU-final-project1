var express = require('express');
var router = express.Router();
var path = require('path');

// Moment module for retrieving current time 
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

// Multer settings
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        let uploadTime = moment().format('YYYY-MM-DD_HH:mm:ss');
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        cb(null, basename + '_' + uploadTime + extension); // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
});
var upload = multer({ storage: storage });


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* Upload GET*/
router.get('/upload', (req, res, next) => {
    res.render('upload');
});

/* Upload POST*/
router.post('/upload', upload.single('jsonfile'), (req, res, next) => {
    let uploadTime = moment().format('YYYY-MM-DD HH:mm:ss');

    try {
        res.send('File uploaded successfully' + '\n' + JSON.stringify(req.file));
        console.log('File uploaded:' + '\n' + JSON.stringify(req.file) + 'Time: ' + uploadTime);
    } catch (err) {
        res.send(400);
    }
});

module.exports = router;
