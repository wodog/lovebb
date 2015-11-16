var http = require('http');
var url = require('url');
var querystring = require('querystring');
var xml2js = require('xml2js');
var Sentence = require('./sentence.js');
var async = require('async');

/*
var getContent = function(seq){
	Sentence.findOne({seq:seq}, function(err, data){
			if(err) throw err;
			console.log(data);
			console.log(data.content);
			return data.content;
	});
}
*/

var getSeq = function(){
	return Math.ceil(Math.random()*5);
}

var server = http.createServer(function(req, res) {
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    if (req.method === 'POST') {
        var post = '';

        req.on('data', function(chunk) {
            post += chunk;
        });

        req.on('end', function() {
            console.log(post);
            xml2js.parseString(post, function(err, result) {
                console.log(result);
		var content = '';
		async.waterfall([
			function(callback){
				callback(null, getSeq());
			},
			function(seq, callback){
				Sentence.findOne({seq:seq}, function(err, data) {
					if(err) throw err;
					callback(null, data.content);
				});
			}
		], function(err, data) {
			var reply = '<xml><ToUserName><![CDATA[' + result.xml.FromUserName + ']]></ToUserName><FromUserName><![CDATA[' + result.xml.ToUserName + ']]></FromUserName><CreateTime>12345678</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA['+data+']]></Content></xml>';
            	   	console.log(reply);
           		res.end(reply);
		});
            });
        });

        console.log('------------------over----------------');
    } else {
        var query = url.parse(req.url, true).query;
        console.log(query);

        res.end(query.echostr);

    }

});

server.listen(80);
console.log('host are 121.42.62.149:80');

// var postData = querystring.stringify({
//     'msg': 'Hello World!'
// });

// var options = {
//     hostname: 'www.baidu.com',
//     port: 80,
//     path: '/upload',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': postData.length
//     }
// };

// var req = http.request(options, function(res) {
//     console.log('STATUS: ' + res.statusCode);
//     console.log('HEADERS: ' + JSON.stringify(res.headers));
//     res.setEncoding('utf8');
//     res.on('data', function(chunk) {
//         console.log('BODY: ' + chunk);
//     });
//     res.on('end', function() {
//         console.log('No more data in response.');
//     });
// });

// req.on('error', function(e) {
//     console.log('problem with request: ' + e.message);
// });

// // write data to request body
// req.write(postData);
// req.end();



// http.get("http://www.baidu.com", function(res) {
//     console.log("Got response: " + res.statusCode);
// }).on('error', function(e) {
//     console.log("Got error: " + e.message);
// });
