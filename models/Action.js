const mongoose = require('mongoose');	

const actionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [4, "Too short title"]
    },
    description: {
        type: String,
        maxLength: [200, "Too long description"]
    },
    category: {
        type: String,
        required: true,
        enum: ["vehicles", "estate", "electronics", "furniture", "other"]
    },
    imageUrl: {  
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    author: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    bidders: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]

})

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;