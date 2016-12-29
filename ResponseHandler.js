import fs from 'fs';

export default class ResponseHandler {

    constructor(){
        this._currentClip = 0;
        this._response = {};
        this._fileDir = '';
        this._gamertag = '';
        this._downloadArray = [];
    }

    get currentClip() {
        return this._currentClip;
    }

    set currentClip(resp){
        this._currentClip = resp;
    }

	get response() {
        return this._response;
    }

    set response(resp){
        this._response = resp;
    }

    get fileDir() {
        return this._fileDir;
    }

    set fileDir(dir){
        this._fileDir = dir;
    }

    get gamertag() {
        return this._gamertag;
    }

    set gamertag(tag){
        this._gamertag = tag;
    }

    get downloadArray() {
        return this._downloadArray;
    }

    set downloadArray(arr){
        this._downloadArray = arr;
    }

    createAbsoluteFilepath(dateRecorded, titleName){
        return this.fileDir + '/' + this.gamertag + '-' + titleName.replace(/\W+/g, "") + '-' + dateRecorded.replace(/\W+/g, "-") + '.MP4';
    }

    createObject(dateRecorded, titleName, gameClipUri){
        return {
            'recordedDate': dateRecorded,
            'recordedDateFriendly': dateRecorded.replace(/\W+/g, "-"),
            'clipTitle': titleName,
            'clipTitleFriendly': titleName.replace(/\W+/g, ""),
            'clipDownloadURL': gameClipUri,
            'clipDownloadDir': this.fileDir,
            'clipDownloadAbsolutePath': this.createAbsoluteFilepath(dateRecorded, titleName)
        };
    }

	parseResponse(response){
        if(response === {}){
            // die quick
            return;
        } else {
            this.response = response;
            for (var i = this.response.length - 1; i >= 0; i--) {
                if(this.response && this.response[i] && this.response[i].gameClipUris && this.response[i].gameClipUris.length){
                    for (var p = this.response[i].gameClipUris.length - 1; p >= 0; p--) {
                        var pathToFile = this.createAbsoluteFilepath(this.response[i].dateRecorded, this.response[i].titleName);
                        if(!fs.existsSync(pathToFile) && this.response[i].gameClipUris[p].uriType === 'Download'){
                            var obj = this.createObject(this.response[i].dateRecorded, this.response[i].titleName, this.response[i].gameClipUris[p].uri)
                            this._downloadArray.push(obj);
                        }
                    }
                }
            }
        }
	}
}
