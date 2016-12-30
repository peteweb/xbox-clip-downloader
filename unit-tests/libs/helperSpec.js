import 'babel-polyfill';
import assert from 'assert';
import path from 'path';

var helper;

describe('lib/helper', function() {

    beforeEach(() => {
        helper = require('../../libs/helper.js');
    });

    describe('#weHaveArgFor()', function() {

        it('should return false if there is no valid arguement', function() {
            var args = ['--version','0.3.0'];
            var result = helper.weHaveArgFor(args, '-v');
            assert.equal(false, result);
        });

        it('should return true if there is a valid arguement', function() {
            var args = ['--version','0.3.0'];
            var result = helper.weHaveArgFor(args, '--version');
            assert.equal(true, result);
        });

    });

    describe('#getArgFor()', function() {

        it('should return the correct argument when requested', function() {
            var args = ['-t','gamertaghere'];
            var result = helper.getArgFor(args, '-t');
            assert.equal('gamertaghere', result);
        });

    });

    describe('#isNotNullUndefinedEmpty()', function() {

        it('should return true if given a valid string, int, float, object or array', function() {

            var validString = helper.isNotNullUndefinedEmpty('a');
            var validInt = helper.isNotNullUndefinedEmpty(0);
            var validFloat = helper.isNotNullUndefinedEmpty(0.1);
            var validObject = helper.isNotNullUndefinedEmpty({});
            var validArray = helper.isNotNullUndefinedEmpty([]);

            assert.equal(true, validString);
            assert.equal(true, validInt);
            assert.equal(true, validFloat);
            assert.equal(true, validObject);
            assert.equal(true, validArray);

        });

        it('should return false if given an empty string, or a null or undefined value', function() {
            var emptyStringResult = helper.isNotNullUndefinedEmpty('');
            var nullResult = helper.isNotNullUndefinedEmpty(null);
            var undefinedResult = helper.isNotNullUndefinedEmpty(undefined);

            assert.equal(false, emptyStringResult);
            assert.equal(false, nullResult);
            assert.equal(false, undefinedResult);
        });

    });

});
