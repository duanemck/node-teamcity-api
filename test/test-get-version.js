"use strict";

var tc = require("../"),
    conf = require("./conf/test-values"),
    chai = require("chai"),
    expect = chai.expect;

describe("TeamCity API", function () {

    describe("#version()", function () {
        this.timeout(5000);

        it("should work on test server", function (done) {
            _testVersion(conf.testServer, done);
        });

        //TODO
//        it("should work on production server", function (done) {
//            _testVersion(conf.prodServer, done);
//        });
    });
});

/**
 * Validates the version of a TeamCity Server
 * @param conf The configuration details of the TC Server
 * @param done The callback to invoke when we are finished with async testing
 * @private
 */
function _testVersion(conf, done) {
    var teamcity = tc.createApi(conf);

    function validateVersion(version) {
        expect(version).to.equal(conf.tc_version);
        done();
    }

    teamcity.getVersion()
        .then(validateVersion)
        .fail(function (err) {
                  console.log(JSON.stringify(err));
                      done();
              })
        .done();
}