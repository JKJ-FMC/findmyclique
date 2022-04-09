const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/events', require('./events'));
router.use('/likedevents', require('./likedEvents'));
router.use('/likedusers', require('./likedUsers'));
router.use('/groups', require('./groups'));
router.use('/usergroups', require('./userGroups'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
