const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const chalk = require("chalk");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/schema");
const graphQlResolvers = require("./graphql/resolvers/resolvers");

const app = express();

app.use(bodyParser.json());



app.use(
  "/graphql",
  graphqlHttp({

   
      
     
    graphiql: true
  })
);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@myexpressapp-jlald.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(chalk.green.inverse("MongoDB Connected"));
  })
  .catch(err => {
    console.log(err);
  });

const PORT = process.env.Port || 3000;
app.listen(PORT, err => {
  if (err) throw err;
  console.log(chalk.blue.inverse(`App currently listening on port ${PORT})`));
});
