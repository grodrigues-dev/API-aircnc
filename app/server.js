const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose'); 
const routes = require('./routes/index'); 
const cors =require('cors');
require('dotenv/config');

mongoose.connect(process.env.MONGOCONNECT, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}) ;

app.use(express.json());
app.use(cors())

app.use(routes); 

app.listen(3001, () => console.log("Servidor no ar"));
