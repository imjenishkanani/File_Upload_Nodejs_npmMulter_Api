const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();

const { 
    createProduct,  
    deleteAllProduct, 
    deleteProductById,
    getAllProducts, 
    updateProduct 
} = require("../controllers/product");

router.post("/product/create", createProduct);
router.delete("/product/deleteAll", deleteAllProduct);
router.get("/products", getAllProducts);
router.put("/product/update/:_id", updateProduct);
router.delete("/product/detete/:_id", deleteProductById);

module.exports = router;