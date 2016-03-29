var proxyquire =  require('proxyquire');

describe("helper.js works as expected", function() {

    var testing = proxyquire('../../libs/helper.js', {});

    it("can determine bad values through isNotNullUndefinedEmpty", function() {
        expect(testing.isNotNullUndefinedEmpty("")).toBe(false);
        expect(testing.isNotNullUndefinedEmpty(null)).toBe(false);
        expect(testing.isNotNullUndefinedEmpty(undefined)).toBe(false);
    });

    it("can determine good values through isNotNullUndefinedEmpty", function() {
        expect(testing.isNotNullUndefinedEmpty("a")).toBe(true);
        expect(testing.isNotNullUndefinedEmpty(1)).toBe(true);
        expect(testing.isNotNullUndefinedEmpty(["hello"])).toBe(true);
        expect(testing.isNotNullUndefinedEmpty({hello:'there'})).toBe(true);
    });

    it("will find an argument, if it exists", function(){
        expect(testing.weHaveArgFor(["-f"], "-f")).toBe(true);
    });

    it("will not find an argument, if it exists", function(){
        expect(testing.weHaveArgFor(["-e"], "-f")).toBe(false);
    });

    it("will get an argument, if it exists", function(){
        expect(testing.getArgFor(["-f", "option"], "-f")).toEqual("option");
    });
    
});
