const express = require('express'); 
const session = require('../controllers/SessionController')
const spot  = require('../controllers/SpotController')
const multer = require('multer'); 
const uploadConfig = require('../configs/upload');
const routes = express.Router();
const upload = multer(uploadConfig);
const dashboard = require('../controllers/DashController'); 
const booking = require('../controllers/BookingController');
const rejection = require('../controllers/RejectionController'); 
const approval = require('../controllers/ApprovalController'); 


routes.post('/sessions', session.store); 
routes.post('/spots', upload.single('thumbnail'), spot.store); 
routes.get('/spots', spot.index); 
routes.get('/dashboard', dashboard.show); 
routes.post('/spots/:spot_id/bookings', booking.store);

//rotas web para aceitar ou rejeitar reservas
routes.post('/bookings/:booking_id/approvals', approval.store); 
routes.post('/bookings/:booking_id/rejections', rejection.store); 
routes.get('/bookings/index', booking.show);
routes.get('/bookings/indexBookings', booking.getBookingsByUser);
routes.post('/register', session.register);


module.exports = routes;