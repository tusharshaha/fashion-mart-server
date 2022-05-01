const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    type RootQuery {
        products: [product]!
        allOrders: [getOrder]
        userOrders(email: String!): [getOrder]
        allUsers: [user]
        product (id: ID!): product!
        loginUser (email: String!, password: String!): authUser!
    }
    type RootMutation {
        addNewProduct(product:addProductInput!): product
        orderProduct(input: orderInput!): Boolean!
        registerUser(input: registerUserInput!): user
        updateUserAccount(input: registerUserInput!): authUser!
        makeAdmin(email: String!): Boolean!
        deleteOrder(id: ID!): Boolean!
    }
    input addProductInput {
        img: String!
        name: String!
        prevPrice: Int
        curPrice: Int!
        category: String!
        sku: String!
        description: String!
    }
    input registerUserInput {
        userName: String!
        userFullName: String
        email: String!
        password: String!
        oldP: String
    }
    input orderInput {
        userEmail: String!
        userName: String!
        userPhone: String!
        company: String
        address: String!
        country: String!
        city: String!
        date: String!
        status: String!
        payment: String!
        totalAmount: Int!
        totalQty: Int!
        products: [orderedProduct]!
    }
    input orderedProduct {
        id: ID!
        img: String!
        name: String!
        curPrice: Int!
        subTotal: Int!
        qty: Int!
    }
    type getOrder {
        _id: ID!
        userEmail: String!
        userName: String!
        userPhone: String!
        company: String
        address: String!
        country: String!
        city: String!
        date: String!
        status: String!
        payment: String!
        totalAmount: Int!
        totalQty: Int!
        products: [orderProduct]!
    }
    type orderProduct {
        id: ID!
        img: String!
        name: String!
        curPrice: Int!
        subTotal: Int!
        qty: Int!
    }
    type user {
        _id: ID!
        register: Boolean
        userName: String!
        userFullName: String
        email: String!
        password: String
    }
    type authUser {
        _id: ID!
        userName: String!
        userFullName: String
        email: String!
        password: String
        createdAt: String
        role: String!
        token: String!
        tokenExpiration: String!
    }
    type product {
        _id: ID!
        img: String!
        name: String!
        prevPrice: Int
        curPrice: Int!
        category: String!
        stockStatus: String!
        sku: String!
        description: String!
    }
`);