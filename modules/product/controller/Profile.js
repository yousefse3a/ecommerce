const { StatusCodes } = require('http-status-codes');
const { ProductModel } = require("../../../models/ProductModel");
const fs = require("fs");
const path = require("path");

const getAllProduct = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;
    try {
        if (qNew) {
            products = await ProductModel.find().sort({ _id: -1 }).limit(5);
        } else if (qCategory) {
            products = await ProductModel.find({
                categories : { $in: [qCategory] }
            });
        } else {
            products = await ProductModel.find();
        }
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const getProduct = async (req, res) => {
    try {
        const findProduct = await ProductModel.findById(req.params.id);
        if (findProduct) {
            res.status(StatusCodes.OK).json({ ...findProduct._doc });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found data" });
        }
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const updateProduct = async (req, res) => {
    try {
        if (!req.fileError) {
            if (req.file) {
                const img = `${req.fileDest}/${req.file.filename}`;
                var productOld = await ProductModel.findById(req.params.id);
                var productUpdate = await ProductModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body, img }, { new: true })
                fs.unlinkSync(path.join(__dirname, `../../../${productOld.img}`));
            } else {
                var productUpdate = await ProductModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
            }
            if (productUpdate) {
                res.status(StatusCodes.OK).json({ message: "product updated", productUpdate });
            } else {
                res.status(StatusCodes.FORBIDDEN).json({ message: "product not found" });
            }
        } else {
            res.status(StatusCodes.OK).json({ message: "invaild type" });
        }
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const deleteProduct = async (req, res) => {
    try {
        var productOld = await ProductModel.findById(req.params.id);
        const deleteProduct = await ProductModel.deleteOne({ _id: req.params.id });
        if (deleteProduct.deletedCount) {
            fs.unlinkSync(path.join(__dirname, `../../../${productOld.img}`));
            res.status(StatusCodes.OK).json({ message: "Product deleted" });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found data" });
        }
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const createProduct = async (req, res) => {
    try {
        const { title, desc, categories , size, price ,color} = req.body;
        if (req.file) {
            if (!req.fileError) {
                const img = `${req.fileDest}/${req.file.filename}`;
                const newProduct = new ProductModel({ title, desc, categories , size,img, price,color});
                const savedProduct = await newProduct.save();
                res.status(StatusCodes.CREATED).json({ message: "product added", savedProduct });
            } else {
                res.status(StatusCodes.ACCEPTED).json({ message: "invaild type" });
            }
        } else { res.status(StatusCodes.ACCEPTED).json({ message: "image requird" }); }
    } catch (error) {
        if (error.keyValue) {
            res.status(StatusCodes.ACCEPTED).json({ message: "title exist" })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "catch err ", error })
        }
    }
}
module.exports = {
    getAllProduct, getProduct, updateProduct, deleteProduct, createProduct
}       