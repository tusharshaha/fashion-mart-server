const rootResolver = require('./graphql/Resolvers/index');
const rootSchema = require('./graphql/Schemas/index');
const verifyToken = require('./middleware/verifyToken');
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

// verify every incomming request
app.use(verifyToken);

app.use('/graphql', graphqlHTTP({
  schema : rootSchema,
  rootValue: rootResolver,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`visit http://localhost:${port}/graphql`)
})