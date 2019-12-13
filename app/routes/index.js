const express = require('express'); 
const session = require('../controllers/SessionController')
const spot  = require('../controllers/SpotController')
const multer = require('multer'); 
const uploadConfig = require('../configs/upload');
const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', session.store);
routes.post('/spot', upload.single('thumbnail'), spot.store);



module.exports = routes;