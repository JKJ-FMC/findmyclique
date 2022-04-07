const { Model, STRING, DECIMAL, DATE } = require('sequelize');
const db = require('../db');

class UserToUser extends Model{};
UserToUser.init({

}, { sequelize: db, modelName: 'user_to_users', timestamps: false });

module.exports = UserToUser;
