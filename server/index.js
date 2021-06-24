const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on("connection", (socket) => {
  //console.log(socket);
  console.log("New Connection");
  socket.on("join", ({ name, room }, callback) => {
    const { error, userList } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);
    //console.log(room);

    socket.join(room);

    //console.log(userList);
    //this is for the user
    socket.emit("message", {
      user: "admin",
      text: `${name} ,Welcome to the ChatBox of ${room}`,
    });
    //socket.emit (#aName,#objecttobepassed,#accessCallBack ) is connected to socket.on(#aName,#object,#callback)
    //emit outputs the event from backend to frontend/

    //send messages to everyone in room besides that user// message is sent to everyone except userList;
    socket.broadcast
      .to(room)
      .emit("message", { user: "admin", text: `${name} has joined` });

      io.to(room).emit('roomData', { room: room, users: getUsersInRoom(room) });


    callback();
  });

  //user generated message//.on expect the event on the backend.
  //socket.on(##message,##funtion to be executed);

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

   // console.log(user);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })


});

server.listen(5000, () => {
  console.log("server running");
});
