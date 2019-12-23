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

io.on('connection', socket => {
    console.log('Usuário conectado', socket.id);
});

mongoose.connect(process.env.MONGOCONNECT, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}) ;

app.use(express.json());
app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..' , 'uploads')))
app.use(routes); 

server.listen(3001, () => console.log("Servidor no ar"));
