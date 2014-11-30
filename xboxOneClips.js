var mod_getopt = require('posix-getopt');
var Q = require('q');
var cp = require('child_process');

var parser,
	option,
	xboxOneApiKey,
	xboxOneGamertag,
	downloadDirectory = null;
var verbose = '';
var resPromise1,resPromise2,resPromise3,resPromise4,resPromise5,resPromise6,resPromise7,resPromise8,resPromise9,resPromise10,
	resPromise11,resPromise12,resPromise13,resPromise14,resPromise15,resPromise16,resPromise17,resPromise18,resPromise19,resPromise20,
	resPromise21,resPromise22,resPromise23,resPromise24,resPromise25,resPromise26,resPromise27,resPromise28,resPromise29,resPromise30 = Q.defer();


var kHelptext = "-k must be a string that matches your xboxapi.com apikey";
var tHelptext = "-t must be a string that matches a valid Xbox One gamertag";
var dHelptext = "-d must be a string that points towards a valid, writable, directory";

parser = new mod_getopt.BasicParser('abo:(output)', process.argv);

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

return getClipsDeferred
	.promise
	.then(function(result){
		var resPromise1 = Q.defer();
		console.log('starting promise chain step 1');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise1.resolve(true);
			});
		return resPromise1.promise;
	})
	.then(function(result){
		var resPromise2 = Q.defer();
		console.log('starting promise chain step 2');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise2.resolve(true);
			});
		return resPromise2.promise;
	})
	.then(function(result){
		var resPromise3 = Q.defer();
		console.log('starting promise chain step 3');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise3.resolve(true);
			});
		return resPromise3.promise;
	})
	.then(function(result){
		var resPromise4 = Q.defer();
		console.log('starting promise chain step 4');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise4.resolve(true);
			});
		return resPromise4.promise;
	})
	.then(function(result){
		var resPromise5 = Q.defer();
		console.log('starting promise chain step 5');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise5.resolve(true);
			});
		return resPromise5.promise;
	})
	.then(function(result){
		var resPromise6 = Q.defer();
		console.log('starting promise chain step 6');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise6.resolve(true);
			});
		return resPromise6.promise;
	})
	.then(function(result){
		var resPromise7 = Q.defer();
		console.log('starting promise chain step 7');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise7.resolve(true);
			});
		return resPromise7.promise;
	})
	.then(function(result){
		var resPromise8 = Q.defer();
		console.log('starting promise chain step 8');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise8.resolve(true);
			});
		return resPromise8.promise;
	})
	.then(function(result){
		var resPromise9 = Q.defer();
		console.log('starting promise chain step 9');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise9.resolve(true);
			});
		return resPromise9.promise;
	})
	.then(function(result){
		var resPromise10 = Q.defer();
		console.log('starting promise chain step 10');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise10.resolve(true);
			});
		return resPromise10.promise;
	})
	.then(function(result){
		var resPromise11 = Q.defer();
		console.log('starting promise chain step 11');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise11.resolve(true);
			});
		return resPromise11.promise;
	})
	.then(function(result){
		var resPromise12 = Q.defer();
		console.log('starting promise chain step 12');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise12.resolve(true);
			});
		return resPromise12.promise;
	})
	.then(function(result){
		var resPromise13 = Q.defer();
		console.log('starting promise chain step 13');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise13.resolve(true);
			});
		return resPromise13.promise;
	})
	.then(function(result){
		var resPromise14 = Q.defer();
		console.log('starting promise chain step 14');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise14.resolve(true);
			});
		return resPromise14.promise;
	})
	.then(function(result){
		var resPromise15 = Q.defer();
		console.log('starting promise chain step 15');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise15.resolve(true);
			});
		return resPromise15.promise;
	})
	.then(function(result){
		var resPromise16 = Q.defer();
		console.log('starting promise chain step 16');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise16.resolve(true);
			});
		return resPromise16.promise;
	})
	.then(function(result){
		var resPromise17 = Q.defer();
		console.log('starting promise chain step 17');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise17.resolve(true);
			});
		return resPromise17.promise;
	})
	.then(function(result){
		var resPromise18 = Q.defer();
		console.log('starting promise chain step 18');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise18.resolve(true);
			});
		return resPromise18.promise;
	})
	.then(function(result){
		var resPromise19 = Q.defer();
		console.log('starting promise chain step 19');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise19.resolve(true);
			});
		return resPromise19.promise;
	})
	.then(function(result){
		var resPromise10 = Q.defer();
		console.log('starting promise chain step 20');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise20.resolve(true);
			});
		return resPromise20.promise;
	})
	.then(function(result){
		var resPromise21 = Q.defer();
		console.log('starting promise chain step 21');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise21.resolve(true);
			});
		return resPromise21.promise;
	})
	.then(function(result){
		var resPromise22 = Q.defer();
		console.log('starting promise chain step 22');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise22.resolve(true);
			});
		return resPromise22.promise;
	})
	.then(function(result){
		var resPromise23 = Q.defer();
		console.log('starting promise chain step 23');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise23.resolve(true);
			});
		return resPromise23.promise;
	})
	.then(function(result){
		var resPromise24 = Q.defer();
		console.log('starting promise chain step 24');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise24.resolve(true);
			});
		return resPromise24.promise;
	})
	.then(function(result){
		var resPromise25 = Q.defer();
		console.log('starting promise chain step 25');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise25.resolve(true);
			});
		return resPromise25.promise;
	})
	.then(function(result){
		var resPromise26 = Q.defer();
		console.log('starting promise chain step 26');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise26.resolve(true);
			});
		return resPromise26.promise;
	})
	.then(function(result){
		var resPromise27 = Q.defer();
		console.log('starting promise chain step 27');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise27.resolve(true);
			});
		return resPromise27.promise;
	})
	.then(function(result){
		var resPromise28 = Q.defer();
		console.log('starting promise chain step 28');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise28.resolve(true);
			});
		return resPromise28.promise;
	})
	.then(function(result){
		var resPromise29 = Q.defer();
		console.log('starting promise chain step 29');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise29.resolve(true);
			});
		return resPromise29.promise;
	})
	.then(function(result){
		var resPromise30 = Q.defer();
		console.log('starting promise chain step 30');
		cp.exec('node parseXboxOneGameClipsResponse.js "'
			+ downloadDirectory + '/' + xboxOneGamertag + 'Clips" "'
			+ downloadDirectory + '" "'
			+ xboxOneGamertag + '"',
			function(error,stdout,stderr){
				console.log(stdout);
				resPromise30.resolve(true);
			});
		return resPromise30.promise;
	});