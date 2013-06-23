"use strict";

var Trait = require("traits").Trait,
    endPointTrait = require("http-api-utils").traits.endPoint,
    postProcessingTrait = require("http-api-utils").traits.postProcessing,
    endPoints = {};

module.exports = endPoints;

endPoints.projects = Trait.create(
    Object.prototype,
    Trait.compose(
        endPointTrait.create({
            "path"    : "/httpAuth/app/rest/projects",
            "method"  : "GET",
            "response": "application/json"
        }),
        postProcessingTrait.create(_projectsResultProcessor)
    )
);

endPoints.project = Trait.create(
    Object.prototype,
    endPointTrait.create({
        "path": "/httpAuth/app/rest/projects/<projectLocator>",
        "method": "GET",
        "response": "application/json"
    })
);

/**
 * Convert the projects object into something more useful to our needs
 * @param projects The TC projects REST JSON response.
 * @returns {"projectid": {"id", "name", "href"}}
 * @private
 */
function _projectsResultProcessor(projects) {
    var result = {};

    if (projects) {
        projects.project.forEach(function (project) {
            result[project.id] = project;
        });
    }

    return result;
}