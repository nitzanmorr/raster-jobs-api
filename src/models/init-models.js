var DataTypes = require("sequelize").DataTypes;
var _records = require("./records");

function initModels(sequelize) {
  var records = _records(sequelize, DataTypes);


  return {
    records,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
