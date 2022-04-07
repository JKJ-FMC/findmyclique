const router = require('express').Router()
const { models: { EventCategory }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const events = await EventCategory.findAll({})
    res.json(events)
  } catch (err) {
    next(err)
  }
})
