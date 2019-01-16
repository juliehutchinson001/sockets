
const socket = io();
/*// socket.on('newMessage', function(message) {
  //   setInterval(() => {
  //     document.title = `New message!`;
  //   }, 2000)
  //   setInterval(() => {
  //     document.title = `Sockets chat app`;
  //   }, 4000)
  //   // setTimeout(() => alert(message), 1000);
  // });

  // const sendToServer = () => {
  //   const msg = document.querySelector('input').value;
  //   socket.emit('createEmail', { msg });
  // };*/

let newMessage = document.querySelector('h1');
// if (isMessageLong) {
let count = 0;
socket.on('newMessage', (serverMessage) => {
  count += 1;
  newMessage.innerText = `you have ${count} new messages: ${serverMessage} `;
});

  // const sendMessageToServer = () => {

  // // }
  // };
  // sendMessageToServer();

// module.exports = sendMessageToServer;
















// socket.on('connect', function() {
//   console.log('connected to server');

//   // create a clientside script that connects to the server
//   // and emits this createEmail event
//   socket.emit('createEmail', {
//     to: 'juanhurtado4@outlook.com',
//     text: 'I am watching you!!!'
//   });

//   socket.emit('createMessage', {
//     to: 'juanhurtado4@outlook.com',
//     text: 'I am watching you again!!!'
//   });
// });

// // listener in place
// socket.on('newEmail', function(email) {
//   console.log('new Email detected ', email);
// });

// socket.on('disconnect', function() {
//   console.log('disconnected from the server');
// });

// document.querySelector('button').addEventListener('click', () => console.log('first'));
// document.querySelector('button').onclick = () => console.log('fourth');