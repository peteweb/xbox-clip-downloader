var fs = require('fs');
var cp = require('child_process');
var Q = require('q');
var http = require('http');

var args = process.argv;

var model = {
	currentClip: 0,
	response: {},
	fileDir: '',
	gamertag: '',
	downloadArray: [],
	parseResponse: function(callback){

		for (var i = model.response.length - 1; i >= 0; i--) {

			for (var p = model.response[i].gameClipUris.length - 1; p >= 0; p--) {
				var pathToFile = model.fileDir + '/' + model.gamertag + '-' + model.response[i].titleName.replace(/\W+/g, "") + '-' + model.response[i].dateRecorded.replace(/\W+/g, "-") + '.MP4';

				if(model.response[i].gameClipUris[p].uriType === 'Download' && !fs.existsSync(pathToFile)){
					model.downloadArray.push({
						'recordedDate':model.response[i].dateRecorded,
						'recordedDateFriendly':model.response[i].dateRecorded.replace(/\W+/g, "-"),
						'clipTitle':model.response[i].titleName,
						'clipTitleFriendly':model.response[i].titleName.replace(/\W+/g, ""),
						'clipDownloadURL':model.response[i].gameClipUris[p].uri,
						'clipDownloadDir':model.fileDir,
						'clipDownloadAbsolutePath':pathToFile
					});
				}
			};
		};

		callback();

	},
	downloadFile: function(callback) {

	    if(model.currentClip <= 2) {

	        var download = model.downloadArray[model.currentClip].clipDownloadURL;
	        var file = fs.createWriteStream(model.downloadArray[model.currentClip].clipDownloadAbsolutePath);

	        http.get(download, function(response) {

	        	// pipe the response to the file
				response.pipe(file);

				file.on('error', function(error){
					callback(error);
					if(model.currentClip === 2){
						process.exit(1);
					}
				});

				file.on('finish', function() {
					file.close(function(){
						callback();
						model.downloadFile(callback);
					});
			    });

	        });

	    }
	}
};

model.response = require(process.argv[2]);
model.fileDir = process.argv[3];
model.gamertag = process.argv[4];

model.parseResponse(function(){
	model.downloadFile(function(error) {
		if(error){
			console.log("Download for "
		    	+ model.gamertag
		    	+ '-'
		    	+ model.downloadArray[model.currentClip].clipTitleFriendly
		    	+ '-'
		    	+ model.downloadArray[model.currentClip].recordedDateFriendly
		    	+ " fell over.");
				console.log('The specific error seen was:');
				console.log(error);
		} else {
			console.log("Download for "
		    	+ model.gamertag
		    	+ '-'
		    	+ model.downloadArray[model.currentClip].clipTitleFriendly
		    	+ '-'
		    	+ model.downloadArray[model.currentClip].recordedDateFriendly
		    	+ " complete.");
				if(model.currentClip === 2){
					process.exit();
				}
		}
		model.currentClip++;
	});
});
