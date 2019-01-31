const moment = require('moment');

const generateLocationMessage = (sender, latitude, longitude) => ({
  sender,
  url: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
  embedMap: `https://mapquest.com/embed/?center=${latitude},${longitude}2&zoom=14&maptype=map`,
  latitude,
  longitude,
  createdAt: moment().valueOf(),
});

module.exports = { generateLocationMessage };
