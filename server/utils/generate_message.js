const generateMessage = (sender, text) => ({
  sender,
  text,
  createdAt: new Date().getTime(),
});

module.exports = { generateMessage };
