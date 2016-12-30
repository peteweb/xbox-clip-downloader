import download from 'download';
import fs from 'fs';

export default class DownloadHandler {

    constructor(){
        this._filesArray = [];
        this._promiseArray = [];
    }

    generatePromise(fileToGet, logger){
        return new Promise(function (resolve, reject) {

    		var downloadURL = fileToGet.clipDownloadURL;
			var filepath = fileToGet.clipDownloadAbsolutePath;

            if(!fs.existsSync(filepath)){

                var file = fs.createWriteStream(filepath);

                download(downloadURL).pipe(file);

    			file.on('error', function(error){

                    file.close(function(){
                        if(logger){
                            logger("ERROR: Downloading and saving: " + filepath + " failed.");
                            logger("INFO: Deleting messed up file from: " + filepath);
                        }
                        fs.unlink(filepath);
                        reject(error);
                    });

    			});

    			file.on('finish', function() {

    				file.close(function(){
                        if(logger){
                            logger("INFO: Downloading and saving: " + filepath + " was succcessful!");
                        }
                        resolve({
                            success: true
                        });
    				});

    		    });

            } else {
                resolve({
                    success: true
                });
            }

        });
    }

    generatePromiseArray(filesArray, logger){

        if(filesArray.length < 1){

            if(logger){
    			logger("ERROR: we have no files to download - or we've already downloaded all of the files in this response");
            }
			return;

		}

        if(logger){
            logger("We have a response with " + filesArray.length + " videos inside!");
        }

        for (var i = 0; i < filesArray.length; i++) {
            if(i > 9){
                // do nothing - more than 10 can overload low end systems
                logger("INFO: Skipping " + filesArray[i].clipDownloadAbsolutePath + " - run again to get this file...");
            } else {
                logger("INFO: Starting download off for " + filesArray[i].clipDownloadAbsolutePath + "...");
                this._promiseArray[i] = this.generatePromise(filesArray[i], logger);
            }
        }

        return this._promiseArray;

	}

}
