# Chat Rooms Application

This is a simulated chat application built in Javascript, node, express, bootstrap and socket.io.

## Socket's notes

```javascript

// This emits an event to every user  connected to a room
io.to('room').emit

// This will emit to every single user
io.emit('message');

// This will emit to everyone connected to the socket server except for the current user
socket.broadcast.to('room').emit();

// This will emit to everyone connected to the socket server except for the current user
socket.broadcast.emit('message');

// This will send to an specific clients/user
socket.emit('type', {});

// This will join to an specific room for clients to talk
socket.join('room');

// This will let a user leave a room (stops sending messages of that room)
socket.leave('room');
```