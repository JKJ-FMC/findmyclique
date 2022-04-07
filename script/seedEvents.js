// // // GET ID'S
// // // const links = document.querySelectorAll('.eds-event-card-content__action-link')
// // // const texts = [...links].map(ele => ele.getAttribute('href'))
// // // const almost = texts.map(url => url.split('?')[0])
// // // const ids = almost.map(url => url.split('-').pop())

// // //GET URL
// // // https://www.eventbrite.com/api/v3/destination/events/?event_ids={IDS}&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections&page_size=20

// // //MAIN URL
// // // https://www.eventbrite.com/d/ny--new-york/free--music--events/?page=1&start_date=2022-04-10&end_date=2032-05-31

// // const puppeteer = require('puppeteer');

// const axios = require('axios');
// const Event = require('../server/db/models/Event');
// const { v4: uuidv4 } = require('uuid');
// const { sequelize } = require('../server/db/models/Event');
// const convertTime = require('convert-time');
// const cheerio = require('cheerio');

// const seedEvents = async () => {
//   let allEvents = [];
//   const eventType = {
//     music: 'music', // exact category name: 'Music'
//     // comedy: 'comedy', // exact category names: 'Performing & Visual Arts' || 'Film, Media & Entertainment'
//     foodDrink: 'food-and-drink', // exact category name: 'Food & Drink'
//     sports: 'sports-and-fitness', // exact category name: 'Sports & Fitness'
//   };

//   let yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);
//   const dd1 = String(yesterday.getDate()).padStart(2, '0');
//   const mm1 = String(yesterday.getMonth() + 1).padStart(2, '0');
//   const year1 = yesterday.getFullYear();
//   yesterday = year1 + '-' + mm1 + '-' + dd1;

//   const cities = [
//     'ny--new-york',
//     'pa--philadelphia',
//     'ma--boston',
//     'il--chicago',
//     'ca--los-angeles',
//   ];
//   const fetchUrl = async (eventType, city) => {
//     const { data } = await axios.get(
//       `https://www.eventbrite.com/d/${city}/${eventType}--events/?page=1&start_date=2022-04-10&end_date=2032-05-31`
//     );
//     const $ = cheerio.load(data);

//     const links = $(
//       'aside.eds-event-card-content__image-container > .eds-event-card-content__action-link'
//     );

//     const res = [...links].map((link) => link.attribs?.href);

//     return res;
//   };

//   const fetchEvents = async (eventType, city) => {
//     const links = await fetchUrl(eventType, city);
//     const almost = links
//       .filter((_, i) => i % 2 === 0)
//       .map((url) => url.split('?')[0]);
//     const ids = almost.map((url) => url.split('-').pop());
//     // console.log('IDS ARE HERE: ', ids);
//     const response = await axios.get(
//       `https://www.eventbrite.com/api/v3/destination/events/?event_ids=${ids}&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections&page_size=20`
//     );

//     // console.log(
//     //   response.data.events[0].tags.find(
//     //     (ev) => ev.prefix === 'EventbriteCategory'
//     //   ).display_name
//     // );

//     const events = await response.data.events.map((ev) => {
//       if (ev.tags[0] !== null) {
//         try {
//           return {
//             startTime: convertTime(ev.start_time),
//             date: yesterday,
//             imageUrl: ev.image
//               ? ev.image?.url
//               : 'https://www.linkpicture.com/q/capstone_default.jpg',
//             largeImageUrl: ev.image
//               ? ev.image?.original.url
//               : 'https://www.linkpicture.com/q/capstone_default.jpg',
//             name: ev.name.split(' ').slice(0, 4).join(' ').toLowerCase(),
//             venueName: ev.primary_venue.name,
//             location: ev.primary_venue.address.localized_area_display,
//             description: ev.summary,
//             isSoldOut: ev.ticket_availability.is_sold_out,
//             price: +ev.ticket_availability.minimum_ticket_price?.major_value,
//             venueAddress: ev.primary_venue.address.localized_address_display,
//             ticketUrl: ev.tickets_url,
//             category: ev.tags[0]
//               ? ev.tags.find((evt) => evt.prefix === 'EventbriteCategory')
//                   .display_name === 'Music' || null
//               : null,
//             latitude: ev.primary_venue.address.latitude,
//             longitude: ev.primary_venue.address.longitude,
//             city:
//               city === 'ny--new-york'
//                 ? 'nyc'
//                 : city === 'pa--philadelphia'
//                 ? 'philly'
//                 : city === 'ma--boston'
//                 ? 'boston'
//                 : city === 'il--chicago'
//                 ? 'chicago'
//                 : city === 'ca--los-angeles'
//                 ? 'la'
//                 : null,
//           };
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     });
//     await Promise.all(
//       events.map((ev) => {
//         Event.create(ev);
//       })
//     );
//     // allEvents = [...allEvents, ...events];
//   };

//   // for (const evType of Object.keys(eventType)) {
//   //   Object.values(cities).forEach(
//   //     async (city) => await fetchEvents(eventType[evType], city)
//   //   );
//   // }

//   // console.log(`seeded ${allEvents.length} eventbrite events`);
//   // return allEvents;

//   //NYC EVENTS
//   const nycMusic = await fetchEvents('music', 'ny--new-york');
//   const nycFoodDrink = await fetchEvents('food-and-drink', 'ny--new-york');
//   const nycSports = await fetchEvents('sports-and-fitness', 'ny--new-york');

