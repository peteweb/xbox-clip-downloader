var http = require('https');
var fs = require('fs');
var helper = require('./libs/helper.js');
var args = process.argv;

var xboxOneApiKey = helper.getArgFor(args, "-k");
var downloadDirectory = helper.getArgFor(args, "-d");
var xboxOneGamertag = helper.getArgFor(args, "-t");

var showVerboseInformation = false;
if(helper.weHaveArgFor(args, "-v")){
	showVerboseInformation = true;
	console.log('Requesting a list of game clips, using with the following details:');
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
	var file = fs.createWriteStream(downloadDirectory + '/' + xboxOneGamertag + 'Clips.json');

	response.pipe(file);

	response.on('finish', function () {
		if(showVerboseInformation){
			console.log('All done! Xbox clips file saved to: '
				+ downloadDirectory
				+ '/'
				+ xboxOneGamertag
				+ 'Clips.json');
		}
		// return;
	});
}

var req = http.request(options, callback);

req.end();
