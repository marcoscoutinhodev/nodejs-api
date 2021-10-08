const Sequelize = require("sequelize");
const databaseConfig = require("../Config/database.json");

const UserModel = require("../Model/User");
const AddressModel = require("../Model/Address");

const connection = new Sequelize(databaseConfig);

UserModel.init(connection);
AddressModel.init(connection);

AddressModel.associate(connection.models);

module.exports = connection;