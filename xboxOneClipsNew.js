/**
* Xbox One clip CLI download tool
* Author: petedoeswebthings@gmail.com
* Version: 0.3.0
**/

const pkg = require('./package.json');
const helper = require('./libs/helper.js');
const mod_getopt = require('posix-getopt');
const Q = require('q');
const cp = require('child_process');
let parser,
	option,
	xboxOneApiKey,
	xboxOneGamertag,
	downloadDirectory = null;
let verbose = '';
let count = 0;
let args = process.argv;
let showVerboseInformation = false;

if(helper.weHaveArgFor(args, "--version")){
	return console.log(pkg.version);
}

if(helper.weHaveArgFor(args, "--help") || helper.weHaveArgFor(args, "-h")){
	return console.log("Some help text");
}

var exPrefix = 'Example: ';

if(!helper.weHaveArgFor(args, "-k") && !helper.isNotNullUndefinedEmpty(helper.getArgFor(args, "-k"))){
	var exampleK = exPrefix + '-k "XBOXAPI_APIKEY_HERE"';
	return console.log("-k must be set to a string that matches your xboxapi.com apikey, inside single or double quotes. " + exampleK);
}

if(!helper.weHaveArgFor(args, "-t") && !helper.isNotNullUndefinedEmpty(helper.getArgFor(args, "-t"))){
	var exampleT = exPrefix + '-t "GAMERTAG_HERE"';
	return console.log("-t must be a string that matches a valid Xbox One gamertag, inside single or double quotes. " + exampleT);
}

if(!helper.weHaveArgFor(args, "-d") && !helper.isNotNullUndefinedEmpty(helper.getArgFor(args, "-d"))){
	var exampleD = exPrefix + '-d "/absolute/path/to/dir/to/save/files/in"';
	return console.log("-d must be a string that points towards a valid, writable, directory - inside single or double quotes. " + exampleD);
}

xboxOneApiKey = helper.getArgFor(args, "-k");
downloadDirectory = helper.getArgFor(args, "-d");
xboxOneGamertag = helper.getArgFor(args, "-t");

if(helper.weHaveArgFor(args, "-v")){
	showVerboseInformation = true;
	verbose = ' -v';
	console.log('This process will use the following supplied information:');
	console.log("xboxapi.com API key: " + xboxOneApiKey);
	console.log("Download directory: " + downloadDirectory);
	console.log("Xbox Gamertag: " + xboxOneGamertag);
}

var responseParser = require('./parseXboxOneGameClipsResponse.js');

cp.exec('node getXboxOneGameClips.js -k "' + xboxOneApiKey + '" -d "' + downloadDirectory + '" -t "' + xboxOneGamertag + '"' + verbose, function(error,stdout,stderr){

	if(error !== null){

		// we encountered an error
		console.log('Fallen at the first hurdle - we hit an error with executing the script to get game clips. Is your API key correct? Does the gamertag exist? Is the chosen directory path absolute and can node to write to it?');
		console.log('The specific error we saw was:');
		console.log(stderr);

	} else {

        if(showVerboseInformation === 1){
			console.log(stdout);
			console.log('Passed the first hurdle!');
		}

        var jsonName = downloadDirectory + '/' + xboxOneGamertag + 'Clips';

        responseParser.setResponse(jsonName);

        responseParser.setFileFir(downloadDirectory);

        responseParser.setGamertag(xboxOneGamertag);

        responseParser.parseResponse(function(allTheFiles){

        	responseParser.downloadAllFiles(allTheFiles, function(response){
                process.exit(0);
            });

        });
	}
});
