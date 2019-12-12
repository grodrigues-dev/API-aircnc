const express = require('express'); 

const routes = express.Router();

routes.get('/users/:idade', (req, res) => {
    return res.json({idade: req.params.idade})
})

module.exports = routes;