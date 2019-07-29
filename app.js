const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const chalk = require("chalk");

const app = express();

const events = [];

app.use(bodyParser.json());
app.use(
    '/graphql',
    graphqlHttp({
      schema: buildSchema(`
          type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
          }
          input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
          }
          type RootQuery {
              events: [Event!]!
          }
          type RootMutation {
              createEvent(eventInput: EventInput): Event
          }
          schema {
              query: RootQuery
              mutation: RootMutation
          }
      `),
      rootValue: {
        events: () => {
          return events;
        },
        createEvent: args => {
          const event = {
            _id: Math.random().toString(),
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: args.eventInput.date
          };
          events.push(event);
          return event;
        }
      },
      graphiql: true
    })
  );

const PORT = process.env.Port || 3000;
app.listen(PORT, err => {
  if (err) throw err;
  console.log(chalk.blue.inverse(`App currently listening on port ${PORT})`));
});
