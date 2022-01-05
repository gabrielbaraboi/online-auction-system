const mongoose = require('mongoose');

var LotSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5 },
    description: { type: String, required: true, minlength: 10 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    minStep: { type: Number, required: true },
    endTime: { type: Date, required: true },

},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    },
});

module.exports = mongoose.model('Lot', LotSchema);
