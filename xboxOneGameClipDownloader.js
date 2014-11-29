var http = require('http');
var fs = require('fs');

var gameName,
	recordedDateStamp,
	fileDirectory,
	downloadFileURL;

gameName = 'DefaultName';
recordedDateStamp = 'dateStamp';
fileDirectory = '/Users/Pete/Desktop/downloadedXBVideos';
downloadFileURL;

var file = fs.createWriteStream(fileDirectory + '/' + gameName + recordedDateStamp + '.MP4');