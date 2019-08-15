const Event = require("../../models/event");
const User = require('../../models/user');
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        // convert to normal strong that's understood by graphql
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
      // check if authenticated 
    if(!req.isAuth) {
        throw new Error('Unauthenticated');
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "5d478568c711283ecf93cb53"
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById("5d478568c711283ecf93cb53");
      // console.log(result);
      //gets all core properties that makes event object and leavse out meta data

      // check if user
      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdEvents.push(event);
      await creator.save();
      
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
