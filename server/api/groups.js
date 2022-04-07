const router = require('express').Router();
const {
  models: { User, UserToGroup, Group },
} = require('../db');
module.exports = router;

//get all groups
router.get('/', async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      include: [UserToGroup, User],
    });
    res.json(groups);
  } catch (err) {
    next(err);
  }
});

//get all groups for specific user
router.get('/:eventId/:userId', async(req, res, next) => {
  try {
    //get all groups for specific event
    const groups = await Group.findAll({
      include: [ User ],
      where: {
        eventId: req.params.eventId
      }
    });

    for (let i = 0; i < groups.length; i++) {
      let currentGroup = groups[i];
      let groupMembers = currentGroup.users;
      for (let j = 0; j < groupMembers.length; j++) {
        let currentMember = groupMembers[j];
        //get group ID of this user for this event
        if (currentMember.id === req.params.userId) {
          console.log(currentGroup)
          res.send(currentGroup)
        }
      }
    };
  } catch (err) {
    next(err);
  };
});
