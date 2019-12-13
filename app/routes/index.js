const express = require('express'); 
const session = require('../controllers/SessionController')
const spot  = require('../controllers/SpotController')
const routes = express.Router();

routes.post('/sessions', session.store);
routes.post('/spot', session.store);



module.exports = routes;