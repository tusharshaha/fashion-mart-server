const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Query {
        test : [testType]
    }
    type testType {
        id: Int
        name: String
        message: String
    }
`);
