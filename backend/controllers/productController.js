import productModel from "../models/productModel.js"

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (err) {
        console.eror(err);
        res.json({ success: false, message: err.message })
    }
}

export { listProduct }