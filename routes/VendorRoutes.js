const vendorController = require("../controllers/vendorController");
const express = require("express");

const router = express.Router();

router.post("/register",vendorController.VendorRegister);
router.post("/login",vendorController.VendorLogin);

router.get("/all-vendors",vendorController.getAllVendors);
router.get("/single-vendor/:id",vendorController.getVendorById);

module.exports = router;