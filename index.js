
const express = require('express');

const app = express();

const connectDB = require("./config/db");
connectDB();

//middleware
app.use(express.json());

//import logger middleware
const loggerMiddleware = require("./middlewares/logger")

app.use(loggerMiddleware);

//import product router
const productRouter = require("./routes/productRoute");

app.use("/api/products",productRouter);

app.use((req,res)=>{
    res.status(404).json({message : "end point does not exist"})
})

const hostname = '0.0.0.0'; // Localhost 
const port = 3000;

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});