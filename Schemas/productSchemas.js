const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Query {
        products: [product]
    }
    type product {
        id: ID
        name: String
        prevPrice: Int
        currPrice: Int
        stockStatus: String
        cuponCode: String
        rating: Int
        size: sizes
        description: String
    }
    enum sizes {
        S
        M
        L
    }
`);
