var http = require('https');
var fs = require('fs');

var xboxOneApiKey = process.argv[2];
var fileDirectory = process.argv[3];
var xboxOneGamertag = process.argv[4];
var showVerboseInformation = process.argv[5];

if(showVerboseInformation === 1){
	console.log('Requesting a list of game clips, using with the following details...');
	console.log("xboxapi.com API key: " + xboxOneApiKey);
	console.log("Download directory: " + downloadDirectory);
	console.log("Xbox Gamertag: " + xboxOneGamertag);
}

var options = {
	host: 'xboxapi.com',
	path: '/v2/' + xboxOneGamertag + '/game-clips',
	port: 443,
	headers: {
		'accept': '*/*',
		'X-AUTH': xboxOneApiKey
	}
};

var callback = function(response) {
	var str = '';
	var file = fs.createWriteStream(fileDirectory + '/' + xboxOneGamertag + 'Clips.json');

	response.pipe(file);
	
	response.on('end', function () {
		if(showVerboseInformation === 1){
			console.log('All done! Xbox clips file saved to: '
				+ downloadDirectory
				+ '/'
				+ xboxOneGamertag
				+ 'Clips.json');
		}
		return;
	});
}

var req = http.request(options, callback);

req.end();