/*
[
  {
    id: '/#12poiajdspfoif',
    name: 'Julie',
    room: 'Main'
  }
  {
    id: '/#12poiajdspfoif',
    name: 'Julie',
    room: 'Main'
  }
]
*/
// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    const userToBeRemoved = this.getUser(id);

    if (userToBeRemoved) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return userToBeRemoved;
  }


}

module.exports = { Users };
