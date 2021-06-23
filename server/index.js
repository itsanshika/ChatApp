const express= require('express');
const socketio= require('socket.io');
const http=require('http');
const router= require('./router');
const app=express();
const server=http.createServer(app);
const io=socketio(server);

io.on('connection',(socket)=>
{
//console.log(socket);
console.log("New Connection");
socket.on('join',({name,room})=>
{
    console.log(name, room);
})
{

}
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