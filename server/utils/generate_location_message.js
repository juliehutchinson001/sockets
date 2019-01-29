const moment = require('moment');

const generateLocationMessage = (sender, latitude, longitude) => ({
  sender,
  url: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
  latitude,
  longitude,
  createdAt: moment().valueOf(),
});

module.exports = { generateLocationMessage };
