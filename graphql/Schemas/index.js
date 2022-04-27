const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    type RootQuery {
        products: [product]!
        getOrders: [getOrder]!
        product (id: ID!): product!
        loginUser (email: String!, password: String!): authUser!
    }
    type RootMutation {
        addNewProduct(product:addProductInput!): product
        registerUser(input: registerUserInput!): user
        orderProduct(input: orderInput): Boolean!
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
    }
    input orderInput {
        userEmail: String!
        date: String!
        status: String!
        payment: String!
        products: [orderedProduct]!
    }
    type orderedProduct {
        pId: ID!
        pName: String!
        pPrice: Int!
        pQty: Int!
    }
    type getOrder {
        userEmail: String!
        date: String!
        status: String!
        payment: String!
        products: [orderedProduct]!
    }
    type user {
        _id: ID!
        register: Boolean!
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