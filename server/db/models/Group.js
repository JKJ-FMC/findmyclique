const { Model, STRING, DECIMAL, DATE, UUID, UUIDV4, } = require('sequelize');
const db = require('../db');

class Group extends Model{};
Group.init({
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  }
}, { sequelize: db, modelName: 'groups', timestamps: false });

module.exports = Group;
