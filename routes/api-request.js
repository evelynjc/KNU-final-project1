const request = require('request');
module.exports = function (callee) {
    function API_Call(callee) {
        // var OPTIONS = {
        //     headers: {'Content-Type': 'application/json'},
        //     id: null,
        //     pid: null,
        //     data: null
        // };
        var HOST = null;
        var PORT = null;
        var BASE_PATH = null;
        (function () {
            switch (callee) {
                case 'blockchain':
                    HOST = 'http://121.151.13.229';
                    PORT = '8080';
                    BASE_PATH = '/dmhs';
                    break;
                case 'drugs':
                    HOST = '';
                    PORT = '';
                    break;
                default:
                    HOST = 'http://localhost';
                    PORT = '3000';
            }
        })(callee);
        return {
            invoke: function (data, callback) {
                var invokeUrl = HOST + ':' + PORT + BASE_PATH + '/invoke?id=10&pid=1&data=';
                var keys = Object.keys(data);
                var pairs = Object.keys(data).length;
                var vals = Object.values(data);
                var parsedData = '';
                for (var i = 0; i < pairs; i++) {
                    let key = keys[i];
                    let val = vals[i];
                    if (i != pairs - 1)
                        parsedData += key + ':' + val + ',';
                    else
                        parsedData += key + ':' + val;
                }
                invokeUrl += parsedData;
                console.log('invokeUrl: ' + invokeUrl);
                request(encodeURI(invokeUrl), function (err, res, result) {
                    if(err)   console.log('err?: '+err);
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            },
            query: function (hash, callback) {
                queryUrl = HOST + ':' + PORT + BASE_PATH + '/query?hash=';
                queryUrl += hash;
                console.log('queryUrl: ' + queryUrl);
                request(queryUrl, function (err, res, result) {
                    if(err)    console.log('err?: ' + err);
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            }
        };
    }
    function statusCodeErrorHandler(statusCode, callback, data) {
        switch (statusCode) {
            case 200:
                callback(null, JSON.parse(data));
                break;
            default:
                callback('error', JSON.parse(data));
                break;
        }
    }
    var INSTANCE;
    if (INSTANCE === undefined) {
        INSTANCE = new API_Call(callee);
    }
    return INSTANCE;
};