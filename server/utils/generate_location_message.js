const nowTime = new Date();
const formattedDate = nowTime.toString().slice(4, 10);
const formattedTime = nowTime.toLocaleTimeString();

const generateLocationMessage = (sender, latitude, longitude) => ({
  sender,
  url: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
  embedMap: `https://mapquest.com/embed/?center=${latitude},${longitude}2&zoom=14&maptype=map`,
  latitude,
  longitude,
  createdAt: `${formattedDate} ${formattedTime}`,
});

module.exports = { generateLocationMessage };
