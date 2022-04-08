const { Model, STRING, DECIMAL, DATE, UUID, UUIDV4, ENUM, ARRAY } = require('sequelize');
const db = require('../db');

class Trivia extends Model{};
Trivia.init({
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
}, { sequelize: db, modelName: 'trivia', timestamps: false });

module.exports = Trivia;
