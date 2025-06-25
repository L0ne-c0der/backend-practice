const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_PATH);
  console.log('Connected to MongoDB');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const { Schema } = mongoose;


//this is a schema, we will create a model from this schema later
const productSchema = new Schema({
  title: {type:String, required: true, unique: true}, // String is shorthand for {type: String}
  description: String, // String is shorthand for {type: String}
  category: String,
  tags: [String],
  rating: {type: Number, min:0, max:5},
  price: {type: Number, min:0, required: true},
  images: [String]
});

//params are the collection name and the schema
//convention is to use singular form of the collection name
//and the variable name should be the same
exports.Product = mongoose.model('Product', productSchema); //creating a model from the schema

//now we can use this model to interact with the database

