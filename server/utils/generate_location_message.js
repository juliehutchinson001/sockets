const generateLocationMessage = (sender, latitude, longitude) => ({
  sender,
  url: `www.google.com/maps?q=${latitude},${longitude}`,
  latitude,
  longitude,
  createdAt: new Date().getTime(),
});

module.exports = { generateLocationMessage };
