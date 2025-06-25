// const fs = require('fs');
const model = require('../model/user');
const User = model.User;

// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

// const users = data.users;

//Create
//POST method to add a user


//Read
//GET all
exports.getUsers = async (req, res) => {
  try{
    const users = await User.find()
    res.status(200).json(users);
  }
  catch(err) {
    res.status(500).json({
      message: 'Error fetching users',
      error: err.message
    });
  }
}

//GET by ID
exports.getUser = async (req, res) => {
  try{
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user) {
    return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json({message: 'user found successfully',user});

  }
  catch(err) {
    return res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
  
}



//Update
//PUT method to update a user
exports.updateUser = async (req,res) => {
  try {
    const userID = req.params.id;
    const user = await User.findOneAndReplace({_id: userID}, req.body, {returnDocument: 'after'});
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    return res.status(200).json({
      message: 'user updated successfully',
      user: user
    });
  } catch (error) {
    return res.status(500).json({message: 'Error updating user', error: error.message});
  }
  
}

//PATCH method to update a user
exports.patchUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findByIdAndUpdate(userID, req.body, {new: true});
    if(!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json({
      message: 'user updated successfully',
      user: user
    });
  } 
   catch (error) {
    return res.status(500).json({
      message: 'Error updating user',
      error: error.message
    });
  }
}


//Delete
//DElETE method to delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findByIdAndDelete(userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User deleted successfully',
      user: user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message
    });
  }
  
  
}