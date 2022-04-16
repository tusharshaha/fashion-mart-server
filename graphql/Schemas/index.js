const { buildSchema } = require("graphql");

module.exports = buildSchema(`
schema {
    query: RootQuery
    mutation: RootMutation
}
type RootQuery {
        products: [product]!
        product (id: ID!): product!
        loginUser (email: String!, password: String!): user!
    }
    type RootMutation {
        addNewProduct(product:addProductInput!): product!
        registerUser (input: registerUserInput!): user!
    }
    input addProductInput {
        img: String!
        name: String!
        prevPrice: Int
        curPrice: Int!
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
        userName: String!
        userFullName: String
        email: String!
        password: String!
    }
    type product {
        _id: ID!
        img: String!
        name: String!
        prevPrice: Int
        curPrice: Int!
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