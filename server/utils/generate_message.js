const moment = require('moment');

const generateMessage = (sender, text) => ({
  sender,
  text,
  createdAt: moment().valueOf(),
});

module.exports = { generateMessage };
