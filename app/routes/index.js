const express = require('express'); 
const session = require('../controllers/SessionController')
const routes = express.Router();

routes.post('/sessions', session.store);

routes.get('/users', session.index);

module.exports = routes;