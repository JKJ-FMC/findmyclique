const {
  Model,
  STRING,
  DECIMAL,
  DATE,
  DATEONLY,
  BOOLEAN,
  UUID,
  UUIDV4,
  BIGINT,
  INTEGER,
} = require('sequelize');
const db = require('../db');

class Event extends Model {}
Event.init(
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    objectID: {
      type: UUID,
      defaultValue: UUIDV4,
    },
    name: {
      type: STRING,
    },
    price: {
      type: DECIMAL,
    },
    imageUrl: {
      type: STRING,
      defaultValue: '/default.png',
    },
    largeImageUrl: {
      type: STRING,
      defaultValue: '/default.png',
    },
    description: {
      type: STRING,
    },
    location: {
      type: STRING,
    },
    date: {
      type: DATEONLY,
    },
    startTime: {
      type: STRING,
    },
    isSoldOut: {
      type: BOOLEAN,
    },
    venueName: {
      type: STRING,
    },
    venueAddress: {
      type: STRING,
    },
    latitude: {
      type: STRING,
    },
    longitude: {
      type: STRING,
    },
    ticketUrl: {
      type: STRING,
    },
    category: {
      type: STRING,
    },
    city: {
      type: STRING,
    },
  },
  { sequelize: db, modelName: 'events', timestamps: false }
);

module.exports = Event;
