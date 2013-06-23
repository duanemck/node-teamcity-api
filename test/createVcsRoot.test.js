"use strict";

var tc = require("../"),
    conf = require("./conf/test-values"),
    chai = require("chai"),
    expect = chai.expect;

/*
 <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 <vcs-root id="NodeHueApi_PeterMurrayNodeHueApiGit" name="peter-murray/node-hue-api.git" vcsName="jetbrains.git" status="FINISHED" lastChecked="20130623T184329+0100" href="/httpAuth/app/rest/vcs-roots/id:NodeHueApi_PeterMurrayNodeHueApiGit">
 <project id="NodeHueApi" name="node-hue-api" href="/httpAuth/app/rest/projects/id:NodeHueApi"/>
 <properties>
 <property name="agentCleanFilesPolicy" value="ALL_UNTRACKED"/>
 <property name="agentCleanPolicy" value="ON_BRANCH_CHANGE"/>
 <property name="authMethod" value="PRIVATE_KEY_DEFAULT"/>
 <property name="branch" value="refs/heads/master"/>
 <property name="ignoreKnownHosts" value="true"/>
 <property name="push_url" value="git@github.com:peter-murray/node-hue-api.git"/>
 <property name="reportTagRevisions" value="true"/>
 <property name="submoduleCheckout" value="CHECKOUT"/>
 <property name="url" value="https://github.com/peter-murray/node-hue-api.git"/>
 <property name="username" value="teamcity"/>
 <property name="usernameStyle" value="USERID"/>
 </properties>
 <vcsRootInstances href="/httpAuth/app/rest/vcs-root-instances?locator=vcsRoot:(id:NodeHueApi_PeterMurrayNodeHueApiGit)"/>
 </vcs-root>
 */

describe("TeamCity API", function () {

    describe("#createVcsRoot()", function () {
        this.timeout(5000);

        it ("", function(finished) {
            var teamcity = tc.createApi(conf.testServer),
                vcsRoot = {
//                    "name": "https://github.com/joyent/node.git",
                    "vcsName": "jetbrains.git",
                    "properties": [
                        {"branch": "master"},
                        {"authMethod": "PRIVATE_KEY_DEFAULT"},
                        {"url": "https://github.com/joyent/node.git"},
                        {"push_url": "git@github.com:joyent/node.git"},
                        {"submoduleCheckout": true},
                        {"username": "xxx"},
                        {"ignoreKnownHosts": true}
                    ]
                };

            teamcity.createVcsRoot(vcsRoot).then(function(result) {
                console.log(result);
                finished();
            });
        });
    });
});