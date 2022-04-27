const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { database } = require("../../dbconfing");
// create collection for user
const userCollection = database.collection("users");

module.exports = {
    registerUser: async (args) => {
        try {
            const user = args.input;
            const oldUser = await userCollection.findOne({ email: user.email });
            if (oldUser) {
                throw new Error("User Already Exist!");
            } else {
                const createdAt = new Date().toISOString().slice(0, 10);
                const hashPassword = await bcryptjs.hash(user.password, 8);
                const newUser = { ...user, password: hashPassword, createdAt, role: 'user' };
                await userCollection.insertOne(newUser);
                return { ...newUser, register: true };
            }
        } catch (err) {
            throw err;
        }
    },
    loginUser: async ({ email, password }) => {
        const oldUser = await userCollection.findOne({ email });
        if (!oldUser) {
            throw new Error("User Dosen't Exist!");
        }
        const isMatch = await bcryptjs.compare(password, oldUser.password);
        if (!isMatch) {
            throw new Error("Didn't Match Password");
        }
        const token = jwt.sign(
            { email: oldUser.email },
            `${process.env.SECRET_KEY}`,
            { expiresIn: "8h" }
        );
        return { ...oldUser, password: null, token, tokenExpiration: "8h" };
    },
    makeAdmin: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Your Session Expired. Please Login again")
        }
        const requester = req.decodedEmail;
        if (requester) {
            const requesterAccount = await userCollection.findOne({ email: requester });
            if (requesterAccount.role === "admin") {
                const filter = { email: args.email }
                const updateDoc = {
                    $set: {
                        role: 'admin'
                    },
                };
                await userCollection.updateOne(filter, updateDoc);
                return true;
            } else { return false };
        } else { return false };
    }
}