const express = require('express');
// const morgan = require('morgan');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth'); //importing auth router
const jwt = require('jsonwebtoken');
const auth = require('./controllers/auth').auth; //importing auth middleware from auth controller


const server = express();

//this is important otherwise the data will not 
// be added to the server, although a doc will be created
server.use(express.json());



//using routers for all /api routes
server.use('/auth', authRouter.authRouter); //using auth router for all /auth routes
server.use('/products', auth, productRouter.productRouter);
server.use('/users', auth, userRouter.userRouter);


//starting the server
server.listen(8080, () => {
  console.log('Server is started on port 8080');
});


