const router = require('express').Router();
require('dotenv').config();
const {
  models: { Event, UserToEvent, Group, User },
} = require('../db');
const seedLikes = require('../../script/seedLikes');
const { randomGroup } = require('../../script/seed');
const algoliasearch = require('algoliasearch/lite');
// API keys below contain actual values tied to your Algolia account
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = client.initIndex('clique');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: [{ model: UserToEvent, separate: true }, { model: Group, include: User, separate: true }],
    });
    console.log('total events', events.length);
    res.send(events);
  } catch (err) {
    next(err);
  }
});

router.get('/seed', async (req, res, next) => {
  try {
    await seedLikes();
    await randomGroup();
    res.send('event likes seeded');
  } catch (err) {
    next(err);
  }
});

router.get('/seedAlgolia', async (req, res, next) => {
  try {
    await index.clearObjects();
    const events = await Event.findAll();
    // console.log(events);
    const results = await index.saveObjects(events);
    // console.log(results);
    res.send(`Sent entries to Algolia!`);
  } catch (err) {
    next(err);
  }
});

//get specific event
router.get('/:id', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: [UserToEvent, Group],
      where: {
        id: req.params.id,
      },
    });
    res.send(req.params);
  } catch (err) {
    next(err);
  }
});
