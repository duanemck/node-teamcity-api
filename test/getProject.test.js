"use strict";

var tc = require("../"),
    conf = require("./conf/test-values"),
    chai = require("chai"),
    expect = chai.expect;

describe("TeamCity API", function () {

    describe("#getProject()", function () {
        this.timeout(5000);

        var missingProject = "xyz"

        function validateProjectNotFound(cb) {
            return function(result) {
                expect(result.type).to.equal("Response Error");
                expect(result.message).to.contain("404");
                expect(result.path).to.contain(missingProject);

                cb();
            }
        }

        it("should get 'Build Templates' by 'id' from test server", function (finished) {
            var teamcity = tc.createApi(conf.testServer);
            teamcity.getProjectById("BuildTemplates").then(_validateBuildTemplates(finished)).done();
        });

        it("should get 'Build Templates' by 'name' from test server", function (finished) {
            var teamcity = tc.createApi(conf.testServer);
            teamcity.getProjectByName("Build Templates").then(_validateBuildTemplates(finished)).done();
        });

        it("should not find a non-existent project by 'id'", function(finished) {
            var teamcity = tc.createApi(conf.testServer);
            teamcity.getProjectById(missingProject).then(_failTest).fail(validateProjectNotFound(finished)).done();
        });

        it("should not find a non-existent project by 'name'", function (finished) {
            var teamcity = tc.createApi(conf.testServer);
            teamcity.getProjectByName(missingProject).then(_failTest).fail(validateProjectNotFound(finished)).done();
        });
    });
});

function _validateBuildTemplates(finished) {
    return function validateProject(p) {
        expect(p).to.be.an.object;

        expect(p).to.have.property("id").to.equal("BuildTemplates");
        expect(p).to.have.property("name").to.equal("Build Templates");
        expect(p).to.have.property("archived").to.be.false;

        expect(p).to.have.property("templates");
        expect(p.templates).to.have.property("buildType");
        expect(p.templates.buildType).to.have.length.at.least(1);

        finished();
    }
}

function _failTest() {
    throw new Error("Should not have been called");
}