"use strict";

var tc = require("../"),
    conf = require("./conf/test-values"),
    chai = require("chai"),
    expect = chai.expect;

describe("TeamCity API", function () {

    describe("#getProjects()", function () {
        this.timeout(5000);

        it("should work on test server", function (finished) {
            _testAllProjects(conf.testServer, finished);
        });

        //TODO inconsistencies in the API results making common testing difficult, "BuildTemplates" vs "projectxxx"
//        it("should work on production server", function (finished) {
//            _testAllProjects(conf.prodServer, finished);
//        });
    });
});

/**
 * Validates some of the results returned from a Projects lookup of a TeamCity Server
 * @param conf The configuration details of the TC Server
 * @param finished The callback to invoke when we are finished with async testing
 * @private
 */
function _testAllProjects(conf, finished) {
    var teamcity = tc.createApi(conf);

    function validateProjects(projects) {
        expect(projects).to.be.an.object;
//        console.log(JSON.stringify(Object.keys(projects)));
        expect(Object.keys(projects)).to.contain("BuildTemplates");
        finished();
    }

    teamcity.getProjects().then(validateProjects).done();
}