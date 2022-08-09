const express = require('express');
const http = require('http');
const socketIo= require('socket.io');
const app = express();
const formatMessage = require("./utils/messages.js")
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require("./utils/users.js")
const server= http.createServer(app);
const io =socketIo(server);

const path = require('path');
const botName = "chatBot"
app.use(express.static(path.join(__dirname, 'public')))
io.on("connection",(socket)=>{
      socket.on("join-room",({username,room})=>{
            const user = userJoin(socket.id, username,room)
            console.log(user)
            socket.join(user.room)
            socket.emit("message",formatMessage(botName,`hello ${user.username} welcome to the chat room`));
      socket.broadcast.to(user.room).emit("message",formatMessage(botName,`${user.username} has joined the chat`));
      io.to(user.room).emit("users",{
            room: user.room,
            users:getRoomUsers(user.room)
      })

      })
      console.log("connection established");
      
      
      socket.on("chatMessage",function(msg){
            // console.log(msg)
            console.log(socket.id)
            const user =getCurrentUser(socket.id)
            console.log(user)
            console.log(socket.id)
            io.to(user.room).emit("message",formatMessage(user.username,msg))

      })
      socket.on("disconnect",function(){
            const user = userLeave(socket.id);
            if(user){
                 io.to(user.room).emit("message",formatMessage(botName,`${user.username} has left the chat`));
                 io.to(user.room).emit("users",{
                  room: user.room,
                  users:getRoomUsers(user.room)
            })


            }
      });
})




const PORT = process.env.PORT || 3000;
server.listen(PORT, function(){
      console.log(`app listening on ${PORT}`);
})