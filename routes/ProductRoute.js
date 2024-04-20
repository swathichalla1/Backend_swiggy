const express = require("express");
const productController = require("../controllers/ProductController");

const router = express.Router();

router.post("/add-product/:firmId",productController.addProduct);
router.get("/:firmId/products",productController.getProductByFirm);

router.get("/uploads/:imageName",(req,res)=>{
    const imageName = req.params.imageName;
    req.headersSent("content-Type","image/jpeg");
    res.sendFile(path.join(__dirname,"..","uploads",imageName));
});

router.delete("/:productId",productController.deleteProductById)

module.exports = router;