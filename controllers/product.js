const Product = require("../models/product");
const multer = require("multer");

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({
    storage: Storage
}).single('testImage')

// create
exports.createProduct = (req, res) => {
    upload(req, res, (err) => {

        if(err) {
            console.log(err)
        } else {
            const newProduct = new Product({
                name: req.body.name,
                description: req.body.description,
                image: {
                    data: req.file.filename,
                    contentType: ''
                }
            })
            newProduct.save()
            .then(() => res.json({
                message: "Create Successfully..",
                newProduct
            }))
            .catch((err) => res.status(400).json({
                error: "Failed to create product"
            }));
        }
    })
};

// delete all.
exports.deleteAllProduct = (req, res) => {
    Product.remove((err, deletedProduct) => {
        if(err)
        {
            return res.status(400).json({
                error: "Failed to delete product"
            });
        }
        res.json({
            message: "Delete Successfully..",
            deletedProduct
        })
    })
}

//delete product by id.
exports.deleteProductById = (req, res) => {
    Product.remove({_id: req.params._id}, (err, dp) => {
        if(err)
        {
            return res.status(400).json({
                error: "failed to delete product by id"
            });
        }
        res.json(dp);
    })
}

// display all
exports.getAllProducts = (req, res) => {
    Product.find().exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error: "no product found"
            });
        }
        res.json(products)
    });
};

//update product
exports.updateProduct = (req, res) => {
    Product.findOneAndUpdate(
        {_id: req.params._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, updatedProduct) => {
            if(err) {
                return res.status(400).json({
                    error: "product not found eith this id."
                })
            }
            res.json(updatedProduct);
        }
    );
};
