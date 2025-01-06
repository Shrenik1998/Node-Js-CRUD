

// //mongoose is orm tool for mongodb
// const mongoose = require('mongoose');
// const uri = "mongodb://127.0.0.1:27017/person";

// //connection with mongodb
// mongoose.connect(uri)
//     .then(() => {
//         console.log("Successfully connected to MongoDB!");
//     })
//     .catch((err) => {
//         console.error("Error connecting to MongoDB:", err.message);
//     });

// const productSchema = new mongoose.Schema({
//     product_name : {
//         type : String,
//         required : true,
//     },
//     category : String,
//     qty : Number,
//     inStock : {
//         type : Boolean,
//         default : false
//     }
// },{timestamps:true});

// const productModel = mongoose.model("products",productSchema);

const express = require('express');

const app = express();

//middleware
app.use(express.json());


//custom middleware
const loggerMiddleware = (req,res,next)=>{
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    next();
}

app.use(loggerMiddleware);

//create new product
app.post("/api/products", async (req, res) => {
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
});

//get all products
app.get("/api/products",);

//get product by id
app.get("/api/products/:id",async(req,res)=>{
    try{
        const productId = req.params.id;
        const products = await productModel.findById(productId);
        console.log(products);
        res.status(200).json({ message: "Executed successfully", data: products })
    } catch(err){
        console.error("Error getting products:", err.message);
        res.status(500).json({ message: "Error getting products", error: err.message });
    }
});

//update product by id
app.put("/api/products/:id",async(req,res)=>{
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
});

//delete by product id
app.delete("/api/products/:id",async(req,res)=>{
    try{
        const productId = req.params.id;
        const products = await productModel.findByIdAndDelete(productId);
        console.log(products);
        res.status(200).json({ message: "Executed successfully", data: products })
    } catch(err){
        console.error("Error getting products:", err.message);
        res.status(500).json({ message: "Error getting products", error: err.message });
    }
});


// //api to create new product 
// app.post("/api/products", async (req, res) => {
//     try {
//         const body = req.body;
//         const product = await productModel.create({
//             product_name: body.product_name,
//             category: body.category,
//             qty: body.qty,
//             inStock: body.inStock
//         });
//         res.status(200).json({ message: "Executed successfully", data: product });
//     } catch (err) {
//         res.status(500).json({ message: "Error creating product", error: err.message });
//     }
// });


//apis with inmemory database i.e user
const users = [{id : 1, name:"adam"},
                {id : 2, name:"eve" }]

//custom middleware -> this middleware will execute only for /hello end point
const loggerMiddleware1 = (req,res,next)=>{
    console.log(`Hello Request Method: ${req.method}`);
    console.log(`Hello Request URL: ${req.url}`);
    next();
}

//get api with middle ware 
app.get("/hello",loggerMiddleware1,(req,res)=>{
    res.send("Hello Express");
})

//get all the users
app.get("/getUsers",(req,res)=>{
    res.status(200).json({message:"executed successfully", data : users});
})

//get users by id
app.get("/getUser/:userId", (req, res) => {
    const userId = parseInt(req.params.userId, 10); // Convert userId to a number
    console.log("userId = " + userId);

    const resUser = users.filter(user => user.id === userId); // Compare with number
    res.status(200).json({
        message: "executed successfully",
        data: resUser
    })
})

//post api
app.post("/addUser",(req,res)=>{
    const newUser = req.body;
    const id = users.length + 1;
    newUser.id = id;
    users.push(newUser);
    res.status(201).json({message:"executed successfully", data : users})
})

//delete api
app.delete("/deleteUserById/:userId",(req,res)=>{
    const userId = req.params.userId;
    res.status(200).json({message : "deleted successfully", data : userId})
})

//example for querry parameter
//http://localhost:3000/search?id=1
app.get("/search",(req,res)=>{
    const querry = req.query;
    console.log(querry);
    res.send("parameters recieved")
})

const hostname = '127.0.0.1'; // Localhost
const port = 3000;

app.use((req,res)=>{
    res.status(404).json({message : "end point does not exist"})
})

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});