"use strict";

module.exports.copy = function(obj) {
    var copy = {};

    if (obj) {
        Object.keys(obj).forEach(function (key) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = obj[key];
            }
        });
    }
    return copy;
};