//   //PHILLY EVENTS
//   const phillyMusic = await fetchEvents('music', 'pa--philadelphia');
//   const phillyFoodDrink = await fetchEvents(
//     'food-and-drink',
//     'pa--philadelphia'
//   );
//   const phillySports = await fetchEvents(
//     'sports-and-fitness',
//     'pa--philadelphia'
//   );

//   //BOSTON EVENTS
//   const bostonMusic = await fetchEvents('music', 'ma--boston');
//   const bostonFoodDrink = await fetchEvents('food-and-drink', 'ma--boston');
//   const bostonSports = await fetchEvents('sports-and-fitness', 'ma--boston');

//   //LA EVENTS
//   const laMusic = await fetchEvents('music', 'ca--los-angeles');
//   const laFoodDrink = await fetchEvents('food-and-drink', 'ca--los-angeles');
//   const laSports = await fetchEvents('sports-and-fitness', 'ca--los-angeles');

//   //CHICAGO EVENTS
//   const chicagoMusic = await fetchEvents('music', 'il--chicago');
//   const chicagoFoodDrink = await fetchEvents('food-and-drink', 'il--chicago');
//   const chicagoSports = await fetchEvents('sports-and-fitness', 'il--chicago');

//   const totalEventBrite = [
//     ...nycMusic,
//     ...nycFoodDrink,
//     ...nycSports,
//     ...phillyMusic,
//     ...phillyFoodDrink,
//     ...phillySports,
//     ...bostonMusic,
//     ...bostonFoodDrink,
//     ...bostonSports,
//     ...laMusic,
//     ...laFoodDrink,
//     ...laSports,
//     ...chicagoMusic,
//     ...chicagoFoodDrink,
//     ...chicagoSports,
//   ];

//   return totalEventBrite;
// };
// // seedEvents();

// module.exports = seedEvents;

// //--------------------------------------------------------------------
// // OLD CODE => WORKING!
// //--------------------------------------------------------------------

// // GET ID'S
// // const links = document.querySelectorAll('.eds-event-card-content__action-link')
// // const texts = [...links].map(ele => ele.getAttribute('href'))
// // const almost = texts.map(url => url.split('?')[0])
// // const ids = almost.map(url => url.split('-').pop())

// // GET URL
// // https://www.eventbrite.com/api/v3/destination/events/?event_ids={IDS}&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections&page_size=20

// // MAIN URL
// // https://www.eventbrite.com/d/ny--new-york/free--music--events/?page=1&start_date=2022-04-10&end_date=2032-05-31

// // const puppeteer = require('puppeteer');
// // const axios = require('axios');
// // const Event = require('../server/db/models/Event');
// // const { v4: uuidv4 } = require('uuid');
// // const { sequelize } = require('../server/db/models/Event');
// // const convertTime = require('convert-time');

// // const eventType = {
// //   music: 'music',
// //   comedy: 'comedy',
// //   foodDrink: 'food-and-drink',
// //   sports: 'sports-and-fitness',
// // };

// // const fetchUrl = async () => {
// //   const browser = await puppeteer.launch({
// //     // headless: false,
// //     defaultViewport: null,
// //   });
// //   const page = await browser.newPage();
// //   await page.goto(
// //     `https://www.eventbrite.com/d/ny--new-york/${eventType.music}--events/?page=1&start_date=2022-04-10&end_date=2032-05-31`
// //   );
// //   return [
// //     ...(await page.$$eval(
// //       'aside.eds-event-card-content__image-container > .eds-event-card-content__action-link',
// //       (as) => as.map((a) => a.href)
// //     )),
// //   ];
// // };

// // const seedEvents = async () => {
// //   const links = await fetchUrl();
// //   const almost = links
// //     .filter((_, i) => i % 2 === 0)
// //     .map((url) => url.split('?')[0]);
// //   const ids = almost.map((url) => url.split('-').pop());

// //   const response = await axios.get(
// //     `https://www.eventbrite.com/api/v3/destination/events/?event_ids=${ids}&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections&page_size=20`
// //   );

// //   // console.log(response.data.events[0]);

// //   const events = await response.data.events.map((ev) => {
// //     try {
// //       return {
// //         startTime: convertTime(ev.start_time),
// //         date: ev.end_date,
// //         imageUrl: ev.image ? ev.image?.url : null,
// //         name: ev.name.split(' ').slice(0, 4).join(' ').toLowerCase(),
// //         venueName: ev.primary_venue.name,
// //         location: ev.primary_venue.address.localized_area_display,
// //         description: ev.summary,
// //         isSoldOut: ev.ticket_availability.is_sold_out,
// //         price: +ev.ticket_availability.minimum_ticket_price.major_value,
// //         venueAddress: ev.primary_venue.address.localized_address_display,
// //         ticketUrl: ev.tickets_url,
// //         category: ev.tags[1].display_name,
// //         latitude: ev.primary_venue.address.latitude,
// //         longitude: ev.primary_venue.address.longitude,
// //       };
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   });
// //   await Promise.all(
// //     events.map((ev) => {
// //       Event.create(ev);
// //     })
// //   );
// //   console.log(`seeded ${events.length} events`);
// //   return events;
// // };
// // // seedEvents();
// // // const events = seedEvents().then((data) => console.log(data));
// // // console.log(events);
// // module.exports = { seedEvents };
