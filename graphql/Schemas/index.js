const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    type RootQuery {
        products: [product]!
        product (id: ID!): product!
        loginUser (email: String!, password: String!): authUser!
    }
    type RootMutation {
        addNewProduct(product:addProductInput!): product
        registerUser (input: registerUserInput!): user
    }
    input addProductInput {
        img: String!
        name: String!
        prevPrice: Int
        curPrice: Int!
        category: String!
        sku: String!
        rating: Int
        description: String!
    }
    input registerUserInput {
        userName: String!
        userFullName: String
        email: String!
        password: String!
    }
    type user {
        _id: ID!
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
        rating: Int
        size: [sizes]!
        description: String!
    }
    enum sizes {
        S
        M
        L
    }
`);