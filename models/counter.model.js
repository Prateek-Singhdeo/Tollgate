const mongoose = require('mongoose');

var CounterSchema = new mongoose.Schema({
        _id: {
            type: String,
            default: 'counterId',
            required: true
        },
        seq: {
            type: Number,
            default: 0
        }
    },
    {timestamps: true}
);

var Counter = mongoose.model('Counter',CounterSchema);

module.exports= Counter;