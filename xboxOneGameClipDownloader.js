var http = require('http');
var fs = require('fs');

var gameName = process.argv[2];
var recordedDateStamp = process.argv[3];
var fileDirectory = process.argv[4];
var downloadFileURL = process.argv[5];

var file = fs.createWriteStream(fileDirectory + '/' + gameName + recordedDateStamp + '.MP4');

var req = http.get(downloadFileURL, function(response){
	response.pipe(file);
});