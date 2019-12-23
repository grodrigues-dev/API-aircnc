const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String, 
    company: String, 
    price: Number, 
    tech: [String], 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
});

SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://172.22.120.151:3001/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);