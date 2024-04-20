const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/VendorRoutes");
const bodyparser = require("body-parser");
const firmRoutes = require('./routes/FirmRoutes');
const productRoutes = require("./routes/ProductRoute")
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected sucessfully!"))
.catch((error)=>console.log(error))

app.use(bodyparser.json());
app.use("/vendor",vendorRoutes);
app.use('/firm',firmRoutes)
app.use("/product",productRoutes)
app.use("/uploads",express.static("uploads"))

app.listen(PORT,()=>{
    console.log(`Server started and running at ${PORT}`)
})

app.use("/",(req,res)=>{
    res.send("Welcome to swiggy home page");
})