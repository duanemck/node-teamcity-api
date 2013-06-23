///httpAuth/app/rest/vcs-roots/<vcsRootLocator>
"use strict";

var Trait = require("traits").Trait,
    endPointTrait = require("http-api-utils").traits.endPoint,
    postProcessingTrait = require("http-api-utils").traits.postProcessing,
    bodyArgumentsTrait = require("http-api-utils").traits.bodyArguments,
    endPoints = {};

module.exports = endPoints;

endPoints.vcsRoots = Trait.create(
    Object.prototype,
    Trait.compose(
        endPointTrait.create({
                                 "path"    : "/httpAuth/app/rest/vcs-roots",
                                 "method"  : "GET",
                                 "response": "application/json"
                             }),
        postProcessingTrait.create(_vcsRootsProcessor)
    )
);

endPoints.vcsRoot = Trait.create(
    Object.prototype,
    endPointTrait.create({
                             "path"    : "/httpAuth/app/rest/vcs-roots/<vcsRootLocator>",
                             "method"  : "GET",
                             "response": "application/json"
                         })
);

endPoints.create = Trait.create(
    Object.prototype,
    Trait.compose(
        endPointTrait.create({
                                 "path"    : "/httpAuth/app/rest/vcs-roots",
                                 "method"  : "POST",
                                 "response": "application/json"
                             }),
        bodyArgumentsTrait.create("application/xml",
                                  [
                                      {"name": "xml", "type": "string", "optional": false}
                                  ])
    )
);

function _vcsRootsProcessor(roots) {
    var result = {};

    if (roots) {
        roots["vcs-root"].forEach(function (root) {
            result[root.id] = root;
        });
    }

    return result;
}

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