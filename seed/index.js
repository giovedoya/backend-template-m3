require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Dress');
const products = require('../db/productSeed');

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Product.create(products)
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