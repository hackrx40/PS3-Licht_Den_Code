const mongoose = require('mongoose');


const stockSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    watchlist: {
        type: [String],
        required: true,
    },
    portfolio:{
        type: [String],
        required:true
    },
    risk_profile:{
        type: String,
        required: true,
    },
});


const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;