const router = require('express').Router();
const {
  models: { Question },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll();
    res.send(questions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
