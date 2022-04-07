const { Model, STRING, DECIMAL, DATE } = require('sequelize');
const db = require('../db');

class EventCategory extends Model{};
EventCategory.init({
  name: {
    type: STRING,
  },
}, { sequelize: db, modelName: 'event_categories', timestamps: false });

module.exports = EventCategory;
