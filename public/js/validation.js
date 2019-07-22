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
    if (error) {
      alert(error);
    } else {
      console.log('join');
      window.location.href = `chat.html?name=${name.value}&room=${room.value}`;
    }
  });
});
