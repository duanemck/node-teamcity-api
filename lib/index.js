"use strict";

var restApi = require("./rest-api"),
    ApiError = require("./errors").ApiError;

/**
 * Create a new TeamCity API connection to a TeamCity Server
 * @param config The configuration object for the server,
 * {
 *      "scheme":   "http",
 *      "host":     "server.abc.com",
 *      "port":     443,
 *      "username": "username to authenticate as",
 *      "password": "a password"
 * }
 * @constructor
 */
var TeamCityApi = function (config) {
    var tcConfig = {
        "host": config.host,
        "port"    : config.port,
        "scheme"  : config.scheme || "http"
    };

    // We always need a username and password
    if (!config.username || !config.password) {
        throw new ApiError("Username and Password is required for accessing TeamCity");
    } else {
        tcConfig.headers = {
            "Authorization": "Basic " + new Buffer(config.username + ":" + config.password).toString("base64")
        };
    }
    this._validate(tcConfig);
};
module.exports.TeamCityApi = TeamCityApi;

/**
 * Creates a new instance of a TeamCityApi.
 * @param config
 * @returns {TeamCityApi}
 */
module.exports.createApi = function (config) {
    return new TeamCityApi(config);
};

/**
 * Validates the TeamCIty API for any obvious issues with the configuration provided upon creation.
 * @param tcConfig the configuration to validate
 * @throws {ApiError} if there are any obvious issues.
 * @private
 */
TeamCityApi.prototype._validate = function (tcConfig) {
    //TODO validate the parameters for obvious issues
    this.config = tcConfig;
};

TeamCityApi.prototype.getVersion = function () {
    //TODO work with semver
    return restApi.version(this.config);
};

TeamCityApi.prototype.getProjects = function () {
    return restApi.projects(this.config);
};

TeamCityApi.prototype.getProjectById = function (id) {
    return restApi.project(this.config, {"id":id})
};

TeamCityApi.prototype.getProjectByName = function (name) {
    return restApi.project(this.config, {"name": name});
};

TeamCityApi.prototype.getVcsRoots = function() {
    return restApi.vcsRoots(this.config);
};

TeamCityApi.prototype.getVcsRoot = function (id) {
    return restApi.vcsRoot(this.config, {"id": id});
};

TeamCityApi.prototype.createVcsRoot = function (vcsRoot) {
    return restApi.createVcsRoot(this.config, vcsRoot);
};
