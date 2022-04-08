const { Model, STRING, DECIMAL, DATE, UUID, UUIDV4, ENUM, ARRAY } = require('sequelize');
const db = require('../db');

class Question extends Model{};
Question.init({
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  category: {
    type: STRING,
  },
  type: {
    type: ENUM(['multiple', 'boolean'])
  },
  difficulty: {
    type: ENUM(['easy', 'medium', 'hard'])
  },
  incorrect_answers: {
    type: ARRAY(STRING)
  }
}, { sequelize: db, modelName: 'question', timestamps: false });

module.exports = Question;
