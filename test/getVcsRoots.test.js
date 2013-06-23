"use strict";

var tc = require("../"),
    conf = require("./conf/test-values"),
    chai = require("chai"),
    expect = chai.expect;

describe("TeamCity API", function () {

    describe("#getVcsRoots()", function () {
        this.timeout(5000);

        it("should work on test server", function (finished) {
            var client = tc.createApi(conf.testServer);

            client.getVcsRoots().then(function (roots) {
                var rootId = "NodeHueApi_PeterMurrayNodeHueApiGit";

                expect(roots).to.be.an.object;

                // There should be a large number of VCS Roots
                expect(Object.keys(roots)).to.have.length.at.least(1);

                expect(roots).to.have.property(rootId);

                // Check the details of one of the VCS Roots
                expect(roots[rootId]).to.have.property("id").to.equal("NodeHueApi_PeterMurrayNodeHueApiGit");
                expect(roots[rootId]).to.have.property("name").to.equal("peter-murray/node-hue-api.git");
                expect(roots[rootId]).to.have.property("href");

                finished();
            }).done();
        });
    });
});