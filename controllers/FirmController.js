const Firm = require("../models/Firm");
const path = require('path');
const Vendor = require("../models/Vendor");
const multer = require("multer");

 // Multer storage configuration
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory for storing uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
    }
});

// Multer upload configuration

const upload = multer({ storage: storage });

const addFirm = async (req,res)=>{

    try{
        const {firmName,area,category,region,offer} = req.body

        const image = req.file ? req.file.filename:undefined;
    
        const vendor = await Vendor.findById(req.vendorId);

        if (!vendor){
            res.status(404).json({message:"Vendor not found"})
        }
    
        const firm = new Firm({
            firmName,area,category,region,offer,image,vendor:vendor._id
        })
    
        const savedFirm = await firm.save();
        vendor.firm.push(savedFirm)
        await vendor.save()

        return res.status(200).json({"message":"Firm Added sucessfully"})
    }catch(error){
 console.error(error)
 res.status(500).json("internal server error")
    }
    
}

const deleteFirmById = async(req,res)=>{
    try{
           const firmId = req.params.firmId;
           const deleteFirm = await Firm.findByIdAndDelete(firmId);

           if(!deleteFirm){
            return res.status(404).json({error:"No product found"})
           }
    }catch(error){
        console.error(error)
        res.status(500).json("internal server error")
    }
}


module.exports = {addFirm : [upload.single('image'),addFirm],deleteFirmById}