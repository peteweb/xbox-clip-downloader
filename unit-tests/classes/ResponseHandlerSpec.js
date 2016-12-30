import 'babel-polyfill';
import assert from 'assert';
import path from 'path';

import ResponseHandler from "../../classes/ResponseHandler";

describe('classes/ResponseHandler', function() {

    var classInstance;

    beforeEach(() => {
        classInstance = new ResponseHandler();
    });

    describe('#currentClip', function() {

        it('should return the correct default value', function() {
            assert.equal(classInstance.currentClip, 0);
        });

        it('should set the a value correctly', function() {
            assert.equal(classInstance.currentClip, 0);
            classInstance.currentClip = 1;
            assert.equal(classInstance.currentClip, 1);
        });

    });

    describe('#response', function() {

        it('should return the correct default value', function() {
            var emptyObj = {};
            assert.deepEqual(classInstance.response, emptyObj);
        });

        it('should set the a value correctly', function() {
            assert.deepEqual(classInstance.response, {});
            classInstance.response = {name:'name'};
            assert.deepEqual(classInstance.response, {name:'name'});
        });

    });

    describe('#fileDir', function() {

        it('should return the correct default value', function() {
            assert.equal(classInstance.fileDir, '');
        });

        it('should set the a value correctly', function() {
            assert.equal(classInstance.fileDir, '');
            classInstance.fileDir = '/path/to/thing';
            assert.equal(classInstance.fileDir, '/path/to/thing');
        });

    });

    describe('#gamertag', function() {

        it('should return the correct default value', function() {
            assert.equal(classInstance.gamertag, '');
        });

        it('should set the a value correctly', function() {
            assert.equal(classInstance.gamertag, '');
            classInstance.gamertag = 'gamertaghere';
            assert.equal(classInstance.gamertag, 'gamertaghere');
        });

    });

    describe('#downloadArray', function() {

        it('should return the correct default value', function() {
            var emptyArr = [];
            assert.deepEqual(classInstance.downloadArray, emptyArr);
        });

        it('should set the a value correctly', function() {
            assert.deepEqual(classInstance.downloadArray, []);
            classInstance.downloadArray = ['one','two','three'];
            assert.deepEqual(classInstance.downloadArray, ['one','two','three']);
        });

    });

    describe('#createAbsoluteFilepath()', function() {

        it('should return the correct filename when valid gamertag and fileDir properties are set', function() {
            classInstance.gamertag = 'gamertaghere';
            classInstance.fileDir = '/path/to/save/videos/at';

            var filename = classInstance.createAbsoluteFilepath('2016-12-04 08:15:01', 'Halo 5 Guardians');
            assert.equal(filename, '/path/to/save/videos/at/gamertaghere-Halo5Guardians-2016-12-04-08-15-01.MP4');
        });

    });

    describe('#createObject()', function() {

        it('should create a download object correctly', function() {
            classInstance.gamertag = 'gamertaghere';
            classInstance.fileDir = '/path/to/save/videos/at';

            var createdObject = classInstance.createObject('2016-12-04 08:15:01', 'Halo 5 Guardians', 'http://domain.com/file.mp4');
            var expected = {
                recordedDate: '2016-12-04 08:15:01',
                recordedDateFriendly: '2016-12-04-08-15-01',
                clipTitle: 'Halo 5 Guardians',
                clipTitleFriendly: 'Halo5Guardians',
                clipDownloadURL: 'http://domain.com/file.mp4',
                clipDownloadDir: '/path/to/save/videos/at',
                clipDownloadAbsolutePath: '/path/to/save/videos/at/gamertaghere-Halo5Guardians-2016-12-04-08-15-01.MP4'
            };
            assert.deepEqual(createdObject, expected);
        });

    });

    describe('#parseResponse()', function() {

        it('should parse a response object correctly', function() {
            classInstance.gamertag = 'gamertaghere';
            classInstance.fileDir = '/path/to/save/videos/at';
            var sampleResponse = [
                {
                    "titleName": "Halo 5: Guardians",
                    "dateRecorded": "2016-12-01 12:01:01",
                    "gameClipUris":[{
                        "uri": "http://domain.com/fileA.mp4",
                        "fileSize": 12345678,
                        "uriType": "Download",
                        "expiration": "2016-12-26 01:01:01"
                    }]
                },
                {
                    "titleName": "Halo 5: Guardians",
                    "dateRecorded": "2016-12-02 12:01:01",
                    "gameClipUris":[{
                        "uri": "http://domain.com/fileB.mp4",
                        "fileSize": 12345678,
                        "uriType": "Download",
                        "expiration": "2016-12-26 01:01:01"
                    }]
                }
            ];
            var createdObject = classInstance.parseResponse(sampleResponse);
            var expected = [{
                recordedDate: '2016-12-02 12:01:01',
                recordedDateFriendly: '2016-12-02-12-01-01',
                clipTitle: 'Halo 5: Guardians',
                clipTitleFriendly: 'Halo5Guardians',
                clipDownloadURL: 'http://domain.com/fileB.mp4',
                clipDownloadDir: '/path/to/save/videos/at',
                clipDownloadAbsolutePath: '/path/to/save/videos/at/gamertaghere-Halo5Guardians-2016-12-02-12-01-01.MP4'
            },{
                recordedDate: '2016-12-01 12:01:01',
                recordedDateFriendly: '2016-12-01-12-01-01',
                clipTitle: 'Halo 5: Guardians',
                clipTitleFriendly: 'Halo5Guardians',
                clipDownloadURL: 'http://domain.com/fileA.mp4',
                clipDownloadDir: '/path/to/save/videos/at',
                clipDownloadAbsolutePath: '/path/to/save/videos/at/gamertaghere-Halo5Guardians-2016-12-01-12-01-01.MP4'
            }];
            assert.deepEqual(classInstance.downloadArray, expected);
        });

    });

});
