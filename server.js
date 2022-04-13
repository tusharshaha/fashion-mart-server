const rootResolver = require('./graphql/Resolvers/index');
const rootSchema = require('./graphql/Schemas/index');
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json())
app.use(cors());


app.use('/graphql', graphqlHTTP({
  schema : rootSchema,
  rootValue: rootResolver,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`visit http://localhost:${port}/graphql`)
})