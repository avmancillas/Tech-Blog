const router = require('express').Router();
const sequelize = require ('../config/connection');
const { Post,User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try{
    const postDatadb = await Post.findAll({
        attributes: ['id', 'title', 'created_at', 'post_content'],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: [ 'id', 'comment_text','post_id', 'user_id'],
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

router.get('/post/:id', async (req,res) => {
    try{
    const postDatadb = await Post.findByPk(req.params.id,{
        attributes: ['id', 'title', 'created_at', 'post_content'],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: [ 'id', 'comment_text','post_id', 'user_id'],
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
router.get('/signup', (req,res)=>{
    if (req.session.loggedIn){
        res.redirect('/');
        return;
    }
})

router.get('/login', (req,res)=>{
    if (req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router