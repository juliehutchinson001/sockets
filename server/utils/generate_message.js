const nowTime = new Date();
const formattedDate = nowTime.toString().slice(4, 10);
const formattedTime = nowTime.toLocaleTimeString();
const generateMessage = (sender, text) => ({
  sender,
  text,
  createdAt: `${formattedDate} ${formattedTime}`,
});

module.exports = { generateMessage };
