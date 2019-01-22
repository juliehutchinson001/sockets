const request = require('request');
const secretKey = require('../middleware/secret-keys');

const googleKey = secretKey.development.GOOGLE_MAPS_KEY;
const location = '3796%20Bertini%20court%20california';

request(
  {
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${googleKey}&location=${location}`,
    json: true,
  },
  (error, response, body) => {
    const latitude = body.results[0].locations[0].latLng.lat;
    const longitude = body.results[0].locations[0].latLng.lng;

    console.log(`Address: ${body.results[0].locations[0].street}`);
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    console.log(`--------------------------------`);
    console.log(JSON.stringify(response, null, 2));
    console.log(`--------------------------------`);
    console.log(JSON.stringify(error, null, 2));
  }
);
