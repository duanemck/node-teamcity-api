"use strict";

var tc = require("../"),
    conf = require("./conf/test-values"),
    chai = require("chai"),
    expect = chai.expect;

describe("TeamCity API", function () {

    describe("#getVcsRoot()", function () {
        this.timeout(5000);

        it("should work on test server", function (finished) {
            var client = tc.createApi(conf.testServer);

            client.getVcsRoot("NodeHueApi_PeterMurrayNodeHueApiGit").then(function (root) {
                var url = null;

                console.log(JSON.stringify(root, null, 2));

                expect(root).to.be.an.object;

                expect(root).to.have.property("id").to.equal("NodeHueApi_PeterMurrayNodeHueApiGit");
                expect(root).to.have.property("name").to.equal("peter-murray/node-hue-api.git");
                expect(root).to.have.property("vcsName").to.equal("jetbrains.git");
                expect(root).to.have.property("status");
                expect(root).to.have.property("lastChecked");
                expect(root).to.have.property("project");
                expect(root).to.have.property("properties");

                expect(root.properties).to.have.property("property");

                expect(root.properties.property).to.be.an("array");
                // Extract the URL for the git repo
                root.properties.property.forEach(function(prop) {
                    if (prop.name === "url") {
                        url = prop.value;
                    }
                });
                expect(url).to.equal("https://github.com/peter-murray/node-hue-api.git");

                finished();
            }).done();
        });
    });
});