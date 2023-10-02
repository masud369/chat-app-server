const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require("./route/userRoute");
const messageRouter = require("./route/messageRouter");
const app = express();
const cors = require('cors');
const socket = require("socket.io");

app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://chat-app-133e9.web.app');
  // Add other CORS headers as needed
  next();
});
app.use(express.json())
app.use("/api/auth/",userRoutes)
app.use("/api/messages/",messageRouter)

const connectionParser ={
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.kz5wbn2.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,connectionParser)
.then(()=>{
    console.log("database connected properly")
})
.catch(err=>{
    console.log(err.message)
}) 

app.get('/', function (req, res) {
  res.send('Hello World')
})

const server = app.listen(process.env.PORT,()=>{
  console.log("server running on ",process.env.PORT)
})

const io = socket(server,{
  cors:{
    origin:"http://localhost:3000",
    credentials:true,
  }
})

const activeConnections = {}; // Store active socket connections

const onlineUsers = []; 

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("add-user",(userId)=>{
        console.log(userId);
        !onlineUsers.some((user=>user.userId===userId))&&
        onlineUsers.push({userId,socketId:socket.id})

      });

      socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.find(user => user.userId === data.to);
  if (sendUserSocket) {
    io.to(sendUserSocket.socketId).emit("msg-recieve", data.msg); // Change sendUserSocket to sendUserSocket.socketId
    console.log("msg ok", data.msg);
  }
      });
});


