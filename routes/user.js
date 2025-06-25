const express = require('express');
const userController = require('../controllers/user'); //importing User controller



const userRouter = express.Router(); //creating a router for Users


userRouter
  .get('/',userController.getUsers)
  .get('/:id', userController.getUser)
  // .post('/', userController.addUser)
  .put('/:id', userController.updateUser)
  .patch('/:id', userController.patchUser)
  .delete('/:id', userController.deleteUser);

exports.userRouter = userRouter;