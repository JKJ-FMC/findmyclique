const router = require('express').Router();
const {
  models: { Trivia, Question },
} = require('../db');

//get all trivias
router.get('/', async (req, res, next) => {
  try {
    const trivia = await Trivia.findAll({
      include: Question
    });
    res.send(trivia);
  } catch (err) {
    next(err);
  }
});

//get trivia of specific event
router.get('/:id', async (req, res, next) => {
  try {
    const trivia = await Trivia.findAll({
      include: Question,
      where: {
        eventId: req.params.id
      }
    });
    res.send(trivia);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
