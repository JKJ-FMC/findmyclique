const {
  db,
  models: { User, Event, UserToEvent },
} = require('../server/db');

const seedLikes = async () => {
  const events = await Event.findAll();
  // console.log('seed like total events', events.length)

  const users = await User.findAll({});
  for (ev of events) {
    const numLikes = Math.floor(Math.random() * 4);
    const randInt = Math.floor(Math.random() * (users.length - numLikes));
    await Promise.all(
      users.slice(randInt, randInt + numLikes).map(async (user) => {
        UserToEvent.create({
          likedEventId: ev.id,
          likedUserId: user.id,
        });
      })
    );
  }
  console.log('seeded likes');
};

module.exports = seedLikes;

// await UserToEvent.create({
//   likedEventId: event1.id,
//   likedUserId: jennifer.id,
// });
