"use strict";

var http = require("http-api-utils").http,
    ApiError = require("../errors"),
    objectUtil = require("../util/object-util"),
    ProjectLocator = require("./locators/project-locator"),
    VcsRootLocator = require("./locators/vcsroot-locator"),
    versionApi = require("./version"),
    projectsApi = require("./projects"),
    vcsRootsApi = require("./vcsroots");

/** ----------------------------------------------------------------------- **\
    TeamCity Installation End Points
\** ----------------------------------------------------------------------- **/

module.exports.version = function (config) {
    return _invokeCommand(config, versionApi);
};

/** ----------------------------------------------------------------------- **\
    Project End Points
\** ----------------------------------------------------------------------- **/

module.exports.projects = function (config) {
    return _invokeCommand(config, projectsApi.projects);
};

/**
 * Gets the details of a project from the TeamCity Server
 * @param config The config for TeamCity Server connection
 * @param project An object with either "id" or "name" value identifying the project
 * @returns {*}
 */
module.exports.project = function (config, project) {
    var lookupConfig = objectUtil.copy(config);
    lookupConfig.values = {"projectLocator": new ProjectLocator(project)};

    return _invokeCommand(lookupConfig, projectsApi.project);
};


/** ----------------------------------------------------------------------- **\
    VCS Root End Points
\** ----------------------------------------------------------------------- **/

/**
 * Obtains all the VCS Roots in the TeamCity instance.
 * @param config The config for the TeamCity instance to connect to.
 * @returns {*} An object of the format{"id": {"id", "name", "href"}, ...}
 */
module.exports.vcsRoots = function (config) {
    return _invokeCommand(config, vcsRootsApi.vcsRoots);
};

/**
 * Obtains the details for a particular VCS Root in TeamCity.
 * @param config The config for the TeamCity instance to connect to.
 * @param vcsRoot An object identifying the vcsRoot locator details, which currently is an "id" property.
 * @returns {*} The details for the VCS Root (unmodified from the TC REST api documentation)
 */
module.exports.vcsRoot = function (config, vcsRoot) {
    var lookupConfig = objectUtil.copy(config);
    lookupConfig.values = {"vcsRootLocator": new VcsRootLocator(vcsRoot)};

    return _invokeCommand(lookupConfig, vcsRootsApi.vcsRoot);
};

module.exports.createVcsRoot = function(config, vcsRoot) {
    // Need to build up an XML form of the VCS Root we wish to create


    return _invokeCommand(vcsRootConfig, vcsRootsApi.create);
};


// ----------------------------------------------------------------------------

function _invokeCommand(config, api) {
    return http.invoke(api, config)
}

function isJson(str) {
    return str === "application/json";
}