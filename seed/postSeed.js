require('dotenv').config();
const mongoose = require('mongoose');
const BlogPost = require('../models/BlogPost');
const post = require('../db/postSeed');

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return BlogPost.create(post)
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })

// Run npm run seed 