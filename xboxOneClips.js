/**
* Xbox One clip CLI download tool
* Author: @peteweb
* Version: 0.0.1
**/
var versionNumber = '0.0.1';

var mod_getopt = require('posix-getopt');
var Q = require('q');
var cp = require('child_process');

var parser,
	option,
	xboxOneApiKey,
	xboxOneGamertag,
	downloadDirectory = null;
var verbose = '';
var count = 0;

var kHelptext = "-k must be a string that matches your xboxapi.com apikey";
var tHelptext = "-t must be a string that matches a valid Xbox One gamertag";
var dHelptext = "-d must be a string that points towards a valid, writable, directory";

//parser = new mod_getopt.BasicParser('abo:(output)', process.argv);

xboxOneApiKey = process.argv[2];
downloadDirectory = process.argv[3];
xboxOneGamertag = process.argv[4];
showVerboseInformation = process.argv[5];

if(showVerboseInformation === 1){
	verbose = ' 1';
	console.log('This process will use the following supplied information:');
	console.log("xboxapi.com API key: " + xboxOneApiKey);
	console.log("Download directory: " + downloadDirectory);
	console.log("Xbox Gamertag: " + xboxOneGamertag);
}

var getClipsDeferred = Q.defer();

cp.exec('node getXboxOneGameClips.js "' + xboxOneApiKey + '" "' + downloadDirectory + '" "' + xboxOneGamertag + '"' + verbose, function(error,stdout,stderr){
	if(error !== null){
		// we encountered an error
		console.log('Fallen at the first hurdle - we hit an error with executing the script to get game clips. Is your API key correct? Does your gamertag exist? And does your chosen directory allow node to write to it?');
		console.log('The specific error we saw was:');
		console.log(stderr);
		getClipsDeferred.reject(error);
	} else {
		if(showVerboseInformation === 1){
			console.log(stdout);
			console.log('Passed the first hurdle!');
		}
		getClipsDeferred.resolve(stdout);
	}
});

var clipIndex = 0;
var stopAll = false;

var recursiveCallback = function(data, callback){
	if(stopAll){
		// we're all done
		return;
	} else {
		return Q.defer().then(callback);
	}
};

function clipsResponsePromise(result){
	var prom = Q.defer();
	count++;
	console.log('Starting promise chain step ' + count);

	cp.exec('node parseXboxOneGameClipsResponse.js "'
		+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
		+ downloadDirectory + '" "'
		+ xboxOneGamertag + '"',
		function(error,stdout,stderr){
			console.log(stdout);
			prom.resolve(true);
		});

	return prom.promise;
}

return getClipsDeferred
	.promise
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(clipsResponsePromise)
	.then(function(){
		console.log('All 30 promise chains are finished - run again if required.');
	});
