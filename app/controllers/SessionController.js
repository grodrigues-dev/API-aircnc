const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.json(false)
        } else {
        return res.json(user);
        }
    },
    async register(req, res) {
        const {email} = req.body; 
        const {login} = req.body;
        let created = await User.find({
            $or : [{
                email: email
            }, {
                login: login
            }]
        })
        console.log(req.body);
        
        if (created.length<1) {
            let user = await User.create({
                email: req.body.email,
                login: req.body.login
            })
            
            return res.json(user)
        } else {
            return res.json(false);
        }
    }

}