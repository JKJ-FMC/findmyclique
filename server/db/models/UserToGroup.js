const { Model, STRING, DECIMAL, DATE } = require('sequelize');
const db = require('../db');

class UserToGroup extends Model{};
UserToGroup.init({

}, { sequelize: db, modelName: 'user_to_group', timestamps: false });

module.exports = UserToGroup;
