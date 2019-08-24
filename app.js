const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const chalk = require("chalk");
const mongoose = require("mongoose");
const isAuth = require("./middleware/is-auth");

const graphQlSchema = require("./graphql/schema/schema");
const graphQlResolvers = require("./graphql/resolvers/resolvers");

const app = express();

app.use(bodyParser.json());

// middleware headers for every request sent
app.use((req, res, next) => {
  // Means everyhost/client can send request to this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Control which type or requests can be sent... browser always ends an options request before anything else
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  // controls which kind of request headers we can set for the request to the server
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if(req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
})


// express with use this as a middleware and will run on every incoming request

app.use(isAuth);



app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@myexpressapp-jlald.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`, { useNewUrlParser: true }
  )
  .then(() => {
    console.log(chalk.green.inverse("MongoDB Connected"));
  })
  .catch(err => {
    console.log(err);
  });

const PORT = process.env.Port || 4000;
app.listen(PORT, err => {
  if (err) throw err;
  console.log(chalk.blue.inverse(`App currently listening on port ${PORT})`));
});
