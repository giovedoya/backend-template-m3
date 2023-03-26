require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const products = require('../db/productSeed');
const MONGO_URL = 'mongodb+srv://admin:admin@cluster0.oltiq9i.mongodb.net/weddsellDB'; 



mongoose.connect(MONGO_URL)
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