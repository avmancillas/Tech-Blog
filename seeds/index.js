const sequelize = require('../config/connection');
const {User,Comment, Post }= require('../models');

const userData = require('./userData')
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  

  process.exit(0);
};

seedAll();