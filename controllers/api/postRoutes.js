const router = require ('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment} = require ('../../models');
const withAuth = require ('../../utils/auth');

router.get('/', async (req,res) => {
    try {
    const postDatadb = await Post.findAll({
        attributes: ['id', 'title', 'created_at', 'post_content'],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes:['id','comment_text','post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    
  })
  .then(postDatadb => {
      const posts = postDatadb.map(post => post.get({ plain:true}));
      res.render('homepage',{
          posts,
          loggedIn: req.session.loggedIn
      });
  }) 
  res.status(200).json(postDatadb)
  }catch(err) {
    res.status(500).json(err);
  };
});
router.get('/:id', async (req,res) => {
    try {
    const postDatadb = await Post.findOne(req.params.id,{
        
        attributes: ['id', 'title', 'created_at', 'post_content'],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes:['id','comment_text','post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    
  })
  .then(postDatadb => {
      if(postDatadb){
          res.status(404).json({message: 'No post'})
          return;
      }

  }) 
  res.status(200).json(postDatadb)
  }catch(err) {
    res.status(500).json(err);
  };
});
router.post('/', withAuth,(req,res) => {
    Post.create({
        title: req.body.title,
        content:req.body.content,
        user_id: req.session.user_id})
  .then(postDatadb => res.json(postDatadb))
  .catch((err) => {
    res.status(500).json(err);
  });
});

module.exports = router