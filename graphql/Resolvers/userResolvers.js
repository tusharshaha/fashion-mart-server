const { status } = require("express/lib/response");
const { database } = require("../../dbconfing")

// create collection for user
const userCollection = database.collection("users");

module.exports = {
    registerUser: async (args) => {
        try {
            const user = args.input;
            const oldUser = await userCollection.findOne({ email: user.email });
            if (oldUser) {
                throw new Error("User already exist!")
            } else {
                await userCollection.insertOne(user);
                return user;
            }
        } catch (err) {
            throw err
        }
    },
    loginUser: async (args, req) => {
        const oldUser = await userCollection.findOne({ email: args.email });
        if (!oldUser) {
            throw new Error("User Dosen't exist!")
        }
        if (oldUser.password !== args.password) {
            throw new Error("Didn't Match Password")

        }
        return oldUser
    }
}