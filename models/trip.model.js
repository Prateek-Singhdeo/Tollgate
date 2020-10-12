const mongoose = require('mongoose');

let Counter = require('./counter.model');

let TripSchema = new mongoose.Schema({
        journeyType: {
            type: String,
            required: true
        },
        tollnumber: {
            type: Number,
            unique: true
        },
        registrationNumber: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },
    {timestamps: true}
);

TripSchema.pre('save', async function (next) {

    let doc = this;

    let ret = await Counter.findOneAndUpdate({_id: 'counterId'}, {$inc: { seq: 1}},{new: true, upsert: true});

    doc.tollnumber = ret.seq;
    next();

});

let Trip = mongoose.model('Trip',TripSchema);

module.exports= Trip;