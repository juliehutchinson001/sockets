const socket = io(); // eslint-disable-line no-undef
const messageForm = document.getElementById('message-form');
const inputVal = document.getElementById('input-message');
const locationButton = document.getElementById('send-location');

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('newUserMessage', message => {
  const headerWelcome = document.querySelector('.app-text');
  const welcomeText = message.text;
  setTimeout(() => {
    headerWelcome.innerText = welcomeText;
  }, 1500);
  setTimeout(() => {
    headerWelcome.innerText = 'Chat-Room';
  }, 4000);
  console.log(message);
});

socket.on('newEmailToEveryoneBut', message => {
  const headerAlert = document.querySelector('.app-alert');
  const welcomeText = message.text;
  console.log(message);
  setTimeout(() => {
    headerAlert.innerText = welcomeText;
  }, 1000);
  setTimeout(() => {
    headerAlert.innerText = '';
  }, 3500);
});

// the client sends a callback to ask the server confirmation about receiving a new message
socket.emit('createMessage', { sender: 'Julie', text: 'Hello from Julie' }, (sender, data) => {
  console.log(`${data} by ${sender}`);
});

const sendToServer = newMessage => {
  socket.emit('createMessage', { sender: 'User', text: newMessage }, (sender, data) => {
    console.log(`${data} by ${sender}`);
  });

  console.log(newMessage);
};

locationButton.addEventListener('click', event => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported in this browser!');
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      console.log(position);
      socket.emit(
        'createLocationMessage',
        { longitud: position.coords.longitude, latitude: position.coords.latitude },
        (sender, data) => console.log(`${data} by ${sender}`)
      );
    },
    () => alert('Unable to get your location')
  );
});

messageForm.addEventListener('submit', event => {
  event.preventDefault();
  const inputValue = inputVal.value;
  sendToServer(inputValue);
});

socket.on('newMessage', message => {
  console.log('new Message: ', message);
  const li = document.createElement('li');
  const ul = document.getElementById('messages');
  li.innerHTML = `${message.sender}: ${message.text}`;
  ul.appendChild(li);
});

socket.on('disconnect', () => {
  console.log('disconnected from the server');
});
