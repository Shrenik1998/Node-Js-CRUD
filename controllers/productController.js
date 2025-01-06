const productModel = require("../models/productModels")

const getAllProducts = async(req,res)=>{
    try{
        const products = await productModel.find();
        console.log(products);
        res.status(200).json({ message: "Executed successfully", data: products })
    } catch(err){
        console.error("Error getting products:", err.message);
        res.status(500).json({ message: "Error getting products", error: err.message });
    }
}

const addProduct = async (req, res) => {
    console.log("POST /api/products called");
    try {
        const body = req.body;
        console.log("Request body:", body);
        const product = await productModel.create(body);
        console.log("Product created:", product);
        res.status(200).json({ message: "Executed successfully", data: product });
    } catch (err) {
        console.error("Error creating product:", err.message);
        res.status(500).json({ message: "Error creating product", error: err.message });
    }
}

const getproductById = async(req,res)=>{
    try{
        const productId = req.params.id;
        const products = await productModel.findById(productId);
        console.log(products);
        res.status(200).json({ message: "Executed successfully", data: products })
    } catch(err){
        console.error("Error getting products:", err.message);
        res.status(500).json({ message: "Error getting products", error: err.message });
    }
}

const updateProductbyId = async(req,res)=>{
    try{
        const productId = req.params.id;
        const body = req.body;
        const products = await productModel.findByIdAndUpdate(productId,body,{new:true});
        console.log(products);
        res.status(200).json({ message: "Executed successfully", data: products })
    } catch(err){
        console.error("Error getting products:", err.message);
        res.status(500).json({ message: "Error getting products", error: err.message });
    }
}

const deleteProductById = async(req,res)=>{
    try{
        const productId = req.params.id;
        const products = await productModel.findByIdAndDelete(productId);
        console.log(products);
        res.status(200).json({ message: "Executed successfully", data: products })
    } catch(err){
        console.error("Error getting products:", err.message);
        res.status(500).json({ message: "Error getting products", error: err.message });
    }
}

module.exports = {getAllProducts,addProduct,getproductById,updateProductbyId,deleteProductById};