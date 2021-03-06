//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Event = require('./models/Event');
const EventCategory = require('./models/EventCategory');
const Group = require('./models/Group');
const UserToGroup = require('./models/UserToGroup');
const UserToUser = require('./models/UserToUser');
const UserToEvent = require('./models/UserToEvent');
const Question = require('./models/Question');
const Trivia = require('./models/Trivia');

//events with event categories
Event.belongsTo(EventCategory);
EventCategory.hasMany(Event);

//events with users
Event.belongsToMany(User, {
  through: UserToEvent,
  foreignKey: 'likedEventId',
});
User.belongsToMany(Event, {
  through: UserToEvent,
  foreignKey: 'likedUserId',
});

//user + event with likes
User.hasMany(UserToEvent);
UserToEvent.belongsTo(User, { foreignKey: 'likedUserId' });
Event.hasMany(UserToEvent);
UserToEvent.belongsTo(Event, { foreignKey: 'likedEventId' });
// Event.belongsToMany(User, { through: UserToEvent, foreignKey: 'likedEventId' });
// User.belongsToMany(Event, { through: UserToEvent, foreignKey: 'likedUserId' });

//event to user to user
User.belongsToMany(User, {
  through: UserToUser,
  as: 'primaryUser',
  foreignKey: 'primaryUserId',
});
User.belongsToMany(User, {
  through: UserToUser,
  as: 'likeUser',
  foreignKey: 'likeUserId',
});
UserToUser.belongsTo(Event);
Event.hasMany(UserToUser);

//groups associations
Event.hasMany(Group);
Group.belongsTo(Event);
User.belongsToMany(Group, { through: UserToGroup });
Group.belongsToMany(User, { through: UserToGroup });
User.hasMany(UserToGroup);
UserToGroup.belongsTo(User);
UserToGroup.belongsTo(Group);
Group.hasMany(UserToGroup);

//questions to trivia
Trivia.hasMany(Question);
Question.belongsTo(Trivia);

//trivia to user to event and event
Trivia.hasMany(UserToEvent);
UserToEvent.belongsTo(Trivia);
Trivia.belongsTo(Event);

module.exports = {
  db,
  models: {
    User,
    Event,
    EventCategory,
    Group,
    UserToEvent,
    UserToGroup,
    Question,
    Trivia
  },
};
