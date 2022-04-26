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
                const hashPassword = await bcryptjs.hash(user.password, 8);
                const newUser = { ...user, password: hashPassword, role: 'user' };
                await userCollection.insertOne(newUser);
                return {...newUser, register: true};
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
    }
}