const router = require('express').Router();
const {
  models: { UserToGroup, User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const userGroups = await UserToGroup.findAll({});
    res.json(userGroups);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userGroup = await UserToGroup.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(userGroup);
  } catch (err) {
    next(err);
  }
});
