var mongojs = require("mongojs");
var db = mongojs('hbs', ['client']);

module.exports = db;