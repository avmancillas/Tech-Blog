const withAuth = (req,res,next) =>{
    if (!req.session.user_in){
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth