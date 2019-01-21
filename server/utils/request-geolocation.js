const request = require('request');

const getGeolocation = () => {
  const url = `www.google.com`;
  request(url, (error, response) => {});
};

module.exports = { getGeolocation };
