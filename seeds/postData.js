const {Post} = require('../models');

const postDatadb = [{
        title: "Amazing!",
        content: 'great work',
        user_id: 1,
        
    },
    {
        title: "Amazing!",
        content: 'great work',
        user_id: 2
    },
    {
        title: "Amazing!",
        content: 'great work',
        user_id: 3
    }
]

const seedPosts = () => Post.bulkCreate(postDatadb);

module.exports = seedPosts;