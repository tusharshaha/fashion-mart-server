const { database } = require("../dbconfing/index")
const productCollection = database.collection("products");

module.exports = {
    products: () => {
        return productCollection.find({}).toArray();
    },
    addNewProduct: (parent, args) => {
        return parent.product
    }
}