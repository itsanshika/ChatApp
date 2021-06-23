const express= require('express');
const socketio= require('socket.io');
const http=require('http');

const {addUser, removeUser,getUser,getUserRoom}=require('./users.js');


const router= require('./router');
const app=express();
const server=http.createServer(app);
const io=socketio(server);

io.on('connection',(socket)=>
{
//console.log(socket);
// console.log("New Connection");
socket.on('join',({name,room},callback)=>
{

    const{ error,userList}= addUser({id:socket.id,name,room})
if(error)return callback(error);

//this is for the user
socket.emit('adminMessage',{user:'admin',text:`${userList.name} ,Welcome to the ChatBox of ${userList.room}`})
//socket.emit (#aName,#objecttobepassed,#accessCallBack ) is connected to socket.on(#aName,#object,#callback)
//emit outputs the event from backend to frontend/

//send messages to everyone in room besides that user// message is sent to everyone except userList;
socket.broadcast.to(userList.room).emit('adminMessage',{user:'admin', text:`${userList.name} has joined`});


    socket.join(userList.room);
    callback();

});

//user generated message//.on expect the event on the backend.
socket.on('sendMessage')


socket.on('disconnect',()=>
{
    console.log("Disconnected!!");
})  
}

)




app.use(router);

server.listen(5000,()=>{
console.log(
    "server running"
);
}
)