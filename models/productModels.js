const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name : {
        type : String,
        required : true,
    },
    category : String,
    qty : Number,
    inStock : {
        type : Boolean,
        default : false
    }
},{timestamps:true});

//mongoose middleware that will run before data is saved 
productSchema.pre("save",()=>{
    console.log("inside pre hook")
})

//mongoose middleware that will run after data is saved 
productSchema.post("save",()=>{
    console.log("inside post hook")
})

const productModel = mongoose.model("products",productSchema);

module.exports = productModel;