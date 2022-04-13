// //SEAT GEEK API:
// // FETCH URL:
// // https://api.seatgeek.com/2/events?per_page={NUM_OF_EVENTS}&page={PAGE_NUM}&type={EVENT_TYPE}&client_id=MjYwNDY0NjB8MTY0Njk0NDA4MC4yNjMzMzEy&geoip={ZIP}&datetime_utc.gt={YEAR}-{MONTH}-{DAY}

// // FILTER OUT (to get current events):
// // date_tbd: true, // should be false

// // EVENT TYPES:
// // - concert,
// // - mlb,
// // - nba,
// // - nfl,
// // - nhl,
// // - mls,
// // - comedy

// //------------------------------------------------------------------

let yesterday = new Date();
// yesterday.setDate(yesterday.getDate() - 1);
const dd1 = String(yesterday.getDate()).padStart(2, '0');
const mm1 = String(yesterday.getMonth() + 1).padStart(2, '0');
const year1 = yesterday.getFullYear();
yesterday = year1 + '-' + mm1 + '-' + dd1;

const axios = require('axios');
const Event = require('../server/db/models/Event');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../server/db/models/Event');
const convertTime = require('convert-time');

const seedSeatGeek = async () => {
  let allEvents = [];
  const eventType = {
    concert: 'concert',
    // mlb: 'mlb',
    // nba: 'nba',
    // nfl: 'nfl',
    // nhl: 'nhl',
    // mls: 'mls',
    comedy: 'comedy',
  };

  const cities = {
    nyc: '11215',
    philly: '19128',
    // boston: '02101',
    // chicago: '60601',
    // la: '90001',
  };

  const fetchEvents = async (eventType, city) => {
    const url = `https://api.seatgeek.com/2/events?per_page=12&page=1&type=${eventType}&client_id=MjYwNDY0NjB8MTY0Njk0NDA4MC4yNjMzMzEy&geoip=${city}&datetime_utc.gt=2022-05-01`;
    // console.log(url);
    const response = await axios.get(url);

    // console.log(await response.data.events[0]);
    // console.log('-------------------------------');

    const events = await response.data.events
      .filter((ev) => ev.date_tbd === false)
      .map((ev) => {
        try {
          return {
            startTime: convertTime(
              ev.datetime_local.split('T')[1]?.slice(0, -3)
            ),
            date: yesterday, //ev.datetime_local.split('T')[0],
            imageUrl:
              ev.performers[0].image ||
              'https://www.linkpicture.com/q/capstone_default.jpg',
            largeImageUrl: ev.performers[0].image
              ? ev.performers[0].image.slice(0, -8) + '1000x500.jpg'
              : 'https://www.linkpicture.com/q/capstone_default.jpg',
            name: ev.performers[0].short_name.toLowerCase(),
            venueName: ev.venue.name,
            location: ev.venue.display_location,
            description: ev.description || 'description',
            isSoldOut: ev.is_open,
            price: ev.stats.median_price,
            venueAddress: ev.venue.address,
            ticketUrl: ev.url,
            category:
              ev.type === 'mlb' ||
              ev.type === 'mls' ||
              ev.type === 'nhl' ||
              ev.type === 'nfl' ||
              ev.type === 'nba'
                ? 'sports'
                : ev.type,
            latitude: ev.venue.location.lat,
            longitude: ev.venue.location.lon,
            city:
              city === '11215'
                ? 'nyc'
                : city === '19128'
                ? 'philly'
                : city === '02101'
                ? 'boston'
                : city === '60601'
                ? 'chicago'
                : city === '90001'
                ? 'la'
                : null,
          };
        } catch (err) {
          console.log(err);
        }
      });
    // console.log(events.length);
    await Promise.all(
      events.map((ev) => {
        Event.create(ev);
      })
    );
    // allEvents = [...allEvents, ...events];
    return events;
  };

  // for (const evType of Object.keys(eventType)) {
  //   Object.values(cities).forEach(
  //     async (city) => await fetchEvents(eventType[evType], city)
  //   );
  // }

  //NYC EVENTS
  const nycConcert = await fetchEvents('concert', '11215');
  const nycComedy = await fetchEvents('comedy', '11215');
  const nycMlb = await fetchEvents('mlb', '11215');
  const nycNba = await fetchEvents('nba', '11215');
  const nycNfl = await fetchEvents('nfl', '11215');
  const nycNhl = await fetchEvents('nhl', '11215');
  const nycMls = await fetchEvents('mls', '11215');

  // //PHILLY EVENTS
  const phillyConcert = await fetchEvents('concert', '19128');
  const phillyComedy = await fetchEvents('comedy', '19128');
  const phillyMlb = await fetchEvents('mlb', '19128');
  const phillyNba = await fetchEvents('nba', '19128');
  const phillyNfl = await fetchEvents('nfl', '19128');
  const phillyNhl = await fetchEvents('nhl', '19128');
  const phillyMls = await fetchEvents('mls', '19128');

  // //BOSTON EVENTS
  const bostonConcert = await fetchEvents('concert', '02101');
  const bostonComedy = await fetchEvents('comedy', '02101');
  const bostonMlb = await fetchEvents('mlb', '02101');
  const bostonNba = await fetchEvents('nba', '02101');
  const bostonNfl = await fetchEvents('nfl', '02101');
  const bostonNhl = await fetchEvents('nhl', '02101');
  const bostonMls = await fetchEvents('mls', '02101');

  // //LA EVENTS
  const laConcert = await fetchEvents('concert', '90001');
  const laComedy = await fetchEvents('comedy', '90001');
  const laMlb = await fetchEvents('mlb', '90001');
  const laNba = await fetchEvents('nba', '90001');
  const laNfl = await fetchEvents('nfl', '90001');
  const laNhl = await fetchEvents('nhl', '90001');
  const laMls = await fetchEvents('mls', '90001');

  // //CHICAGO EVENTS
  const chicagoConcert = await fetchEvents('concert', '60601');
  const chicagoComedy = await fetchEvents('comedy', '60601');
  const chicagoMlb = await fetchEvents('mlb', '60601');
  const chicagoNba = await fetchEvents('nba', '60601');
  const chicagoNfl = await fetchEvents('nfl', '60601');
  const chicagoNhl = await fetchEvents('nhl', '60601');
  const chicagoMls = await fetchEvents('mls', '60601');

  const totalSeatGeek = [
    ...nycConcert,
    ...nycComedy,
    ...nycMlb,
    ...nycNba,
    ...nycNfl,
    ...nycNhl,
    ...nycMls,
    ...phillyConcert,
    ...phillyComedy,
    ...phillyMlb,
    ...phillyNba,
    ...phillyNfl,
    ...phillyNhl,
    ...phillyMls,
    ...bostonConcert,
    ...bostonComedy,
    ...bostonMlb,
    ...bostonNba,
    ...bostonNfl,
    ...bostonNhl,
    ...bostonMls,
    ...laConcert,
    ...laComedy,
    ...laMlb,
    ...laNba,
    ...laNfl,
    ...laNhl,
    ...laMls,
    ...chicagoConcert,
    ...chicagoComedy,
    ...chicagoMlb,
    ...chicagoNba,
    ...chicagoNfl,
    ...chicagoNhl,
    ...chicagoMls,
  ];

  // console.log('concerts', nycConcert[0]);
  // console.log('comedy', nycComedy[0]);

  console.log(`seeded ${totalSeatGeek.length} seat geek events`);
  return totalSeatGeek;
};

