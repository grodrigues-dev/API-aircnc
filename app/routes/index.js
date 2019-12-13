const express = require('express'); 
const session = require('../controllers/SessionController')
const spot  = require('../controllers/SpotController')
const multer = require('multer'); 
const uploadConfig = require('../configs/upload');
const routes = express.Router();
const upload = multer(uploadConfig);
const dashboard = require('../controllers/DashController')

routes.post('/sessions', session.store);
routes.post('/spots', upload.single('thumbnail'), spot.store);
routes.get('/spots', spot.index);
routes.get('/dashboard', dashboard.show);



module.exports = routes;