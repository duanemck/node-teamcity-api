"use strict";

var VcsRootLocator = function(vcsroot) {
    if (!vcsroot) {
        throw new TypeError("A vcsroot must be provided");
    }
    _validate(vcsroot);
    this.vcsroot = vcsroot;
};
module.exports = VcsRootLocator;

VcsRootLocator.prototype.toString = function() {
    var result = "";

    if (this.vcsroot.id) {
        result = "id:" + this.vcsroot.id;
    }

    return result;
};

function _validate(vcsroot) {
    if (!vcsroot.id) {
        throw new TypeError("The vcsroot must include an 'id'");
    }
}