// seedSeatGeek();
module.exports = seedSeatGeek;

// //--------------------------------------------------------------------
// // OLD CODE => WORKING!
// //--------------------------------------------------------------------

// const axios = require('axios');
// const Event = require('../server/db/models/Event');
// const { v4: uuidv4 } = require('uuid');
// const { sequelize } = require('../server/db/models/Event');
// const convertTime = require('convert-time');

// const seedSeatGeek = async () => {
//   const eventType = {
//     concert: 'concert',
//     mlb: 'mlb',
//     nba: 'nba',
//     nfl: 'nfl',
//     nhl: 'nhl',
//     mls: 'mls',
//     comedy: 'comedy',
//   };

//   const cities = {
//     brooklyn: '11215',
//     philly: '19128',
//     boston: '02101',
//     chicago: '60007',
//     losAngles: '90001',
//   };

//   const response = await axios.get(
//     `https://api.seatgeek.com/2/events?per_page=50&page=1&type=${eventType.concert}&client_id=MjYwNDY0NjB8MTY0Njk0NDA4MC4yNjMzMzEy&geoip=${cities.brooklyn}&datetime_utc.gt=2022-05-01`
//   );

//   // console.log(await response.data.events[4]);

//   const events = await response.data.events
//     .filter((ev) => ev.date_tbd === false)
//     .map((ev) => {
//       try {
//         return {
//           startTime: convertTime(ev.datetime_local.split('T')[1]?.slice(0, -3)),
//           date: ev.datetime_local.split('T')[0],
//           imageUrl:
//             ev.performers[0].image ||
//             'https://www.linkpicture.com/q/capstone_default.jpg',
//           largeImageUrl: ev.performers[0].image
//             ? ev.performers[0].image.slice(0, -8) + '1000x500.jpg'
//             : 'https://www.linkpicture.com/q/capstone_default.jpg',
//           name: ev.performers[0].short_name.toLowerCase(),
//           venueName: ev.venue.name,
//           location: ev.venue.display_location,
//           description: ev.description || 'description',
//           isSoldOut: ev.is_open,
//           price: ev.stats.median_price,
//           venueAddress: ev.venue.address,
//           ticketUrl: ev.url,
//           category:
//             ev.type === 'mlb' ||
//             ev.type === 'mls' ||
//             ev.type === 'nhl' ||
//             ev.type === 'nfl' ||
//             ev.type === 'nba'
//               ? 'sports'
//               : ev.type,
//           latitude: ev.venue.location.lat,
//           longitude: ev.venue.location.lon,
//           // city:
//           //   city === '11215'
//           //     ? 'nyc'
//           //     : city === '19128'
//           //     ? 'philly'
//           //     : city === '02101'
//           //     ? 'boston'
//           //     : city === '60601'
//           //     ? 'chicago'
//           //     : city === '90001'
//           //     ? 'la'
//           //     : null,
//         };
//       } catch (err) {
//         console.log(err);
//       }
//     });
//   await Promise.all(
//     events.map((ev) => {
//       Event.create(ev);
//     })
//   );
//   console.log(`seeded ${events.length} seat geek events`);
//   return events;
// };

// // seedSeatGeek();
// module.exports = seedSeatGeek;
