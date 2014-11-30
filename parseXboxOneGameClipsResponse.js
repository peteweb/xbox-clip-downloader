var fs = require('fs');
var cp = require('child_process');
var Q = require('q');
var http = require('http');

var parsedJSON = require(process.argv[2]);
var fileDir = process.argv[3];
var gamertag = process.argv[4];
var downloadArray = [];

for (var i = parsedJSON.length - 1; i >= 0; i--) {

	for (var p = parsedJSON[i].gameClipUris.length - 1; p >= 0; p--) {
		var pathToFile = fileDir + '/' + gamertag + '-' + parsedJSON[i].titleName.replace(/\W+/g, "") + '-' + parsedJSON[i].dateRecorded.replace(/\W+/g, "-") + '.MP4';

		if(parsedJSON[i].gameClipUris[p].uriType === 'Download' && !fs.existsSync(pathToFile)){
			downloadArray.push({
				'recordedDate':parsedJSON[i].dateRecorded,
				'recordedDateFriendly':parsedJSON[i].dateRecorded.replace(/\W+/g, "-"),
				'clipTitle':parsedJSON[i].titleName,
				'clipTitleFriendly':parsedJSON[i].titleName.replace(/\W+/g, ""),
				'clipDownloadURL':parsedJSON[i].gameClipUris[p].uri,
				'clipDownloadDir':fileDir,
				'clipDownloadAbsolutePath':pathToFile
			});
		}
	};
};

var getSingleClipDefer = Q.defer();
var currentClip = 0;
var promisesPromises = [];


var downloadFile = function(callback) {
    // if(currentClip <= downloadArray.length) {
    if(currentClip <= 2) {

        var download = downloadArray[currentClip].clipDownloadURL;
        var file = fs.createWriteStream(downloadArray[currentClip].clipDownloadAbsolutePath);

        http.get(download, function(response) {
            
        	// pipe the response to the file
			response.pipe(file);

			file.on('error', function(error){
				// console.log('Something went wrong trying to download the clip from this URL: ' + downloadArray[currentClip].clipDownloadURL);
				// console.log('Does the directory: ' + downloadArray[currentClip].clipDownloadDir + ' have read / write access allowed for node?');
				console.log('The specific error seen was:');
				console.log(error);
			});

			file.on('finish', function() {
		      file.close(function(){
		      	console.log('Finished processing.');
		      });
		    });

            currentClip++;
            downloadFile(callback);
        });
    } else {
        callback();
    }
}

downloadFile(function() {
    console.log("Download for "
    	+ gamertag
    	+ '-'
    	+ downloadArray[currentClip].clipTitleFriendly
    	+ '-'
    	+ downloadArray[currentClip].recordedDateFriendly
    	+ " complete.");
});










// var advanceToNextClip = function(dataArray,callback){
// 	if(currentClip <= dataArray.length){

// 		cp.exec('node xboxOneGameClipDownloader.js '
// 			+ '"'
// 			+ dataArray[currentClip].clipTitleFriendly
// 			+ '" "'
// 			+ dataArray[currentClip].recordedDateFriendly
// 			+ '" "'
// 			+ dataArray[currentClip].clipDownloadDir
// 			+ '" "'
// 			+ dataArray[currentClip].clipDownloadURL
// 			+ '" "'
// 			+ gamertag
// 			+ '"',
// 			function(error,stdout,stderr){
// 				if(error){
// 					console.log('error encountered');
// 					console.log(stdout);
// 					console.log(stderr);
// 					getSingleClipDefer.reject(error);
// 				} else {
// 					console.log(stdout);
// 					console.log('Clip downloaded to: ' + dataArray[currentClip].clipDownloadAbsolutePath);
// 					getSingleClipDefer.resolve(stdout);
// 				}
// 				currentClip++;
// 			});

// 		return getSingleClipDefer.promise.then(function(result){
// 			return callback(dataArray,callback);
// 		});

// 	} else {
// 		// all done
// 		return;
// 	}
// }


// var advanceToNextClipCallback = function(dataArray,callback){
// 	if(currentClip <= dataArray.length){

// 		cp.exec('node xboxOneGameClipDownloader.js '
// 			+ '"'
// 			+ dataArray[currentClip].clipTitleFriendly
// 			+ '" "'
// 			+ dataArray[currentClip].recordedDateFriendly
// 			+ '" "'
// 			+ dataArray[currentClip].clipDownloadDir
// 			+ '" "'
// 			+ dataArray[currentClip].clipDownloadURL
// 			+ '" "'
// 			+ gamertag
// 			+ '"',
// 			function(error,stdout,stderr){
// 				if(error){
// 					console.log('error encountered');
// 					console.log(stdout);
// 					console.log(stderr);
// 					getSingleClipDefer.reject(error);
// 				} else {
// 					console.log(stdout);
// 					console.log('Clip downloaded to: ' + dataArray[currentClip].clipDownloadAbsolutePath);
// 					getSingleClipDefer.resolve(stdout);
// 				}
// 				currentClip++;
// 			});

// 		return getSingleClipDefer.promise.then(function(result){
// 			return callback(dataArray,callback);
// 		});
		
// 	} else {
// 		// all done
// 		return;
// 	}
// }





// cp.exec('node xboxOneGameClipDownloader.js '
// 		+ '"'
// 		+ downloadArray[currentClip].clipTitleFriendly
// 		+ '" "'
// 		+ downloadArray[currentClip].recordedDateFriendly
// 		+ '" "'
// 		+ downloadArray[currentClip].clipDownloadDir
// 		+ '" "'
// 		+ downloadArray[currentClip].clipDownloadURL
// 		+ '" "'
// 		+ gamertag
// 		+ '"',
// 		function(error,stdout,stderr){
// 			if(error){
// 				console.log('error encountered');
// 				console.log(stdout);
// 				console.log(stderr);
// 				getSingleClipDefer.reject(error);
// 			} else {
// 				console.log('- - - - - - -');
// 				console.log(stdout);
// 				console.log('Clip downloaded to: ' + downloadArray[currentClip].clipDownloadAbsolutePath + '.MP4');
// 				getSingleClipDefer.resolve(stdout);
// 			}
// 			currentClip++;
// 		}
// 	);

// return getSingleClipDefer.promise.then(function(result){


// 	// console.log(result);
// 	// return advanceToNextClip(downloadArray,advanceToNextClipCallback);
// });

