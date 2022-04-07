const router = require('express').Router();
const {
  models: { UserToEvent },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const allLikes = await UserToEvent.findAll();
    res.send(allLikes);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async(req, res, next) => {
  try {
    const userEventLikes = await UserToEvent.findAll({
      where: {
        likedEventId: req.params.id,
      },
    });
    res.send(userEventLikes);
  } catch(err) {
    next(err);
  };
});

module.exports = router;
