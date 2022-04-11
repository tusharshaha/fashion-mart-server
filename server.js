const product = require('./Routes/product');
const resolver = require('./Resolvers/index');
const rootSchema = require('./Schemas/index');
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json())
app.use(cors());

// routes for product
app.use('/api', product)

app.use('/graphql', graphqlHTTP({
  schema : rootSchema,
  rootValue: resolver,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`visit http://localhost:${port}/graphql`)
})