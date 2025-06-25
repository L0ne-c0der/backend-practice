var jwt = require('jsonwebtoken');
const model = require('../model/user');
const User = model.User;
const fs = require('fs');
const path = require('path');
const privateKey =  fs.readFileSync(path.resolve(__dirname,'../keys/private.key'), 'utf8'); //reading the private key from the file system
const publicKey =  fs.readFileSync(path.resolve(__dirname,'../keys/public.key'), 'utf8'); //reading the public key from the file system





exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    var token = jwt.sign({ email: req.body.email }, privateKey, {algorithm: 'RS256'}); //params: payload, secret key
    user.token = token; // Assign the generated token to the user object

    const savedUser = await user.save();
    res.status(201).json({
      message: 'User added successfully',
      user: savedUser
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error adding user',
      error: err.message
    });
  }
}


//MIDDLEWARE
//decode the token, and check if it is valid
const auth = ((req, res, next) => {
  const header = req.get('Authorization'); //the header that should contain the token

  // console.log(header); // we get Bearer <token>
  const token = header.split(' ')[1]; //splitting the string to get the token

  // console.log(token); //now logging the token

  try {

    //decoding the toke, will verify if the token is valid
    var decoded = jwt.verify(token, publicKey); //params: token, secret key, options
    if(!decoded.email){
      // throw new Error('Invalid token');
      res.sendStatus(401)
    }
    // console.log("Decoded token:"+JSON.stringify(decoded));  //{payload, iat(the time stamop), (not here but: exp(expiration time))}
    next();

  } catch(err) {

    console.log(err);
    res.status(401).json({
      message: 'Unauthorized',
      error: err.message
    });

  }
})
exports.auth = auth; //exporting the auth middleware