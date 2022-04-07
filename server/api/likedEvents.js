const router = require('express').Router();
const {
  models: { UserToEvent, User, Event },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const eventLikes = await UserToEvent.findAll({
      include: [ User, Event ]
    });
    res.send(eventLikes);
  } catch (err) {
    next(err);
  }
});

//liked events by sepcific user
router.get('/:id', async (req, res, next) => {
  try {
    const userEventLikes = await UserToEvent.findAll({
      where: {
        likedUserId: req.params.id,
      },
    });
    res.send(userEventLikes);
  } catch (err) {
    next(err);
  }
});

//liked events by sepcific user & specific event
router.get('/:id/:eventid', async (req, res, next) => {
  try {
    const userEventLikes = await UserToEvent.findAll({
      where: {
        likedUserId: req.params.id,
        likedEventId: req.params.eventid,
      },
    });
    res.send(userEventLikes);
  } catch (err) {
    next(err);
  }
});

//like event
router.post('/', async (req, res, next) => {
  try {
    console.log('LIKED EVENT', req.body);
    const likedEvent = await UserToEvent.create(req.body);
    res.send(likedEvent);
  } catch (err) {
    next(err);
  }
});

//unlike event
router.delete('/:id/:eventid', async (req, res, next) => {
  try {
    const likedEvent = await UserToEvent.findOne({
      where: {
        likedUserId: req.params.id,
        likedEventId: req.params.eventid,
      },
    });
    if (!likedEvent) {
      res.sendStatus(404);
    } else {
      await likedEvent.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});
