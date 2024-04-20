
const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");
dotEnv.config()

const secretkey = process.env.SECRET_KEY

const VendorRegister = async(req,res)=>{
    const {username,email,password} = req.body
    
    try{
        const vendorEmail = await Vendor.findOne({email});
        if (vendorEmail){
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newVendor = new Vendor({
            username,
            email,
            password:hashedPassword
        });
        await newVendor.save();

        res.status(201).json("Vendor registered succesfully");
        console.log("registered")
    }
    catch(error){
        res.status(500).json("Internal server error");
        console.error(error);
    }
}


const VendorLogin = async (req,res)=>{
    const {email,password} = req.body;
    

    try{
const vendoremail = await Vendor.findOne({email});


if (!vendoremail || !(await bcrypt.compare(password,vendoremail.password))){
      return res.status(401).json("User doesnot exist!")
}

const token = jwt.sign({vendorId:vendoremail._id},secretkey,{expiresIn:"1h"})
res.status(200).json({success:"Login successful",token})
//console.log(token);


    }catch(error){
        res.status(500).json("Internal server error");
        console.error(error);
    }
}

const getAllVendors = async (req,res)=>{
    try{
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors})
    }catch(error){
        res.status(500).json("Internal server error");
        console.error(error);
    }
}

const getVendorById = async(req,res)=>{
    const vendorId = req.params.id ;
    try{
         const vendor = await Vendor.findById(vendorId).populate('firm');
         if (!vendor){
            return res.status(404).json({error:"Vendor not found"})
         }
         res.status(200).json({vendor})
    }catch(error){
        res.status(500).json("Internal server error");
        console.error(error);
    }
}
module.exports = {VendorRegister,VendorLogin,getAllVendors,getVendorById}