// const request = require('supertest');
// const app = require('../app');
const matchingCharacters = /.*\S.*/;
const { generateMessage } = require('./generate_message');
const { generateLocationMessage } = require('./generate_location_message');

describe('generate message test', () => {
  it('send the correct message object', () => {
    expect.assertions(3);
    const sender = 'Julie';
    const text = 'This is a test message';
    const message = generateMessage(sender, text);

    expect(message).toMatchObject({
      sender: expect.any(String),
      text: expect.any(String),
      createdAt: expect.any(String),
    });
    expect(matchingCharacters.test(sender)).toBe(true);
    expect(matchingCharacters.test(text)).toBe(true);
  });
});

describe('generate correct location message test', () => {
  it('send the correct location message object', () => {
    expect.assertions(6);
    const sender = 'Julie';
    const latitude = 25.47352;
    const longitude = -80.47417;
    const message = generateLocationMessage(sender, latitude, longitude);

    expect(message).toMatchObject({
      sender: expect.any(String),
      url: expect.any(String),
      embedMap: expect.any(String),
      latitude: expect.any(Number),
      longitude: expect.any(Number),
      createdAt: expect.any(String),
    });
    expect(message.url).toContain(message.latitude);
    expect(message.url).toContain(message.longitude);
    expect(matchingCharacters.test(sender)).toBe(true);
    expect(matchingCharacters.test(message.url)).toBe(true);
    expect(matchingCharacters.test(message.embedMap)).toBe(true);
  });
});
