const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');

const rootResolver = {
  // use spread opeator to spread fields
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;