const socket = io(); // eslint-disable-line no-undef
const messageForm = document.getElementById('message-form');
const inputVal = document.getElementById('input-message');
const locationButton = document.getElementById('send-location');
const ul = document.getElementById('messages');

socket.on('connect', () => {
  console.log(`connected to server`);
});
socket.on('newLocationMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a'); // eslint-disable-line no-undef
  const li = document.createElement('li');
  li.classList.add('message');
  const a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);
  a.innerText = `My current location (${formattedTime})`;
  li.appendChild(a);
  ul.appendChild(li);
});

socket.on('newUserMessage', message => {
  const headerWelcome = document.querySelector('.chat__text');
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
  const headerAlert = document.querySelector('.chat__alert');
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

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported in this browser!');
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      console.log(JSON.stringify(position, null, 3));
      socket.emit(
        'createLocationMessage',
        { longitude: position.coords.longitude, latitude: position.coords.latitude },
        confirmation => console.log(`${confirmation}`)
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
  const formattedTime = moment(message.createdAt).format('h:mm a'); // eslint-disable-line no-undef
  const li = document.createElement('li');
  li.innerHTML = `${message.sender}: ${message.text} (${formattedTime})`;
  ul.appendChild(li);
});

socket.on('disconnect', () => {
  console.log('disconnected from the server');
});
