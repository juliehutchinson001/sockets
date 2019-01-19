// const request = require('supertest');
// const app = require('../app');
const { generateMessage } = require('./generate_message');

describe('generate message test', () => {
  it('send the correct message object', () => {
    expect.assertions(1);
    const sender = 'Julie';
    const text = 'This is a test message';
    const message = generateMessage(sender, text);

    expect(message).toMatchObject({
      sender: expect.any(String),
      text: expect.any(String),
      createdAt: expect.any(Number),
    });
  });
});
