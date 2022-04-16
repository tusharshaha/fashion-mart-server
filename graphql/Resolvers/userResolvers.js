const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
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
                const hashPassword = await bcryptjs.hash(user.password, 6);
                const newUser = { ...user, password: hashPassword, }
                await userCollection.insertOne(newUser);
                return newUser;
            }
        } catch (err) {
            throw err
        }
    },
    loginUser: async ({email, password}) => {
        const oldUser = await userCollection.findOne({ email });
        const isMatch = await bcryptjs.compare(password, oldUser.password)
        if (!oldUser) {
            throw new Error("User Dosen't exist!")
        }
        if (!isMatch) {
            throw new Error("Didn't Match Password")

        }
        return oldUser
    }
}