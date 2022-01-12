const mongoose = require('mongoose');

var BidSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    auction: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' },
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    },
});

module.exports = mongoose.model('Bid', BidSchema);