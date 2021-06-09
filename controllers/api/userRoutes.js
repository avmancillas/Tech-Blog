const router = require ('express').Router();
const {User} = require('../../models');

router.get('/', async (req,res) => {
    try {
    const userData = await User.findAll({
        attributes: ['[password]'],
    
  })
  res.status(200).json(userData)
  }catch(err)  {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req,res) => {
    try {
    const userData = await User.findByPk(req.params.id,{
        attributes: {exclude:['password']},
        include: [{
            model: Post,
            attributes: ['id','comment_text','post_id', 'user_id']
        },
        {
            model: Comment,
            attributes:['id','comment_text','post_id', 'user_id'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
    ]
    
  })
  .then(userData => {
        if(userData){
            res.status(404).json({message: 'No post'})
            return;
        }
  
  }) 
  res.status(200).json(userData)
  }catch(err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req , res) => {
    try{
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_id = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req,res) => {
    try {
        const userData = await User.findOne({ where: {email: req.body.email} });

        if (!userData) {
            res
            .status(400)
            .json({message: 'Wrong email or password'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
            .status(400)
            .json({message: 'Wrong email or password'});
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Logged In!'});
        })
    }catch (err){
        res.status(400).json(err);
    }
});

router.post('/logout', (req,res) =>{
    if (req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else{
        res.status(404).end();
    }
});

module.exports = router;