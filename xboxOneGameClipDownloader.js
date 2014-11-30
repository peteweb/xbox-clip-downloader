var http = require('http');
var fs = require('fs');

var gameName = process.argv[2];
var recordedDateStamp = process.argv[3];
var fileDirectory = process.argv[4];
var downloadFileURL = process.argv[5];
var gamertag = process.argv[6];

var file = fs.createWriteStream(fileDirectory + '/' + gamertag + '-' + gameName + '-' + recordedDateStamp + '.MP4');

var req = http.get(downloadFileURL, function(response){
	// pipe the response to the file
	response.pipe(file);

	file.on('error', function(error){
		console.log('Something went wrong trying to download the clip from this URL: ' + downloadFileURL);
		console.log('Does the directory: ' + fileDirectory + ' have read / write access allowed for node?');
		console.log('The specific error seen was:');
		console.log(error);
	});

	file.on('finish', function() {
      file.close(function(){
      	console.log('Finished processing: ' + gamertag + '-' + gameName + '-' + recordedDateStamp + '.MP4');
      });
    });
});