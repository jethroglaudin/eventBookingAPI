const bcrypt = require("bcryptjs");
// Import Model
const Event = require("../../models/event");
// Import User Model
const User = require("../../models/user");
const Booking = require("../../models/booking");

const events = async eventIds => {
  // look for through events where ID is in a list of ids.
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
      };
    });
    return events;
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return {
      ...event._doc,
      _id: event.id,
      creator: user.bind(this, event.creator)
    };
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        // convert to normal strong that's understood by graphql
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event.date).toISOString(),
          creator: user.bind(this, event.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: user.bind(this, booking.user),
          event: singleEvent.bind(this, booking._doc.event),
          createdAt: new Date(booking.createdAt).toISOString(),
          updatedAt: new Date(booking.updatedAt).toISOString()
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async args => {
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

      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(event.date).toISOString(),
        creator: user.bind(this, result.creator)
      };
      const creator = await User.findById("5d478568c711283ecf93cb53");
      console.log(result);
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
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });

      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async args => {
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: "5d478568c711283ecf93cb53",
      event: fetchedEvent
    });
    const result = await booking.save();
    return {
      ...result._doc,
      _id: result.id,
      createdAt: new Date(result.createdAt).toISOString(),
      updatedAt: new Date(result.updatedAt).toISOString()
    };
  }
};
