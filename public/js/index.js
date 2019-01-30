const socket = io();
const messageForm = document.getElementById('message-form');
const inputVal = document.getElementById('input-message');
const locationButton = document.getElementById('send-location');
const ul = document.getElementById('messages');

const createNewMessageElement = () => {
  const li = document.createElement('li');
  li.classList.add('message');
  return li;
};

socket.on('connect', () => {
  console.log(`connected to server`);
});
socket.on('newLocationMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);
  a.innerText = `My current location (${formattedTime})`;

  const li = createNewMessageElement();
  li.appendChild(a);
  ul.appendChild(li);
});

socket.on('newUserMessage', message => {
  const headerWelcome = createNewMessageElement();
  const welcomeText = message.text;
  setTimeout(() => {
    headerWelcome.innerText = `Admin: ${welcomeText}`;
    ul.appendChild(headerWelcome);
  }, 1000);
  console.log(message);
});

socket.on('newEmailToEveryoneBut', message => {
  const headerAlert = createNewMessageElement();
  const welcomeText = message.text;
  console.log(message);
  setTimeout(() => {
    headerAlert.innerText = `Admin: ${welcomeText}`;
    ul.appendChild(headerAlert);
  }, 1000);
});

const sendToServer = newMessage => {
  // the client sends a callback to ask the server confirmation about receiving a new message
  socket.emit('createMessage', { sender: 'User', text: newMessage }, (sender, data) => {
    inputVal.value = '';
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
