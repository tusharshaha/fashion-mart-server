const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    type RootQuery {
        products: [product]!
    }
    type RootMutation {
        addNewProduct(product:addProductInput!): product!
    }
    input addProductInput {
        img: String!
        name: String!
        prevPrice: Int
        curPrice: Int!
        stockStatus: String
        sku: String
        rating: Int
        size: sizes
        description: String!
    }
    type product {
        _id: ID!
        img: String!
        name: String!
        prevPrice: Int
        curPrice: Int!
        stockStatus: String
        sku: String
        rating: Int
        size: sizes
        description: String!
    }
    enum sizes {
        S
        M
        L
    }
`);