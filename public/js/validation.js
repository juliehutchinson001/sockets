const socket = io();
const signinForm = document.getElementById('signin-form');

signinForm.addEventListener('submit', event => {
  event.preventDefault();
  const { name, room } = event.target;
  const signinValues = { name: name.value, room: room.value };

  if (!name.value || !room.value) {
    alert('You must pass in values');
  }

  socket.emit('join', signinValues, error => {
    console.log('join');
    if (error) {
      alert(error);
    } else {
      window.location.href = `chat.html?name=${name.value}&room=${room.value}`;
    }
  });
});
