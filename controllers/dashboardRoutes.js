const router = require('express').Router();
const sequelize = require ('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) => {
    try{
    const postDatadb = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
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
      res.render('dashboard',{
          posts,
          loggedIn: req.session.loggedIn
      });
  }) 
  res.status(200).json(postDatadb)
  }catch(err)  {
    res.status(500).json(err);
  };
});

router.get('/edit/:id', withAuth, async (req,res) => {
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
      res.render('edit-post',{
          posts,
          loggedIn: req.session.loggedIn
      });
  }) 
  res.status(200).json(postDatadb)
  }catch(err) {
    res.status(500).json(err);
  };
});


module.exports = router