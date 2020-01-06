const Booking = require('../models/Booking')

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        console.log(req.body);


        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('bookingRequest', booking);
        }

        return res.json(booking)
    },
    async show(req, res) {
        const {user_email } = req.headers;
        const booking = await Booking.aggregate([
            {
                $lookup: {
                    from: "spots",
                    localField: "spot",
                    foreignField: "_id",
                    as: "spot"
                }
            },{
                $lookup: {
                    from: "users", 
                    localField: "spot.user", 
                    foreignField: "_id", 
                    as: "owner"
                }
            },{
                $match: {
                    "owner.email": user_email
                }
            },{
                $lookup: {
                    from: "users", 
                    localField: "user", 
                    foreignField: "_id", 
                    as: "user"
                }
            } 
        ])
        console.log(res);
                
        return res.json(booking);
    }
}