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

  const mapDisplayWindow = document.createElement('iframe');
  mapDisplayWindow.classList.add('map--display');
  mapDisplayWindow.setAttribute('title', 'My Current Location');
  mapDisplayWindow.setAttribute('width', 300);
  mapDisplayWindow.setAttribute('height', 300);
  mapDisplayWindow.setAttribute('src', message.embedMap);

  const li = createNewMessageElement();
  li.classList.add('map--after-space');
  li.appendChild(a);

  const liMap = createNewMessageElement();
  const mapContainer = document.createElement('div');
  const mapAfterSpace = document.createElement('br');
  mapContainer.classList.add('map--container');
  mapContainer.appendChild(mapDisplayWindow);
  liMap.appendChild(mapContainer);
  ul.appendChild(liMap);
  ul.appendChild(mapAfterSpace);
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

  locationButton.setAttribute('disabled', 'disabled');
  locationButton.innerText = 'Sending Location...'

  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.removeAttribute('disabled');
      locationButton.innerText = 'Send Location';

      socket.emit(
        'createLocationMessage',
        { longitude: position.coords.longitude, latitude: position.coords.latitude },
        confirmation => console.log(`${confirmation}`)
        );
      },
      () => {
        locationButton.removeAttribute('disabled');
        locationButton.innerText = 'Send Location';
        alert('Unable to get your location')
      }
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
