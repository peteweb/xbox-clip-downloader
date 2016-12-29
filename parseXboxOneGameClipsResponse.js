var fs = require('fs');
var cp = require('child_process');
var Q = require('q');
var http = require('http');
var downloader = require('download');
var eventEmitter = require('events');

var args = process.argv;

var model = {
	currentClip: 0,
	response: {},
	setResponse: function(jsonFilePath){
		model.response = require(jsonFilePath);
	},
	fileDir: '',
	setFileFir: function(dir){
		model.fileDir = dir;
	},
	gamertag: '',
	setGamertag: function(gt){
		model.gamertag = gt;
	},
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

		callback(model.downloadArray);

	},

	downloadAllFiles: function(filesArray, callback){

		console.log(filesArray);

		return;

		// fs.setMaxListeners((filesArray.length*2));

		if(filesArray.length < 1){

			console.log("ERROR: we have no files to download");
			return;

		} else {

			var i = 0;
			while (filesArray.length >= i) {

				model.currentClip = i;

				var downloadURL = filesArray[i].clipDownloadURL;
				var filepath = filesArray[i].clipDownloadAbsolutePath;
				var file = fs.createWriteStream(filepath);

				downloader(downloadURL).pipe(file);

				file.on('error', function(error){

					console.log("ERROR saving: " + filepath);

					if(model.currentClip === i){
						i++;
						callback(true);
					}

				});

				file.on('finish', function() {

					file.close(function(){

						console.log("SUCCESS saving: " + filepath);

						if(model.currentClip === i){
							i++;
							callback(true);
						}

					});

			    });
			}

			//
			// for (var i = 0; i < filesArray.length; i++) {
			//
			//
			//
			// }

		}


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

module.exports = model;

// model.response = require(process.argv[2]);
// model.fileDir = process.argv[3];
// model.gamertag = process.argv[4];
