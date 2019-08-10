const events = async eventIds => {
    // look for through events where ID is in a list of ids.
    try {
      const events = await Event.find({ _id: { $in: eventIds } });
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  };
  
  const singleEvent = async eventId => {
    try {
      const event = await Event.findById(eventId);
      return transformEvent(event);
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

  exports.user = user;
  exports.events = events;
  exports.singleEvent = singleEvent;