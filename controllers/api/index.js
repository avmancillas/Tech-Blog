const router = require ('express').Router();
const userRoutes = require('./user');
const postRoutes = require('./postRoutes');
const commentRoutes = require ('./commentRoutes');

router.use('/users', userRoutes);
router.use('/comments', postRoutes);
router.use('/post', commentRoutes);

module.exports = router;