"use strict";

var Trait = require("traits").Trait,
    endPointTrait = require("http-api-utils").traits.endPoint;

module.exports = Trait.create(
    Object.prototype,
    endPointTrait.create({
        "path"     : "/httpAuth/app/rest/version",
        "method"  : "GET",
        "response": "text/plain"
    })
);