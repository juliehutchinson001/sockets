const socket = io();
const ul = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const inputVal = document.getElementById('input-message');
const locationButton = document.getElementById('send-location');

const getDate = () => {
  const nowDate = new Date();
  const formattedDate = nowDate.toString().slice(4, 10);
  const formattedTime = nowDate.toLocaleTimeString();

  const currentDateHtml = `<span>${formattedDate} ${formattedTime}</span>`;

  return currentDateHtml;
};

/**
 *
 * @param {*} sender
 * @param {*} text
 */
const newMessageElement = (sender, text) => {
  const dateAndTime = getDate();
  const li = document.createElement('li');
  const userAuthor = `<h1>${sender}</h1>`;
  const body = text === undefined ? `User's Location` : text;
  const messageHeader = `<div class="message__title">${userAuthor} ${dateAndTime}:</div>`;
  li.innerHTML = `${messageHeader}<p>${body}</p></div>`;
  return li;
};

const newLocationLinkElement = message => {
  const a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);
  a.innerText = `Current Location`;

  const li = newMessageElement(message.sender, message.text);
  li.classList.add('message');
  li.appendChild(a);
  return li;
};

/**
 * Adds all of the users that are active in the chat list
 * @param {String} users All of the active users in the chat
 */
const addUsersToChatList = users => {
  usersInChatWrapper.innerHTML = '';

  users.forEach(user => {
    const newUser = document.createElement('p');
    newUser.classList.add('chat__room-member');
    newUser.innerText = user;
    usersInChatWrapper.appendChild(newUser);
  });
};

const sendToServer = newMessage => {
  // the client sends a callback to ask the server confirmation about receiving a new message
  socket.emit(
    'createMessage',
    { sender: 'User', text: newMessage },
    (sender, data) => {
      inputVal.value = '';
      console.log(`${data} by ${sender}`);
    }
  );
};

socket.on('connect', () => {
  console.log(`connected to server`);
});

socket.on('newLocationMessage', message => {
  const li = newLocationLinkElement(message);
  ul.appendChild(li);
  // scrollToBottom();
});

socket.on('newUserMessage', message => {
  const welcomeText = message.text;
  const headerWelcome = newMessageElement('Admin', welcomeText);
  setTimeout(() => {
    ul.appendChild(headerWelcome);
  }, 1000);
  console.log(message);
});

socket.on('newEmailToEveryoneBut', message => {
  const welcomeText = message.text;
  const headerAlert = newMessageElement('Admin', welcomeText);
  console.log(message);
  setTimeout(() => {
    ul.appendChild(headerAlert);
    // scrollToBottom();
  }, 1000);
});

socket.on('newMessage', message => {
  const li = newMessageElement('User', message.text);
  li.classList.add('message');
  ul.appendChild(li);
  // scrollToBottom();

  console.log('new Message: ', message);
});

socket.on('disconnect', () => console.log('disconnected from the server'));

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported in this browser!');
  }

  locationButton.setAttribute('disabled', 'disabled');
  locationButton.innerText = 'Sending Location...';

  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.removeAttribute('disabled');
      locationButton.innerText = 'Send Location';

      socket.emit(
        'createLocationMessage',
        {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        },
        confirmation => console.log(`${confirmation}`)
      );
    },
    () => {
      locationButton.removeAttribute('disabled');
      locationButton.innerText = 'Send Location';
      alert('Unable to get your location');
    }
  );
});

messageForm.addEventListener('submit', event => {
  event.preventDefault();
  const inputValue = inputVal.value;
  sendToServer(inputValue);
  inputVal.focus();
});
