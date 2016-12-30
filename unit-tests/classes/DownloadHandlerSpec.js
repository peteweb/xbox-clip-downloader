import 'babel-polyfill';
import assert from 'assert';
import path from 'path';

import DownloadHandler from "../../classes/DownloadHandler";

describe('classes/DownloadHandler', function() {

    var classInstance;

    beforeEach(() => {
        classInstance = new DownloadHandler();
    });

    describe('#_filesArray', function() {
        it('should return the correct default value', function() {
            assert.deepEqual(classInstance._filesArray, []);
        });
    });

});
