const { ObjectId } = require("mongodb");
const { database } = require("../../dbconfing/index")

// create collection for products
const productCollection = database.collection("products");

module.exports = {
    products: () => {
        return productCollection.find({}).toArray();
    },
    product: async (args) => {
        const id = args.id;
        const query = { _id: ObjectId(id) }
        const result = await productCollection.findOne(query)
        return result
    },
    addNewProduct: async (args) => {
        const newProduct = {
            ...args.product,
            size: ["S", "M", "L"],
            stockStatus: "In Stock"
        }
        await productCollection.insertOne(newProduct)
        return newProduct;
    }
}