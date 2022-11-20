/* MVC ~ Model View Controller */

const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.program = require("./program.model")(mongoose);

module.exports = db;