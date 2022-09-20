const { ObjectId } = require("mongodb");
const { database } = require("../../dbConfig/index")

// create collection for products
const productCollection = database.collection("products");
const orderCollection = database.collection("orders");

module.exports = {
    products: async () => {
        return await productCollection.find({}).toArray();
    },
    product: async (args) => {
        const id = args.id;
        const query = { _id: ObjectId(id) }
        const result = await productCollection.findOne(query)
        return result
    },
    addNewProduct: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Your Session Expired. Please Login again");
        }
        const newProduct = {
            ...args.product,
            stockStatus: "In Stock"
        }
        await productCollection.insertOne(newProduct)
        return newProduct;
    },
    orderProduct: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Your Session Expired. Please Login again");
        }
        await orderCollection.insertOne(args.input);
        return true;
    },
    allOrders: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Your Session Expired. Please Login again");
        }
        return await orderCollection.find({}).toArray();
    },
    userOrders: async ({ email }) => {
        return await orderCollection.find({ userEmail: email }).toArray();
    },
    changeOrderStatus: async ({id, status}, req) => {
        if(!req.isAuth){
            throw new Error("Your Session Expired. Please Login again");
        }
        const query = {_id: ObjectId(id)};
        const updateDoc = {
            $set: {
                status
            }
        }
        await orderCollection.updateOne(query, updateDoc);
        return true;
    },
    deleteOrder: async ({ id }) => {
        const query = { _id: ObjectId(id) }
        await orderCollection.deleteOne(query);
        return true;
    }
}