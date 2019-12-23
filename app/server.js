const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose'); 
const routes = require('./routes/index'); 
const cors =require('cors');
const path =require('path');
require('dotenv/config');
const socketio = require('socket.io'); 
const http = require('http');

const server = http.Server(app);
const io = socketio(server);

let connectedUsers = {};

mongoose.connect(process.env.MONGOCONNECT, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}) ;

io.on('connection', socket => {
    const {user_id} = socket.handshake.query; 
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next)=>{
    req.io = io; 
    req.connectedUsers = connectedUsers; 
    return next();
});

app.use(express.json());
app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..' , 'uploads')))
app.use(routes); 

server.listen(3001, () => console.log("Servidor no ar"));
