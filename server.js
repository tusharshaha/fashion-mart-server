const product = require('./Routes/product');
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLString, GraphQLObjectType } = require("graphql");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();
app.use(express.json())
app.use(cors());

// routes for product
app.use('/api', product)

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "test",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: ()=> "hello world"
      }
    })
  })
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`visit http://localhost:${port}/graphql`)
})