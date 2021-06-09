const {User} = require('../models');

const userData = [
    {
        username: "John",
        email: "john@gmail.com",
        password: "password1"
    },
    {
        username: "James",
        email:"james@gmail.com",
        password: "password2"
    },
    {
        name: "Jane",
        email: "jane@gmail.com",
        password: "password3"
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;