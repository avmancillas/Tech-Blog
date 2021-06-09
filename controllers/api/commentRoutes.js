const router = require ('express').Router();
const { Comment} = require ('../../models');
const withAuth = require ('../../utils/auth');

router.get('/',async (req,res) => {
    try{
    const commentDatadb = await Comment.findAll()
    res.status(200).json(commentDatadb)
    }catch(err)  {
        res.status(500).json(err);
    };
});

router.get('/:id',async (req,res) => {
    try{
    const commentDatadb = await Comment.findByPk(req.params.id)
    res.status(200).json(commentDatadb)
    }catch(err)  {
        res.status(500).json(err);
    };
});

router.post('/', withAuth, async (req,res) => {
    try{
        
        const commentDatadb = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        res.status(200).json(commentDatadb);
        }catch(err){
            res.status(404).json(err);
        };
    
});
router.put('/:id',withAuth, async (req,res) => {
    try{
    const commentDatadb = await Comment.update(req.body.params.id)
    res.status(200).json(commentDatadb)
    }catch(err)  {
        res.status(500).json(err);
    };
});
router.delete('/:id',withAuth, async (req,res) => {
    try{
    const commentDatadb = await Comment.destroy(req.params.id)
    res.status(200).json(commentDatadb)
    }catch(err)  {
        res.status(500).json(err);
    };
});
module.exports = router;