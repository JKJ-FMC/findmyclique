const { Model } = require('sequelize');
const db = require('../db');

class UserToEvent extends Model {}
UserToEvent.init(
  {},
  { sequelize: db, modelName: 'user_to_event', timestamps: false }
);

module.exports = UserToEvent;
