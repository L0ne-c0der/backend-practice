const express = require('express');
const productController = require('../controllers/product'); //importing product controller



const productRouter = express.Router(); //creating a router for products


productRouter
  .get('/',productController.getProducts)
  .get('/:id', productController.getProduct)
  .post('/', productController.addProduct)
  .put('/:id', productController.updateProduct)
  .patch('/:id', productController.patchProduct)
  .delete('/:id', productController.deleteProduct);

exports.productRouter = productRouter;