const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_PATH);
  console.log('Connected to MongoDB');
}

const { Schema } = mongoose;


//this is a schema, we will create a model from this schema later
const userSchema = new Schema({
  firstName: {type:String, required: true}, 
  lastName: {type:String, required: true},
  maidenName: String,// String is shorthand for {type: String}
  age: Number,
  gender: String,
  email: {type:String, required: true, unique: true}, // String is shorthand
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\+\d+\s\d{3}-\d{3}-\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  username: {type:String, required: true, unique: true},
  password: {type:String, required: true},
  token: String
});

//params are the collection name and the schema
//convention is to use singular form of the collection name
//and the variable name should be the same
exports.User = mongoose.model('User', userSchema); //creating a model from the schema

//now we can use this model to interact with the database

