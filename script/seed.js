'use strict';

const {
  db,
  models: { User, EventCategory, Event, UserToEvent, Group, UserToGroup },
} = require('../server/db');
const faker = require('faker');
const seedEvents = require('./seedEvents');
const seedLikes = require('./seedLikes');
const seedSeatGeek = require('./seedSeatGeek');
const seedQuestions = require('./seedQuestions');
const seedUsers = require('./seedUsers');
const axios = require('axios');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 *
 */

let today = new Date();
today.setDate(today.getDate() + 1);
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
today = year + '-' + mm + '-' + dd;
console.log('CURRENT DATE', today);

let yesterday = new Date();
// yesterday.setDate(yesterday.getDate() - 1);
const dd1 = String(yesterday.getDate()).padStart(2, '0');
const mm1 = String(yesterday.getMonth() + 1).padStart(2, '0');
const year1 = yesterday.getFullYear();
yesterday = year1 + '-' + mm1 + '-' + dd1;
console.log('YESTERDAY', yesterday);

const randomGroup = async (events) => {
  // const events = allEvents;
  console.log('group events', events.length);

  for (let i = 0; i <= events.length; i++) {
    let currEvent = events[i];
    if (currEvent) {
      //if today is the day before event
      if (currEvent.date === yesterday) {
        let eventId = currEvent.id;
        // console.log(eventId, currEvent.name);
        const evLikes = await UserToEvent.findAll({
          where: {
            likedEventId: eventId,
          },
        });

        const numOfPeople = evLikes.length;
        // console.log('total num of people', numOfPeople);

        //only run if more than 3 or more people have liked event
        if (numOfPeople >= 3) {
          let groupSize = '';
          const groupsOf = [3, 4, 5];
          let smallestRemainder = 10;

          //get group number that will leave smallest unassigned
          // for (let i = 0; i < groupsOf.length; i++) {
          //   let remainder = numOfPeople % groupsOf[i];
          //   if (groupsOf.includes(remainder) || remainder === 0 || remainder < smallestRemainder) {
          //     groupSize = groupsOf[i];
          //     smallestRemainder = remainder;
          //   };
          // };

          let i = 0;
          while (i < groupsOf.length) {
            let remainder = numOfPeople % groupsOf[i];
            if (remainder === 0) {
              groupSize = groupsOf[i];
              break;
            } else if (groupsOf.includes(remainder)) {
              groupSize = groupsOf[i];
              break;
            } else if (remainder < smallestRemainder) {
              groupSize = groupsOf[i];
              smallestRemainder = remainder;
            }
            i++;
          }

          console.log('final group size', groupSize);

          //split event likes into even sized groups
          const groups = evLikes.reduce((acc, val, index) => {
            const groupIndex = Math.floor(index / groupSize);
            if (!acc[groupIndex]) {
              acc[groupIndex] = [];
            }

            acc[groupIndex].push(val);

            return acc;
          }, []);

          //for length of groups, create new group, set event ID, set new group ID as parent ID for users
          for (let i = 0; i < groups.length; i++) {
            const currGroup = groups[i];
            const newGroup = await Group.create({
              eventId: currEvent.id,
            });

            const groupId = newGroup.id;
            console.log(`GROUP ${i + 1}`, groupId);

            //loop through each event like in groups, get user ID, get group ID, create User To Group
            for (let j = 0; j < currGroup.length; j++) {
              const currLike = currGroup[j];
              await UserToGroup.create({
                groupId,
                userId: currLike.likedUserId,
              });
            }
          }
        }
      }
    }
  }
};

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  //Create admin user
  await User.create({
    firstName: 'cody',
    lastName: 'banks',
    dateOfBirth: faker.date.past(),
    imageUrl: faker.image.people(),
    job: faker.name.jobTitle(),
    bio: `I love ${faker.commerce.productAdjective()} ${faker.animal.fish()}`,
    email: 'cody@gmail.com',
    password: '123',
    phoneNumber: faker.phone.phoneNumber(),
    isAdmin: true,
  });

  const kenny = await User.create({
    firstName: 'kenny',
    email: 'kenny@gmail.com',
    password: 'findmyclique!',
    isAdmin: false,
    imageUrl:
      'https://ca.slack-edge.com/T024FPYBQ-U02HB2E2YEQ-8ee79484eba7-512',
    bio: 'Rock star turned rock CSStar',
    job: 'Software Engineer at JoeSchmoe Rock Star Inc',
  });

  const jordan = await User.create({
    firstName: 'jordan',
    email: 'jordan@gmail.com',
    password: 'findmyclique!',
    isAdmin: false,
    imageUrl:
      'https://ca.slack-edge.com/T024FPYBQ-U01UD247JCW-143cc32d8e1e-512',
    bio: 'Bug Slayer',
    job: 'Funemployed',
  });

  const jennifer = await User.create({
    firstName: 'jennifer',
    email: 'jennifer@gmail.com',
    password: 'findmyclique!',
    isAdmin: false,
    imageUrl:
      'https://ca.slack-edge.com/T024FPYBQ-U01J88VFDN2-06b6fdc48021-512',
    bio: 'Soy Sauce Salmon lover turned back-end brainiac',
    job: "Jason Momoa's Trophy Wife",
  });

  const saad = await User.create({
    firstName: 'saad',
    email: 'saad@gmail.com',
    password: 'findmyclique!',
    isAdmin: false,
    imageUrl:
      'https://ca.slack-edge.com/T024FPYBQ-U02H5SC0S0M-08b077f9ea60-512',
    bio: 'Chat meister',
    job: 'Delta Airlines Pilot',
  });

  // Creating Users
  const users = await seedUsers();
  // const users = await Promise.all(
  //   Array(100)
  //     .fill()
  //     .map((ele) =>
  //       User.create({
  //         firstName: faker.name.firstName(),
  //         lastName: faker.name.lastName(),
  //         dateOfBirth: faker.date.past(),
  //         imageUrl: faker.image.people(),
  //         job: faker.name.jobTitle(),
  //         bio: `I love ${faker.commerce.productAdjective()} ${faker.animal.fish()}`,
  //         email: faker.internet.email(),
  //         password: '1234567',
  //         phoneNumber: faker.phone.phoneNumber(),
  //       })
  //     )
  // );

  //event categories
  await Promise.all(
    ['music', 'charity', 'fitness', 'film', 'outdoor', 'food+drink'].map(
      (name) => EventCategory.create({ name })
    )
  );

  //test event with groups
  const event1 = await Event.create({
    name: 'Tyler, the Creator',
    price: 95,
    date: today,
    imageUrl:
      'https://dk2dv4ezy246u.cloudfront.net/widgets/sSnF4yNXgPE_large.jpg',
    largeImageUrl:
      'https://media.pitchfork.com/photos/60df879d316238f6226d2605/1:1/w_900,h_900,c_limit/TylerTheCreator_GettyImages-1325814253.jpg',
    description:
      'One of the most fascinating artistic evolutions since the late 2000s has been that of Tyler, The Creator. The rapper and producer surfaced as a founding member of Odd Future, an outlandish alternative rap crew that gradually permeated the mainstream as it begat a multitude of related projects.',
    location: 'New York City, NY',
    startTime: '7:00 pm',
    isSoldOut: false,
    venueName: 'Madison Square Garden',
    venueAddress: '4 Pennsylvania Plaza, New York, NY 10001',
    latitude: '40.7505',
    longitude: '-73.9934',
    ticketUrl:
      'https://www.stubhub.com/tyler-the-creator-seattle-tickets-4-8-2022/event/104922534/',
    category: 'concert',
    city: 'nyc',
  });

  //event 1 likes
  [jennifer, kenny, jordan].map((currUser) => {
    UserToEvent.create({
      likedEventId: event1.id,
      likedUserId: currUser.id,
    });
  });

  //event 1 group
  const event1Group = await Group.create({
    eventId: event1.id,
  });

  await Promise.all(
    [jennifer, kenny, jordan].map((currUser) => {
      UserToGroup.create({
        groupId: event1Group.id,
        userId: currUser.id,
      });
    })
  );

  //test event with likes (no groups unassigned yet)
  //test event likes
  // await Promise.all(
  //   [jennifer, kenny, jordan, saad].map((currUser) => {
  //     UserToEvent.create({
  //       likedEventId: event1.id,
  //       likedUserId: currUser.id,
  //     });
  //   })
  // );
  const event2 = await Event.create({
    name: 'John Mulaney',
    price: 95,
    date: today,
    imageUrl:
      'https://pyxis.nymag.com/v1/imgs/4f0/db3/d4e7ce771f77a4d3e4db7120a1f549e2fa-18-good-one-podcast-john-mulaney-3.rsquare.w700.jpg',
    largeImageUrl:
      'https://news-service.s3.amazonaws.com/comedy-trump-3b480b06-fcf5-11ea-9ceb-061d646d9c67.jpg',
    description:
      "John Mulaney: Kid Gorgeous at Radio City is a 2018 stand-up comedy film written by and starring John Mulaney. The special was recorded live in February 2018 at the Radio City Music Hall in New York City,[1] and released by Netflix on May 1, 2018.[2]. Similarly to Mulaney's previous show, The Comeback Kid, Kid Gorgeous is a visually simplistic stand-up routine with a major emphasis upon observational humor.[3] The majority of jokes are centered upon Mulaney's marriage to Victorian lampshade designer Annamarie Tendler, adolescence, celebrity, politics and anxieties associated with contemporary American life.",
    location: 'New York City, NY',
    startTime: '7:00 pm',
    isSoldOut: false,
    venueName: 'Radio City Music Hall',
    venueAddress: '4 Pennsylvania Plaza, New York, NY 10001',
    latitude: '40.7600',
    longitude: '-73.9800',
    ticketUrl:
      'https://www.stubhub.com/john-mulaney-new-haven-tickets-6-8-2022/event/105255096/',
    category: 'comedy',
    city: 'nyc',
  });

  //test event likes
  await Promise.all(
    [jennifer, kenny, jordan].map((currUser) => {
      UserToEvent.create({
        likedEventId: event2.id,
        likedUserId: currUser.id,
      });
    })
  );

  //events
  // const eventbrite = await seedEvents();
  // console.log('eventbrite: ', eventbrite.length);
  const seatgeek = await seedSeatGeek();
  // console.log('seatgeek: ', seatgeak.length);

  const allEvents = await Event.findAll();

  //seed questions for each event

  await seedQuestions(allEvents);

  await seedLikes(allEvents);

  // const allEvents = await Event.findAll();

  //console.log(seatGeek)
  await randomGroup(allEvents);

  // console.log(`seeded ${events.length} events`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = { seed, randomGroup };
