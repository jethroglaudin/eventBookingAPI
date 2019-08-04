const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const chalk = require("chalk");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import Model
const Event = require("./models/event");

// Import User Model
const User = require("./models/user");
const app = express();

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
        }
        type User {
          _id: ID!
          password: String
        }
        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }
        input UserInput {
          email: String!
          password: String!
        }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then(events => {
            return events.map(event => {
              // convert to normal strong that's understood by graphql
              return { ...event._doc, _id: event.id };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date)
        });
        return event
          .save()
          .then(result => {
            console.log(result);
            //gets all core properties that makes event object and leavse out meta data
            return { ...result._doc, _id: result._doc._id.toString() };
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      createUser: args => {
       return bcrypt
          .hash(args.userInput.password, 12)
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: args.userInput.password
            });
            return user.save();
          })
          .then(result => {
            return {...result_.doc, _id: result.id}
          })
          .catch(err => {
            throw err;
          });  
      }
    },
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
