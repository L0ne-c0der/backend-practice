const fs = require('fs');

const model = require('../model/product');
const Product = model.Product;

// const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

// const products = data.products;

//Create
//POST method to add a product
exports.addProduct = async (req, res) => {
  try {
    console.log(req.body); // Add this to debug the incoming data
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({
      message: 'Product added successfully',
      product: savedProduct
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error adding product',
      error: err.message
    });
  }
}

//Read
//GET all
exports.getProducts = async (req, res) => {
  try{
    const products = await Product.find()
    res.status(201).json(products);
  }
  catch(err) {
    res.status(500).json({
      message: 'Error fetching products',
      error: err.message
    });
  }
}

//GET by ID
exports.getProduct = async (req, res) => {
  try{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(!product) {
    return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({message: 'Product found successfully',product});

  }
  catch(err) {
    return res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
  
}



//Update
//PUT method to update a product
exports.updateProduct = async (req,res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findOneAndReplace({_id: productID}, req.body, {returnDocument: 'after'});
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({
      message: 'Product updated successfully',
      product: product
    });
  } catch (error) {
    return res.status(500).json({message: 'Error updating product', error: error.message});
  }
  
}

//PATCH method to update a product
exports.patchProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findByIdAndUpdate(productID, req.body, {new: true});
    if(!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      message: 'Product updated successfully',
      product: product
    });
  } 
   catch (error) {
    return res.status(500).json({
      message: 'Error updating product',
      error: error.message
    });
  }
}


//Delete
//DElETE method to delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findByIdAndDelete(productID);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      message: 'Product deleted successfully',
      product: product
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting product',
      error: error.message
    });
  }
  
  
}