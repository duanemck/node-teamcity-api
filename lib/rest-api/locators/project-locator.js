"use strict";

var ProjectLocator = function(project) {
    if (!project) {
        throw new TypeError("A project must be provided");
    }
    _validate(project);
    this.project = project;
};
module.exports = ProjectLocator;

ProjectLocator.prototype.toString = function() {
    var result = "";

    if (this.project.id) {
        result = "id:" + this.project.id;
    } else if (this.project.name) {
        result = "name:" + encodeURIComponent(this.project.name);
    }

    return result;
};

function _validate(project) {
    if (!project.id && !project.name) {
        throw new TypeError("The project must include a 'id' or 'name' value");
    }
}