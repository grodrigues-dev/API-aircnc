const Spot = require('../models/Spot')

module.exports = {
    async store(req, res){
        const {fileName} = req.file; 
        const { company, techs, price} = req.body;
        const {user_id} = req.headers;

        const spot = await Spot.create({
            user_id, 
            thumbnail: fileName, 
            company, 
            techs: techs.split(',').map(tech => tech.trim()),
            price 
        })
        return res.json(spot);
    }
}

