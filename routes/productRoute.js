const express = require('express');

const productRouter = express.Router();

const {getAllProducts,addProduct,getproductById,updateProductbyId,deleteProductById} = require("../controllers/productController")

//create new product
productRouter.post("/", addProduct);

//get all products
productRouter.get("/", getAllProducts);

//get product by id
productRouter.get("/:id",getproductById);

//update product by id
productRouter.put("/:id",updateProductbyId);

//delete by product id
productRouter.delete("/:id",deleteProductById);

module.exports = productRouter;